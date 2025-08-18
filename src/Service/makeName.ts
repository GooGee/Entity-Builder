import LayerEnum from "@/Model/LayerEnum"

export function makeParameterName(module: LB.Module, ma: LB.ModuleAction, entity: LB.Entity, name: string) {
    return `${module.name}_${entity.name}_${ma.name}_${name}`
}

export function makeRequestName(module: LB.Module, ma: LB.ModuleAction, entity: LB.Entity) {
    return makeParameterName(module, ma, entity, LayerEnum.Request)
}

export function makeResponseName(module: LB.Module, ma: LB.ModuleAction, entity: LB.Entity) {
    return makeParameterName(module, ma, entity, LayerEnum.Response)
}

export function makeWuName(module: LB.Module, ma: LB.ModuleAction, entity: LB.Entity, isRequest: boolean) {
    return makeParameterName(module, ma, entity, isRequest ? "Form" : "Result")
}
