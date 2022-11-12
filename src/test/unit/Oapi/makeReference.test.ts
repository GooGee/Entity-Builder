import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import makeWu from "@/Database/Factory/makeWu"
import { OapiType } from "@/Model/Oapi"
import makeReference from "@/Service/Oapi/makeReference"

test("makeReference", function () {
    const wiwm: Map<number, LB.Wu> = new Map()

    expect(makeReference(makeTypeFormat(), wiwm)).toEqual({
        $ref: "#/components/schemas/Empty",
    })

    const wu = makeWu("User", 1) as LB.Wu
    wu.id = 1
    const tf = makeTypeFormat(OapiType.Wu, wu.id)
    wiwm.set(wu.id, wu)
    const item = makeReference(tf, wiwm)
    expect(item).toEqual({
        $ref: `#/components/schemas/${wu.name}`,
    })
})
