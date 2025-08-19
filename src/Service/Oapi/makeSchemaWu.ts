import {
    OapiReference,
    OapiSchema,
    OapiSchemaComposition,
    OapiSchemaObject,
    makeSchemaObject,
    makeSchemaComposition,
    CompositionKind,
    isSchemaColumn,
    OapiType,
} from "@/Model/Oapi"
import getTypeFormatOrThrow from "../getTypeFormatOrThrow"
import { makeReferenceEmpty } from "./makeReference"
import makeSchemaTypeFormat from "./makeSchemaTypeFormat"
import { OapiDto } from "./prepareOapiDto"

/**
 * only includes Wu that has no WuParameter
 */
export default function makeSchemaWu(
    wu: LB.Wu,
    tfzz: LB.TypeFormat[],
    od: OapiDto,
): OapiReference | OapiSchemaComposition | OapiSchemaObject {
    if (wu.id === 1) {
        return makeSchemaObject({})
    }

    const wiwpzzm: Map<number, LB.WuParameter[]> = new Map()
    const argumentzz: (OapiReference | OapiSchema)[] = []
    const wpiam: Map<number, OapiReference | OapiSchema> = new Map()
    const czz = od.WuId_Columnzz_map.get(wu.id) ?? []
    const wczz = od.WuId_TypeFormatzz_map.get(wu.id) ?? []
    if (wczz.length === 0 && czz.length === 0 && wu.isMap === false) {
        console.error(`makeSchemaWu: Wu ${wu.name} has no columns or child TypeFormat, returning empty reference`)
        return makeReferenceEmpty()
    }

    const requiredzz: string[] = []
    const properties = czz.reduce(function (old, column) {
        const tf = getTypeFormatOrThrow(column.id, "ownerColumnId", tfzz)
        if (includingWuParameter(tf, od)) {
            return old
        }

        const data = makeSchemaTypeFormat(
            tf,
            tfzz,
            od.TypeFormatChildzz_map,
            od.Variable_map,
            od.WuId_Columnzz_map,
            od.WuId_TypeFormatzz_map,
            od.Wu_map,
            wiwpzzm,
            argumentzz,
            wpiam,
        )
        if (isSchemaColumn(data)) {
            // not working
            // if (column.ro) {
            //     data.readOnly = true
            // }
            if (column.wo) {
                data.writeOnly = true
            }
            const cczz = od.WuColumnId_ColumnConstraintzz_map.get(column.wuColumnId)
            if (cczz) {
                const required = cczz.some((cc) => cc.name === 'present' || cc.name === 'required')
                if (required) {
                    requiredzz.push(column.name)
                }
            }
        }

        old[column.name] = data
        return old
    }, Object.create(null) as Record<string, OapiReference | OapiSchema>)

    const schema = makeSchemaObject({
        description: wu.description,
        properties,
    })
    if (requiredzz.length) {
        schema.required = requiredzz
    }
    if (wu.example) {
        schema.example = wu.example
    }
    if (wu.isRequest) {
        // todo
        // schema.required = czz.map((item) => item.name)
    }

    if (wu.isMap) {
        const tf = getTypeFormatOrThrow(wu.id, "ownerWuId", tfzz)
        if (includingWuParameter(tf, od) === false) {
            schema.additionalProperties = makeSchemaTypeFormat(
                tf,
                tfzz,
                od.TypeFormatChildzz_map,
                od.Variable_map,
                od.WuId_Columnzz_map,
                od.WuId_TypeFormatzz_map,
                od.Wu_map,
                wiwpzzm,
                argumentzz,
                wpiam,
            )
        }
    }

    if (wczz.length === 0) {
        return schema
    }

    const childzz = []
    wczz.forEach((tf) => {
        childzz.push(
            makeSchemaTypeFormat(
                tf,
                tfzz,
                od.TypeFormatChildzz_map,
                od.Variable_map,
                od.WuId_Columnzz_map,
                od.WuId_TypeFormatzz_map,
                od.Wu_map,
                wiwpzzm,
                argumentzz,
                wpiam,
            ),
        )
    })
    if (czz.length || wu.isMap) {
        childzz.push(schema)
    }
    return makeSchemaComposition(childzz, wu.type as CompositionKind)
}

function includingWuParameter(
    tf: LB.TypeFormat,
    od: OapiDto,
): boolean {
    if (tf.type === OapiType.WuParameter) {
        return true
    }

    const argumentzz = od.TypeFormatChildzz_map.get(tf.id) ?? []
    if (argumentzz.find((item) => includingWuParameter(item, od))) {
        return true
    }
    return false
}
