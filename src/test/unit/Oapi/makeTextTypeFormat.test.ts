import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import makeVariable from "@/Database/Factory/makeVariable"
import makeWu from "@/Database/Factory/makeWu"
import makeWuParameter from "@/Database/Factory/makeWuParameter"
import makeFinder from "@/Factory/makeFinder"
import { OapiType } from "@/Model/Oapi"
import makeTextTypeFormat from "@/Service/Oapi/makeTextTypeFormat"

const sVariablezzStore = makeFinder<LB.Variable>()

const sWuParameterzzStore = makeFinder<LB.WuParameter>()

const sWuzzStore = makeFinder<LB.Wu>()

function makeText(tf: LB.TypeFormat) {
    return makeTextTypeFormat(tf, sVariablezzStore, sWuParameterzzStore, sWuzzStore)
}

test("makeTextTypeFormat", function () {
    const wu = makeWu("User", 1) as LB.Wu
    wu.id = 1
    const tf = makeTypeFormat(OapiType.Wu, wu.id)
    expect(makeText(tf)).toBe(`Wu ${wu.id} not found`)

    sWuzzStore.itemzz.push(wu)
    expect(makeText(tf)).toBe(`${wu.name}`)

    // makeVariable
    const variable = makeVariable("Version") as LB.Variable
    variable.id = 2
    const tfv = makeTypeFormat(OapiType.Enum, variable.id)
    expect(makeText(tfv)).toBe(`Enum ${variable.id} not found`)

    sVariablezzStore.itemzz.push(variable)
    expect(makeText(tfv)).toBe(`Enum ${variable.name}`)

    // makeWuParameter
    const wp = makeWuParameter(wu.id, "ItemType") as LB.WuParameter
    wp.id = 3
    const tfp = makeTypeFormat(OapiType.TypeParameter, wp.id)
    expect(makeText(tfp)).toBe(`TypeParameter ${wp.id} not found`)

    sWuParameterzzStore.itemzz.push(wp)
    expect(makeText(tfp)).toBe(`${wp.name}`)

    // TypeParameter
    const parameter = makeTypeFormat()
    tf.argumentzz.push(parameter)
    expect(makeText(tf)).toBe(`${wu.name}<${parameter.type}>`)

    tf.argumentzz.push(tfv)
    expect(makeText(tf)).toBe(`${wu.name}<${parameter.type}, ${makeText(tfv)}>`)

    const wu2 = makeWu("Post", 1) as LB.Wu
    wu2.id = 2
    const tf2 = makeTypeFormat(OapiType.Wu, wu2.id)
    tf.argumentzz.push(tf2)
    expect(makeText(tf)).toBe(
        `${wu.name}<${parameter.type}, ${makeText(tfv)}, ${makeText(tf2)}>`,
    )
})
