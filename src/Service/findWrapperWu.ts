import useWuzzStore from "@/Store/useWuzzStore"

export default function findWrapperWu(action: string) {
    const ss = useWuzzStore.getState()
    const many = ss.findByName("ApiItemzz")?.id
    const one = ss.findByName("ApiItem")?.id
    const map = new Map([
        ["ReadAll", many],
        ["ReadMany", many],
        ["Current", one],
        ["One", one],
        ["ReadPage", ss.findByName("ApiPage")?.id],
    ])
    for (const [key, value] of map) {
        if (action.includes(key)) {
            return value
        }
    }
    return ss.findByName("ApiValue")?.id
}
