import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import { OapiReference, OapiSchema, OapiType } from "@/Model/Oapi"
import makeSchemaTypeFormat from "@/Service/Oapi/makeSchemaTypeFormat"

const vivm: Map<number, LB.Variable> = new Map()
const wiczzm: Map<number, LB.Column[]> = new Map()
const wiwczzm: Map<number, LB.WuChild[]> = new Map()
const wiwm: Map<number, LB.Wu> = new Map()
const wiwpzzm: Map<number, LB.WuParameter[]> = new Map()
const parameterzz: (object | OapiReference | OapiSchema)[] = []
const wpism: Map<number, object | OapiReference | OapiSchema> = new Map()

test("makeSchemaTypeFormat", function () {
    expect(
        makeSchemaTypeFormat(
            makeTypeFormat(OapiType.any, 0),
            vivm,
            wiczzm,
            wiwczzm,
            wiwm,
            wiwpzzm,
            parameterzz,
            wpism,
        ),
    ).toEqual({})

    const tfstring = makeTypeFormat(OapiType.string, 0)
    expect(
        makeSchemaTypeFormat(
            tfstring,
            vivm,
            wiczzm,
            wiwczzm,
            wiwm,
            wiwpzzm,
            parameterzz,
            wpism,
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
            parameterzz,
            wpism,
        ),
    ).toEqual({
        type: "array",
        items: {
            format: "",
            type: OapiType.string,
        },
    })
})
