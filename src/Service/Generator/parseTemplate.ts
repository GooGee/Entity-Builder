export type DataType = Record<string, Array<any> | boolean | number | object | string>

export default function parseTemplate(template: string, data: DataType) {
    const keyzz = Object.keys(data)
    const valuezz = Object.values(data)
    return new Function(...keyzz, `return \`${template}\`;`)(...valuezz) as string
}
