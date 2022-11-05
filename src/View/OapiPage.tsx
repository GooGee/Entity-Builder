import { exportDB } from "@/Database/getDBC"
import makeOapi from "@/Service/Oapi/makeOapi"
import useOapiStore from "@/Store/useOapiStore"
import { useState } from "react"
import WebLink from "./Button/WebLink"

export default function OapiPage() {
    const sOapiStore = useOapiStore()

    const [text, setText] = useState("")

    return (
        <div>
            <div className="mb-3">
                <h1 className="inline">OpenApi 3.0</h1>
                <WebLink className="ms-3" href="https://spec.openapis.org/oas/v3.0.3">
                    doc
                </WebLink>
                <WebLink className="ms-3" href="https://editor.swagger.io/">
                    editor
                </WebLink>
                <button
                    onClick={() =>
                        exportDB().then(function (db) {
                            const builder = makeOapi(sOapiStore, db)
                            setText(builder.getSpecAsJson())
                        })
                    }
                    className="btn btn-outline-primary ms-3"
                    type="button"
                >
                    toJSON
                </button>
            </div>

            <div className="mb-3">
                <textarea
                    className="form-control"
                    readOnly
                    rows={11}
                    value={text}
                ></textarea>
            </div>
        </div>
    )
}
