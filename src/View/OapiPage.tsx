import { exportDB } from "@/Database/getDBC"
import makeOapi from "@/Service/Oapi/makeOapi"
import useOapiStore from "@/Store/useOapiStore"
import { useState } from "react"
import WebLink from "./Button/WebLink"
import SelectButton from "./Button/SelectButton"
import useModulezzStore from "@/Store/useModulezzStore"

export default function OapiPage() {
    const suseModulezzStore = useModulezzStore()
    const sOapiStore = useOapiStore()

    const [moduleId, setModuleId] = useState(1)
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
                <SelectButton
                    className="inline wa mx-3"
                    value={moduleId}
                    itemzz={suseModulezzStore.itemzz}
                    change={function (index, item) {
                        if (item) {
                            setModuleId(item.id)
                        }
                    }}
                ></SelectButton>
                <button
                    onClick={() =>
                        exportDB().then(function (db) {
                            const builder = makeOapi(sOapiStore, db, moduleId)
                            setText(builder.getSpecAsJson())
                        })
                    }
                    className="btn btn-outline-primary"
                    type="button"
                >
                    toJSON
                </button>
            </div>

            <div className="mb-3">
                <textarea className="form-control" readOnly rows={11} value={text}></textarea>
            </div>
        </div>
    )
}
