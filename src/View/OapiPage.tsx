import WebLink from "./Button/WebLink"
import ExportJson from "./Oapi/ExportJson"

export default function OapiPage() {
    return (
        <div>
            <div className="mb-3">
                <h1 className="inline">OpenApi 3.0</h1>
                <WebLink className="ms-3" href="https://spec.openapis.org/oas/v3.0.3">
                    doc
                </WebLink>
            </div>

            <ExportJson></ExportJson>
        </div>
    )
}
