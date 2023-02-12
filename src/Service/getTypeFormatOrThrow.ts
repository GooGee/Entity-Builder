export default function getTypeFormatOrThrow(
    id: number,
    column: keyof LB.TypeFormat,
    tfzz: LB.TypeFormat[],
) {
    const tf = tfzz.find((item) => item[column] === id)
    if (tf === undefined) {
        throw new Error(`TypeFormat ${id} not found`)
    }
    return tf
}
