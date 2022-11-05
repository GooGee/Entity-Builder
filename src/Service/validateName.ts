export const pattern = "^[a-zA-Z_][a-zA-Z0-9_]*$"
const re = new RegExp(pattern)

export default function validateName(name: string) {
    if (name) {
        if (name.match(re)) {
            return true
        }
    }
    return false
}
