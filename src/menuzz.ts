export enum PageEnum {
    Home = "Home",
    Collection = "Collection",
    Diagram = "Diagram",
    Entity = "Entity",
    Enum = "Enum",
    Example = "Example",
    Flow = "Flow",
    Header = "Header",
    Info = "Info",
    Migration = "Migration",
    OpenApi = "OpenApi",
    Parameter = "Parameter",
    Request = "Request",
    Response = "Response",
    Server = "Server",
    Toast = "Toast",
    Tree = "Tree",
    Wu = "Wu",
}

export class Menu {
    constructor(
        readonly name: PageEnum,
        readonly path: string,
        readonly visible: boolean = true,
        readonly childzz: Menu[] = [],
    ) {}
}

const URI = "/"

const pagezz = Object.keys(PageEnum) as Array<keyof typeof PageEnum>

const menuzz = pagezz.map((item) => new Menu(PageEnum[item], makePath(PageEnum[item])))

export default menuzz

export const treezz = [
    new Menu(PageEnum.Home, URI),
    new Menu(PageEnum.Collection, makePath(PageEnum.Collection)),
    new Menu(PageEnum.Diagram, makePath(PageEnum.Diagram)),
    new Menu(PageEnum.Entity, makePath(PageEnum.Entity)),
    new Menu(PageEnum.Flow, makePath(PageEnum.Flow)),
    new Menu(PageEnum.Migration, makePath(PageEnum.Migration)),
    new Menu(PageEnum.OpenApi, makePath(PageEnum.OpenApi), true, [
        new Menu(PageEnum.Info, makePath(PageEnum.Info)),
        new Menu(PageEnum.Enum, makePath(PageEnum.Enum)),
        new Menu(PageEnum.Example, makePath(PageEnum.Example)),
        new Menu(PageEnum.Header, makePath(PageEnum.Header)),
        new Menu(PageEnum.Parameter, makePath(PageEnum.Parameter)),
        new Menu(PageEnum.Request, makePath(PageEnum.Request)),
        new Menu(PageEnum.Response, makePath(PageEnum.Response)),
        new Menu(PageEnum.Server, makePath(PageEnum.Server)),
        new Menu(PageEnum.Wu, makePath(PageEnum.Wu)),
    ]),
    new Menu(PageEnum.Toast, makePath(PageEnum.Toast)),
    new Menu(PageEnum.Tree, makePath(PageEnum.Tree)),
]

export function makePath(page: PageEnum) {
    return URI + (page === PageEnum.Home ? "" : page)
}
