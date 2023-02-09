export default function makeKeywordRE(keyword: string) {
    return new RegExp(keyword.split("").join(".*"), "i")
}
