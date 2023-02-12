enum LayerEnum {
    Action = "Action",
    Cache = "Cache",
    Command = "Command",
    Controller = "Controller",
    Entity = "Entity",
    Event = "Event",
    Factory = "Factory",
    Model = "Model",
    Repository = "Repository",
    Request = "Request",
    Response = "Response",
    Service = "Service",
    Test = "Test",
    View = "View",
}

export default LayerEnum

export const Layerzz = Object.keys(LayerEnum) as Array<keyof typeof LayerEnum>
