export default function getTypeFormatOrThrow(
    id: number,
    column: keyof LB.TypeFormat,
    tfzz: LB.TypeFormat[],
) {
    const tf = tfzz.find((item) => item[column] === id)
    if (tf === undefined) {
        const message = `TypeFormat of ${column} ${id} not found`
        console.error(message)
        // todo fix
        const tf = tfzz.find((item) => item[column] === 1)
        if (tf) {
            return tf
        }
        throw new Error(message)
    }
    return tf
}
