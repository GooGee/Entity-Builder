export default function makeJavaBridge() {
    window.bridge = {
        error(code: string, message: string) {
            console.log(code, message)
        },
        send(text: string) {
            console.log(text)
        },
    }
}
