export default function runCode(code: string) {
    return new Function("return " + code)()
}

export function callCode(code: string, data?: any) {
    return runCode(code)(data)
}
