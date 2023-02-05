import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import makeVariable from "@/Database/Factory/makeVariable"
import makeWuParameter from "@/Database/Factory/makeWuParameter"
import { CompositionKind, OapiSchemaType, OapiType } from "@/Model/Oapi"
import makeReference, {
    makeReferenceOf,
    ComponentKind,
} from "@/Service/Oapi/makeReference"
import { makeSchemaEnumName } from "@/Service/Oapi/makeSchemaEnum"
import makeSchemaTypeFormat from "@/Service/Oapi/makeSchemaTypeFormat"
import makeData, { makeFakeColumn } from "./makeData"

const { entity, wu, vivm, wiczzm, wiwczzm, wiwm, wiwpzzm, argumentzz, wpiam } =
    makeData()

test("makeSchemaTypeFormat", function () {
    expect(
        makeSchemaTypeFormat(
            makeTypeFormat(OapiType.any, 0),
            vivm,
            wiczzm,
            wiwczzm,
            wiwm,
            wiwpzzm,
            argumentzz,
            wpiam,
        ),
    ).toEqual({})

    expect(
        makeSchemaTypeFormat(
            makeTypeFormat(OapiType.string, 0),
            vivm,
            wiczzm,
            wiwczzm,
            wiwm,
            wiwpzzm,
            argumentzz,
            wpiam,
        ),
    ).toEqual({
        format: "",
        type: OapiType.string,
    })

    const tfarray = makeTypeFormat(OapiType.string, 0)
    tfarray.isArray = true
    expect(
        makeSchemaTypeFormat(
            tfarray,
            vivm,
            wiczzm,
            wiwczzm,
            wiwm,
            wiwpzzm,
            argumentzz,
            wpiam,
        ),
    ).toEqual({
        type: OapiSchemaType.array,
        items: {
            format: "",
            type: OapiType.string,
        },
    })

    const variable = makeVariable("version") as LB.Variable
    variable.id = 1
    variable.default = "1"
    vivm.set(variable.id, variable)

    expect(
        makeSchemaTypeFormat(
            makeTypeFormat(OapiType.Enum, variable.id),
            vivm,
            wiczzm,
            wiwczzm,
            wiwm,
            wiwpzzm,
            argumentzz,
            wpiam,
        ),
    ).toEqual(makeReferenceOf(makeSchemaEnumName(variable.name), ComponentKind.schemas))

    wiwm.set(wu.empty.id, wu.empty)
    wiwm.set(wu.user.id, wu.user)
    const wp = makeWuParameter(wu.user.id, "ItemType") as LB.WuParameter
    wp.id = 3
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
    expect(
        makeSchemaTypeFormat(
            makeTypeFormat(OapiType.TypeParameter, wp.id),
            vivm,
            wiczzm,
            wiwczzm,
            wiwm,
            wiwpzzm,
            argumentzz,
            wpiam,
        ),
    ).toEqual(argument)

    const tfwu = makeTypeFormat(OapiType.Wu, wu.user.id)
    const tfargument = makeTypeFormat(OapiType.number)
    tfwu.argumentzz.push(tfargument)
    expect(
        makeSchemaTypeFormat(
            tfwu,
            vivm,
            wiczzm,
            wiwczzm,
            wiwm,
            wiwpzzm,
            argumentzz,
            wpiam,
        ),
    ).toEqual({
        description: "",
        properties: {
            data: {
                format: tfargument.format,
                type: tfargument.type,
            },
            id: {
                format: "",
                type: OapiType.string,
            },
        },
        type: OapiSchemaType.object,
    })
})
