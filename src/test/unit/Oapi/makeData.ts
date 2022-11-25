import makeColumn from "@/Database/Factory/makeColumn"
import makeSchema from "@/Database/Factory/makeSchema"
import makeWu from "@/Database/Factory/makeWu"
import { OapiReference, OapiSchema, OapiType } from "@/Model/Oapi"

export default function makeData() {
    const vivm: Map<number, LB.Variable> = new Map()
    const wiczzm: Map<number, LB.Column[]> = new Map()
    const wiwczzm: Map<number, LB.WuChild[]> = new Map()
    const wiwm: Map<number, LB.Wu> = new Map()
    const wiwpzzm: Map<number, LB.WuParameter[]> = new Map()
    const argumentzz: (OapiReference | OapiSchema)[] = []
    const wpiam: Map<number, OapiReference | OapiSchema> = new Map()

    // Schema
    const Empty = makeFakeSchema("Empty")
    const User = makeFakeSchema("User")
    const Post = makeFakeSchema("Post")

    // Wu
    const empty = makeFakeWu("Empty", Empty, wiwm)
    const user = makeFakeWu("User", User, wiwm)
    const post = makeFakeWu("Post", Post, wiwm)

    const schemazz = [User, Post]
    schemazz.forEach((item) => makeFakeColumn("id", OapiType.integer, item, wiczzm))

    return {
        schema: {
            Empty,
            User,
            Post,
        },
        wu: {
            empty,
            user,
            post,
        },
        vivm,
        wiczzm,
        wiwczzm,
        wiwm,
        wiwpzzm,
        argumentzz,
        wpiam,
    }
}

let ColumnIndex = 0
export function makeFakeColumn(
    name: string,
    type: OapiType,
    schema: LB.Schema,
    wiczzm: Map<number, LB.Column[]>,
) {
    ColumnIndex += 1

    const item = makeColumn(schema.id, name, type) as LB.Column
    item.id = ColumnIndex

    let zz = wiczzm.get(schema.id)
    if (zz === undefined) {
        zz = []
        wiczzm.set(schema.id, zz)
    }
    zz.push(item)
    return item
}

let SchemaIndex = 0
export function makeFakeSchema(name: string) {
    SchemaIndex += 1

    const item = makeSchema(name) as LB.Schema
    item.id = SchemaIndex

    return item
}

let WuIndex = 0
export function makeFakeWu(name: string, schema: LB.Schema, wiwm: Map<number, LB.Wu>) {
    WuIndex += 1

    const item = makeWu(name, schema.id) as LB.Wu
    item.id = WuIndex

    wiwm.set(item.id, item)
    return item
}
