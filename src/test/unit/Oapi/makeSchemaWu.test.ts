import makeWuChild from "@/Database/Factory/makeWuChild"
import { CompositionKind, makeSchemaObject, OapiType } from "@/Model/Oapi"
import makeSchemaTypeFormat from "@/Service/Oapi/makeSchemaTypeFormat"
import makeSchemaWu from "@/Service/Oapi/makeSchemaWu"
import makeData from "./makeData"

const { entity, wu, vivm, wiczzm, wiwczzm, wiwm, wiwpzzm, argumentzz, wpiam } =
    makeData()

test("makeSchemaWu", function () {
    expect(makeSchemaWu(wu.empty, vivm, wiczzm, wiwczzm, wiwm)).toEqual(
        makeSchemaObject({}),
    )

    const [column] = wiczzm.get(wu.user.id)!
    const result = makeSchemaObject({
        description: wu.user.description,
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
        },
    })
    expect(makeSchemaWu(wu.user, vivm, wiczzm, wiwczzm, wiwm)).toEqual(result)

    wu.user.isMap = true
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
    expect(makeSchemaWu(wu.user, vivm, wiczzm, wiwczzm, wiwm)).toEqual(result)

    const wc = makeWuChild(wu.user.id, OapiType.Wu, wu.empty.id) as LB.WuChild
    wc.id = 1
    wiwczzm.set(wu.user.id, [wc])

    expect(makeSchemaWu(wu.user, vivm, wiczzm, wiwczzm, wiwm)).toEqual({
        [CompositionKind.allOf]: [
            makeSchemaTypeFormat(
                wc.tf,
                vivm,
                wiczzm,
                wiwczzm,
                wiwm,
                wiwpzzm,
                argumentzz,
                wpiam,
            ),
            result,
        ],
    })
})
