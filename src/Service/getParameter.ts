import { PageEnum } from "@/menuzz"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useEntityzzStore from "@/Store/useEntityzzStore"

export function getParameterzz(page: PageEnum) {
    const entity = useEntityzzStore.getState().findByName(page)
    if (entity === undefined) {
        return []
    }
    return useColumnzzStore
        .getState()
        .itemzz.filter((item) => item.entityId === entity.id)
}

export function getParameter(name: string, page: PageEnum) {
    return getParameterzz(page).find((item) => item.name === name)
}

export function getParameterInPath(name: string) {
    return getParameterzz(PageEnum.ParameterInPath).find((item) => item.name === name)
}

export function getLocation(page: string) {
    return page.replace("ParameterIn", "").toLowerCase()
}
