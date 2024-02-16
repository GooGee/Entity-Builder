import LayerEnum from "@/Model/LayerEnum"

export function makeParameterName(action: string, entity: LB.Entity, name: string) {
    return `${entity.name}_${action}_${name}`
}

export function makeRequestName(action: string, entity: LB.Entity) {
    return makeParameterName(action, entity, LayerEnum.Request)
}

export function makeResponseName(action: string, entity: LB.Entity) {
    return makeParameterName(action, entity, LayerEnum.Response)
}

export function makeWuName(action: string, entity: LB.Entity, isRequest: boolean) {
    return makeParameterName(action, entity, isRequest ? "Form" : "DTO")
}
