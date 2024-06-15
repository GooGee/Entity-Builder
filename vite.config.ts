import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const AV = JSON.stringify(process.env.npm_package_version)

function getVersion() {
    const [major, minor] = AV.replace('"', "")
        .split(".")
        .map((item) => parseInt(item))
    const sum = major * 100 + minor
    const version = "000" + sum
    return version.slice(-3)
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        APP_VERSION: AV,
        APP_VERSION_NUMBER: '"' + getVersion() + '"',
    },
    resolve: {
        alias: [{ find: "@", replacement: "/src" }],
    },
    base: "",
    build: {
        outDir: "build" + getVersion(),
    },
    server: {
        proxy: {
            "^/laravel-builder": {
                target: "http://127.0.0.1",
                changeOrigin: true,
                cookieDomainRewrite: "",
            },
        },
    },
})
