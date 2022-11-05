import useCollectionItemzzStore from "@/Store/useCollectionItemzzStore"
import useCollectionzzStore from "@/Store/useCollectionzzStore"

export default function getCollectionItemzz(name: string) {
    const found = useCollectionzzStore.getState().findByName(name)
    if (found === undefined) {
        throw new Error(`Collection ${name} not found`)
    }
    return useCollectionItemzzStore
        .getState()
        .itemzz.filter((item) => item.collectionId === found.id)
}
