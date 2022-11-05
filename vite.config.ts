import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const AV = JSON.stringify(process.env.npm_package_version)

function getFolder() {
    const [major, minor] = AV.replace('"', "")
        .split(".")
        .map((item) => parseInt(item))
    const sum = major * 100 + minor
    const version = "000" + sum
    return "build" + version.slice(-3)
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        APP_VERSION: AV,
    },
    resolve: {
        alias: [{ find: "@", replacement: "/src" }],
    },
    base: "",
    build: {
        outDir: getFolder(),
    },
    server: {
        proxy: {
            "^/laravel-builder": {
                target: "http://bb.lh",
                changeOrigin: true,
                cookieDomainRewrite: "",
            },
        },
    },
})
