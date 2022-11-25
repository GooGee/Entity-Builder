import makeSideBarItem from "@/Database/Factory/makeSideBarItem"
import makeVariable from "@/Database/Factory/makeVariable"
import makeServer from "@/Service/Oapi/makeServer"

test("makeServer", function () {
    const data = makeSideBarItem("localhost") as LB.Server
    data.id = 1
    data.global = true
    const variable = makeVariable("version") as LB.Variable
    variable.id = 1
    variable.default = "1"
    const sivzzm = new Map([[data.id, [variable]]])
    const item = makeServer(data, sivzzm)
    expect(item.url).toBe(data.name)
    expect(item.variables[variable.name].default).toBe(variable.default)
})
