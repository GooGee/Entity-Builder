import makeColumn from "@/Database/Factory/makeColumn"
import makeEntity from "@/Database/Factory/makeEntity"
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

    // Entity
    const Empty = makeFakeEntity("Empty")
    const User = makeFakeEntity("User")
    const Post = makeFakeEntity("Post")

    // Wu
    const empty = makeFakeWu("Empty", Empty, wiwm)
    const user = makeFakeWu("User", User, wiwm)
    const post = makeFakeWu("Post", Post, wiwm)

    const entityzz = [User, Post]
    entityzz.forEach((item) => makeFakeColumn("id", OapiType.integer, item, wiczzm))

    return {
        entity: {
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
    entity: LB.Entity,
    wiczzm: Map<number, LB.Column[]>,
) {
    ColumnIndex += 1

    const item = makeColumn(entity.id, name, type) as LB.Column
    item.id = ColumnIndex

    let zz = wiczzm.get(entity.id)
    if (zz === undefined) {
        zz = []
        wiczzm.set(entity.id, zz)
    }
    zz.push(item)
    return item
}

let EntityIndex = 0
export function makeFakeEntity(name: string) {
    EntityIndex += 1

    const item = makeEntity(name) as LB.Entity
    item.id = EntityIndex

    return item
}

let WuIndex = 0
export function makeFakeWu(name: string, entity: LB.Entity, wiwm: Map<number, LB.Wu>) {
    WuIndex += 1

    const item = makeWu(name, entity.id) as LB.Wu
    item.id = WuIndex

    wiwm.set(item.id, item)
    return item
}
