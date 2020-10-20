import nunjucks from 'nunjucks'

nunjucks.configure({ autoescape: false })

export function addQuote(text: any, quote: string = "'") {
    return `${quote}${text}${quote}`
}

export function exeText(text: string, data: Object): string {
    const names = Object.keys(data)
    const values = Object.values(data)
    return new Function(...names, `return \`${text}\`;`)(...values)
}

export function hasQuote(text: any) {
    if (typeof text === 'string') {
        if (text.match(/^".*"$/)) {
            return true
        }
        if (text.match(/^'.*'$/)) {
            return true
        }
    }

    return false
}

export function numberOrQuote(text: any) {
    if (isNaN(parseFloat(text))) {
        return addQuote(text)
    }
    return text
}

export function render(template: string, data: object) {
    return nunjucks.renderString(template, data)
}

export function run(code: string, data: object) {
    if (code) {
        const fff = new Function('return ' + code)()
        fff(data)
    }
}
