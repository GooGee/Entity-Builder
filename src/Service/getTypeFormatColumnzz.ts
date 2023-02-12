import makeMapData, { MapDataType } from "@/Factory/makeMapData"
import { OapiType } from "@/Model/Oapi"

export default function getTypeFormatColumnzz(
    tf: LB.TypeFormat,
    argumentzz: TypeFormatWithArgumentzz[], // outer argumentzz
    db: LB.DBData,
) {
    return getColumnzz(
        makeTypeFormatWithArgumentzz(tf, false, argumentzz, makeMapData(db)),
        makeMapData(db),
        new Set(),
    )
}

export interface TypeFormatWithArgumentzz extends LB.TypeFormat {
    argumentzz: TypeFormatWithArgumentzz[]
}

export function getColumnzz(
    tf: TypeFormatWithArgumentzz,
    md: MapDataType,
    set: Set<number>,
) {
    if (tf.type !== OapiType.Wu) {
        return []
    }

    const wu = md.wiwm.get(tf.wuId)
    if (wu === undefined) {
        throw new Error(`Wu ${tf.wuId} not found.`)
    }

    if (set.has(wu.id)) {
        throwError(`circular reference detected.`, wu)
    }

    set.add(wu.id)
    const wpzz = md.wiwpzzm.get(wu.id) ?? []
    if (wpzz.length > tf.argumentzz.length) {
        throwError(`Wu ${wu.name} require ${wpzz.length} argument.`, wu)
    }

    let columnzz = md.wiczzm.get(wu.id) ?? []
    const kidzz = md.wiwkzzm.get(wu.id) ?? []
    kidzz.forEach(function (kid) {
        if (kid.type === OapiType.Wu) {
            const tfwa = makeTypeFormatWithArgumentzz(
                kid,
                wpzz.length > 0,
                tf.argumentzz,
                md,
            )
            columnzz = columnzz.concat(getColumnzz(tfwa, md, set))
            return
        }

        if (kid.type === OapiType.WuParameter) {
            const index = getArgumentIndex(kid, wpzz, wu)
            const argument = tf.argumentzz[index]
            if (argument.type === OapiType.Wu) {
                columnzz = columnzz.concat(getColumnzz(argument, md, set))
                return
            }
        }
    })
    return columnzz
}

function getArgumentIndex(kid: LB.TypeFormat, wpzz: LB.WuParameter[], wu: LB.Wu) {
    const index = wpzz.findIndex((item) => item.id === kid.wuParameterId)
    if (index === -1) {
        throwError(`WuParameter ${kid.wuParameterId} not found`, wu)
    }
    return index
}

function makeArgumentzz(
    owner: LB.TypeFormat,
    needResolve: boolean,
    argumentzz: TypeFormatWithArgumentzz[],
    md: MapDataType,
): TypeFormatWithArgumentzz[] {
    const wpzz = md.wiwpzzm.get(owner.wuId) ?? []
    if (wpzz.length === 0) {
        return []
    }

    if (owner.type !== OapiType.Wu) {
        return []
    }

    const wu = md.wiwm.get(owner.wuId)
    if (wu === undefined) {
        return []
    }

    const argzz = md.tfzzm.get(owner.id) ?? []
    return argzz.map(function (item) {
        if (needResolve) {
            if (item.type === OapiType.Wu) {
                return makeTypeFormatWithArgumentzz(item, true, argumentzz, md)
            }
            if (item.type === OapiType.WuParameter) {
                const index = getArgumentIndex(item, wpzz, wu)
                return argumentzz[index]
            }
        }

        return {
            ...item,
            argumentzz: [],
        }
    })
}

export function makeTypeFormatWithArgumentzz(
    item: LB.TypeFormat,
    needResolve: boolean,
    argumentzz: TypeFormatWithArgumentzz[], // outer argumentzz
    md: MapDataType,
) {
    return {
        ...item,
        argumentzz: makeArgumentzz(item, needResolve, argumentzz, md),
    }
}

function throwError(text: string, wu: LB.Wu) {
    throw new Error(text + ` error found in Wu ${wu.name}`)
}
