import ActionEnum from "./ActionEnum"

export default function sendToJava(action: ActionEnum, key: string, data: string) {
    if (window.JavaBridge === undefined) {
        throw new Error(
            "window.JavaBridge is undefined. only available in JetBrains IDE.",
        )
    }

    const text = JSON.stringify({ action, key, data })
    window.JavaBridge.send(text)
}

export function editFile(name: string, content: string) {
    return sendToJava(ActionEnum.edit, name, content)
}

export function openLink(link: string) {
    return sendToJava(ActionEnum.open, link, "")
}

export function refreshDisk() {
    return sendToJava(ActionEnum.refresh, "", "")
}
