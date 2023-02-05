import LayerEnum from "@/Model/LayerEnum"

export function makeRequestName(action: string, entity: LB.Entity) {
    return `${entity.name}_${action}_${LayerEnum.Request}`
}

export function makeResponseName(action: string, entity: LB.Entity) {
    return `${entity.name}_${action}_${LayerEnum.Response}`
}

export function makeWuName(action: string, entity: LB.Entity, isRequest: boolean) {
    return `${entity.name}_${action}_` + (isRequest ? "Form" : "DTO")
}
