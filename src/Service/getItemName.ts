export default function getItemName(item?: LB.IdNameItem) {
    return item?.name ?? "-- not found --"
}
