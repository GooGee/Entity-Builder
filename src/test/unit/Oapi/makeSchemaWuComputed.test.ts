import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import makeWuChild from "@/Database/Factory/makeWuChild"
import makeWuParameter from "@/Database/Factory/makeWuParameter"
import {
    CompositionKind,
    makeSchemaComposition,
    makeSchemaObject,
    OapiType,
} from "@/Model/Oapi"
import { makeReferenceOf, ComponentKind } from "@/Service/Oapi/makeReference"
import makeSchemaTypeFormat from "@/Service/Oapi/makeSchemaTypeFormat"
import makeSchemaWuComputed from "@/Service/Oapi/makeSchemaWuComputed"
import makeData, { makeFakeColumn } from "./makeData"

const { entity, wu, vivm, wiczzm, wiwczzm, wiwm, wiwpzzm, argumentzz, wpiam } =
    makeData()

test("makeSchemaWuComputed", function () {
    wiwm.set(wu.user.id, wu.user)
    const reference = makeReferenceOf(wu.user.name, ComponentKind.schemas)
    expect(
        makeSchemaWuComputed(wu.user, vivm, wiczzm, wiwczzm, wiwm, wiwpzzm, argumentzz),
    ).toEqual(reference)

    const wp = makeWuParameter(wu.user.id, "ItemType") as LB.WuParameter
    wp.id = 4
    wiwpzzm.set(wu.user.id, [wp])
    const column = makeFakeColumn("data", OapiType.string, entity.User, wiczzm)
    column.tf.type = OapiType.TypeParameter
    column.tf.targetId = wp.id
    const argument = makeSchemaTypeFormat(
        makeTypeFormat(),
        vivm,
        wiczzm,
        wiwczzm,
        wiwm,
        wiwpzzm,
        argumentzz,
        wpiam,
    )
    argumentzz.push(argument)
    wpiam.set(wp.id, argument)
    const result = makeSchemaObject({
        description: "",
        properties: {
            [column.name]: makeSchemaTypeFormat(
                column.tf,
                vivm,
                wiczzm,
                wiwczzm,
                wiwm,
                wiwpzzm,
                argumentzz,
                wpiam,
            ),
            id: {
                format: "",
                type: OapiType.string,
            },
        },
    })
    expect(
        makeSchemaWuComputed(wu.user, vivm, wiczzm, wiwczzm, wiwm, wiwpzzm, argumentzz),
    ).toEqual(result)

    wu.user.isMap = true
    wu.user.tf.type = OapiType.TypeParameter
    wu.user.tf.targetId = wp.id
    result.additionalProperties = makeSchemaTypeFormat(
        wu.user.tf,
        vivm,
        wiczzm,
        wiwczzm,
        wiwm,
        wiwpzzm,
        argumentzz,
        wpiam,
    )
    expect(
        makeSchemaWuComputed(wu.user, vivm, wiczzm, wiwczzm, wiwm, wiwpzzm, argumentzz),
    ).toEqual(result)

    const wc = makeWuChild(wu.user.id, OapiType.TypeParameter, wp.id) as LB.WuChild
    wc.id = 5
    wiwczzm.set(wu.user.id, [wc])
    const child = makeSchemaTypeFormat(
        wc.tf,
        vivm,
        wiczzm,
        wiwczzm,
        wiwm,
        wiwpzzm,
        argumentzz,
        wpiam,
    )
    expect(
        makeSchemaWuComputed(wu.user, vivm, wiczzm, wiwczzm, wiwm, wiwpzzm, argumentzz),
    ).toEqual(makeSchemaComposition([child, result], wu.user.type as CompositionKind))

    // todo child Wu with WuParameter
    // todo nested child Wu with WuParameter
})
