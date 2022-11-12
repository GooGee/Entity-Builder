import { makeIdColumn } from "@/Database/Factory/makeColumn"
import makeSchema from "@/Database/Factory/makeSchema"
import makeWu from "@/Database/Factory/makeWu"
import {
    makeSchemaObject,
    OapiReference,
    OapiSchema,
    OapiSchemaAny,
} from "@/Model/Oapi"
import { makeReferenceEmpty } from "@/Service/Oapi/makeReference"
import makeSchemaTypeFormat from "@/Service/Oapi/makeSchemaTypeFormat"
import makeSchemaWu from "@/Service/Oapi/makeSchemaWu"

const vivm: Map<number, LB.Variable> = new Map()
const wiczzm: Map<number, LB.Column[]> = new Map()
const wiwczzm: Map<number, LB.WuChild[]> = new Map()
const wiwm: Map<number, LB.Wu> = new Map()
const wiwpzzm: Map<number, LB.WuParameter[]> = new Map()
const parameterzz: (OapiSchemaAny | OapiReference | OapiSchema)[] = []
const wpism: Map<number, OapiSchemaAny | OapiReference | OapiSchema> = new Map()

test("makeSchemaWu", function () {
    const empty = makeWu("Empty", 1) as LB.Wu
    empty.id = 1

    expect(
        makeSchemaWu(empty, vivm, wiczzm, wiwczzm, wiwm, wiwpzzm, parameterzz),
    ).toEqual(makeSchemaObject({}))

    const wu = makeWu("User", 1) as LB.Wu
    wu.id = 2
    expect(makeSchemaWu(wu, vivm, wiczzm, wiwczzm, wiwm, wiwpzzm, parameterzz)).toEqual(
        makeReferenceEmpty(),
    )

    // const schema = makeSchema("User") as LB.Schema
    // schema.id = 1
    // const column = makeIdColumn(schema.id, []) as LB.Column
    // column.id = 1
    // const wc: LB.WuColumn = {
    //     id: 1,
    //     columnId: column.id,
    //     wuId: wu.id,
    //     alias: "",
    // }
    // wiczzm.set(wu.id, [column])
    // expect(makeSchemaWu(wu, vivm, wiczzm, wiwczzm, wiwm, wiwpzzm, parameterzz)).toEqual(
    //     makeSchemaObject({
    //         description: wu.description,
    //         properties: {
    //             [column.name]: makeSchemaTypeFormat(
    //                 column.tf,
    //                 vivm,
    //                 wiczzm,
    //                 wiwczzm,
    //                 wiwm,
    //                 wiwpzzm,
    //                 parameterzz,
    //                 wpism,
    //             ),
    //         },
    //     }),
    // )
})
