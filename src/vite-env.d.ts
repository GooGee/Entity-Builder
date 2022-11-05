/// <reference types="vite/client" />

declare const APP_VERSION: string

interface Bridge {
    error(code: string, message: string): void
    send(text: string): void
}

interface JavaBridge {
    send(text: string): void
}

interface Window {
    JavaBridge: JavaBridge
    bridge: Bridge
}
