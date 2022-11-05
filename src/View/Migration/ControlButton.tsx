import { createMigrationFile, createMigration } from "@/api"
import { refreshDisk } from "@/Bridge/sendToJava"
import useToastzzStore from "@/Store/useToastzzStore"
import CaretLeft from "../Button/CaretLeft"
import SkipEnd from "../Button/SkipEnd"
import SkipStart from "../Button/SkipStart"
import showConfirm from "../Dialog/showConfirm"

interface Property {
    waiting: boolean
    read(): Promise<void>
}

export default function ControlButton(property: Property) {
    const sToastzzStore = useToastzzStore()

    return (
        <div>
            <div className="mb-3">
                <button
                    disabled={property.waiting}
                    onClick={() =>
                        createMigrationFile()
                            .then((response) =>
                                sToastzzStore.showSuccess(response.data.data),
                            )
                            .then(() => refreshDisk())
                            .then(() => property.read())
                            .catch(sToastzzStore.showError)
                    }
                    className="btn btn-outline-success me-2"
                    type="button"
                >
                    diff
                </button>
                <span>
                    compare files in `database/Entity` with database schemas, and
                    generate a migration file of their difference.
                </span>
            </div>

            <div>
                <button
                    disabled={property.waiting}
                    onClick={() =>
                        showConfirm()
                            .then((response) => {
                                if (response.isConfirmed) {
                                    return createMigration(0)
                                        .then((response) =>
                                            sToastzzStore.showSuccess(
                                                response.data.data,
                                            ),
                                        )
                                        .then(() => property.read())
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
                    disabled={property.waiting}
                    onClick={() =>
                        createMigration(-1)
                            .then((response) =>
                                sToastzzStore.showSuccess(response.data.data),
                            )
                            .then(() => property.read())
                            .catch(sToastzzStore.showError)
                    }
                    className="btn btn-outline-warning me-3"
                    type="button"
                >
                    <CaretLeft></CaretLeft>
                </button>

                {/* <button
                    disabled={property.waiting}
                    onClick={() =>
                        createMigration(1)
                            .then((response) =>
                                sToastzzStore.showSuccess(response.data.data),
                            )
                            .then(() =>property. read())
                            .catch(sToastzzStore.showError)
                    }
                    className="btn btn-outline-warning me-3"
                    type="button"
                >
                    <CaretRight></CaretRight>
                </button> */}

                <button
                    disabled={property.waiting}
                    onClick={() =>
                        createMigration(11)
                            .then((response) =>
                                sToastzzStore.showSuccess(response.data.data),
                            )
                            .then(() => property.read())
                            .catch(sToastzzStore.showError)
                    }
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
