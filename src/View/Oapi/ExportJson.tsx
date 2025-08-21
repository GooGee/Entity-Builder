import { exportDB } from "@/Database/getDBC"
import makeOapi from "@/Service/Oapi/makeOapi"
import useOapiStore from "@/Store/useOapiStore"
import { useState } from "react"
import useModulezzStore from "@/Store/useModulezzStore"
import WebLink from "../Button/WebLink"
import SelectButton from "../Button/SelectButton"

export default function ExportJson() {
    const suseModulezzStore = useModulezzStore()
    const sOapiStore = useOapiStore()

    const [moduleId, setModuleId] = useState(0)
    const [text, setText] = useState("")

    return (
        <div>
            <div>
                <SelectButton
                    allow0
                    className="inline wa"
                    verb="all"
                    value={moduleId}
                    itemzz={suseModulezzStore.itemzz}
                    change={setModuleId}
                ></SelectButton>
                <button
                    onClick={() =>
                        exportDB().then(function (db) {
                            const builder = makeOapi(sOapiStore, db, moduleId)
                            setText(builder.getSpecAsJson())
                        })
                    }
                    className="btn btn-outline-primary mx-3"
                    type="button"
                >
                    toJSON
                </button>
                <WebLink href="https://editor.swagger.io/">editor</WebLink>
            </div>

            <div className="my-3">
                <textarea className="form-control" readOnly rows={11} value={text}></textarea>
            </div>
        </div>
    )
}
