import nunjucks from 'nunjucks'
import UniqueItem from './Base/UniqueItem'

nunjucks.configure({ autoescape: false })

export function addQuote(text: any, quote: string = "'") {
    if (hasQuote(text)) {
        return text
    }
    return `${quote}${text}${quote}`
}

export function exeText(text: string, data: Object): string {
    const names = Object.keys(data)
    const values = Object.values(data)
    return new Function(...names, `return \`${text}\`;`)(...values)
}

export function filter(keyword: string, list: Array<UniqueItem>) {
    const re = new RegExp(keyword, 'i')
    return list.filter(item => item.name.search(re) > -1)
}

export function hasQuote(text: any) {
    if (typeof text === 'string') {
        if (text.length < 2) {
            return false
        }
        if (text[0] === "'" && text[text.length - 1] === "'") {
            return true
        }
        if (text[0] === '"' && text[text.length - 1] === '"') {
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
