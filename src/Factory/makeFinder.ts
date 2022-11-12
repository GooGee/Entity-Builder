export default function makeFinder<T extends LB.IdItem>(
    itemzz: T[] = [],
): LB.Finder<T> {
    return {
        itemzz,
        find(id: number) {
            return itemzz.find((item) => item.id === id)
        },
    }
}
