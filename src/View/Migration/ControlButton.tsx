import { createMigrationFile, createMigration } from "@/api"
import { refreshDisk } from "@/Bridge/sendToJava"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState } from "react"
import CaretLeft from "../Button/CaretLeft"
import SkipEnd from "../Button/SkipEnd"
import SkipStart from "../Button/SkipStart"
import showConfirm from "../Dialog/showConfirm"
import { MigrationCodeFileName } from "@/Model/FileManager"
import runCodeFile from "@/Service/runCodeFile"
import useEntityzzStore from "@/Store/useEntityzzStore"

interface Property {
    waiting: boolean
    read(): Promise<void>
}

export default function ControlButton(property: Property) {
    const sToastzzStore = useToastzzStore()

    const [waiting, setWaiting] = useState(false)

    function migrate(step: number) {
        if (waiting) {
            return
        }

        setWaiting(true)
        return createMigration(step)
            .then((response) => sToastzzStore.showSuccess(response.data.data))
            .then(property.read)
            .catch(sToastzzStore.showError)
            .then(() => setWaiting(false))
    }

    return (
        <div>
            <div className="mb-3">
                {waiting === false ? null : (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}

                <button
                    disabled={waiting || property.waiting}
                    onClick={function () {
                        if (waiting) {
                            return
                        }

                        setWaiting(true)
                        createMigrationFile()
                            .then(function (response) {
                                sToastzzStore.showSuccess(response.data.data)
                            })
                            .then(refreshDisk)
                            .then(property.read)
                            .catch(sToastzzStore.showError)
                            .finally(() => setWaiting(false))
                    }}
                    className="btn btn-outline-success me-2"
                    type="button"
                >
                    diff
                </button>
                <span>
                    compare files in `database/Entity` with database schemas, and generate a migration file of their
                    difference.
                </span>
            </div>

            <div>
                <button
                    disabled={waiting || property.waiting}
                    onClick={() =>
                        showConfirm()
                            .then((response) => {
                                if (response.isConfirmed) {
                                    return migrate(0)
                                }
                            })
                            .catch(sToastzzStore.showError)
                    }
                    className="btn btn-outline-warning me-3"
                    type="button"
                >
                    <SkipStart></SkipStart>
                </button>

                <button
                    disabled={waiting || property.waiting}
                    onClick={() => migrate(-1)}
                    className="btn btn-outline-warning me-3"
                    type="button"
                >
                    <CaretLeft></CaretLeft>
                </button>

                {/* <button
                    disabled={waiting || property.waiting}
                    onClick={() => migrate(1)}
                    className="btn btn-outline-warning me-3"
                    type="button"
                >
                    <CaretRight></CaretRight>
                </button> */}

                <button
                    disabled={waiting || property.waiting}
                    onClick={() => migrate(11)}
                    className="btn btn-outline-warning me-2"
                    type="button"
                >
                    <SkipEnd></SkipEnd>
                </button>

                <span>run artisan command `migrate`</span>
            </div>
        </div>
    )
}
