import { ServerVariableObject } from "openapi3-ts"

export default function makeServer(
    item: LB.Server,
    sivzzm: Map<number, LB.Variable[]>,
) {
    const vzz = sivzzm.get(item.id) ?? []
    const variables = vzz.reduce(function (old, item) {
        const data = {
            default: item.default,
            description: item.description,
            enum: item.enum,
        }
        old[item.name] = data
        return old
    }, Object.create(null) as Record<string, ServerVariableObject>)
    return {
        description: item.description,
        url: item.name,
        variables,
    }
}
