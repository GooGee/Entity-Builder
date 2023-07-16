import { deleteMigrationFile, readMigration } from "@/api"
import { refreshDisk } from "@/Bridge/sendToJava"
import useToastzzStore from "@/Store/useToastzzStore"
import showConfirm from "@/View/Dialog/showConfirm"
import { useState, useEffect } from "react"
import CheckCircle from "../Button/CheckCircle"
import EditButton from "../Button/EditButton"
import ControlButton from "./ControlButton"

export default function VersionList() {
    const sToastzzStore = useToastzzStore()

    const [state, setState] = useState<LB.MigrationStatus>(makeState())
    const [waiting, setWaiting] = useState(false)

    let unmounted = false

    useEffect(() => {
        read().catch(sToastzzStore.showError)
        return function () {
            unmounted = true
        }
    }, [])

    function makeState() {
        return {
            dbexist: false,
            filezz: [],
            migrationzz: [],
        }
    }

    function read() {
        if (waiting) {
            return Promise.reject("waiting...")
        }

        setWaiting(true)
        return readMigration()
            .then((response) => {
                if (unmounted) {
                    return
                }
                setState(response.data.data)
            })
            .finally(() => setWaiting(false))
    }

    const versionMap: Map<string, LB.Migration> = new Map()
    state.migrationzz.forEach((item) => versionMap.set(item.migration, { ...item }))

    const migrationzz = [...versionMap.values()]
    state.filezz.forEach((migration) => {
        const found = versionMap.get(migration.replace(".php", ""))
        if (found) {
            found.migration = migration
            return
        }
        migrationzz.push({ batch: 0, migration })
    })
    migrationzz.reverse()

    function makeView(item: LB.Migration) {
        if (item.migration.endsWith(".php")) {
            //
        } else {
            return <span className="text-danger">{item.migration}</span>
        }

        return (
            <div className="btn-group">
                <button
                    onClick={() =>
                        showConfirm()
                            .then((response) => {
                                if (response.isConfirmed) {
                                    return deleteMigrationFile(item.migration)
                                        .then(refreshDisk)
                                        .then(read)
                                }
                            })
                            .catch(sToastzzStore.showError)
                    }
                    disabled={item.batch > 0}
                    className="btn btn-outline-primary danger"
                    type="button"
                >
                    -
                </button>
                <EditButton
                    content=""
                    file={"database/migrations/" + item.migration}
                    text={item.migration}
                ></EditButton>
            </div>
        )
    }

    return (
        <table className="table">
            <caption>
                <ControlButton read={read} waiting={waiting}></ControlButton>
            </caption>
            <thead>
                <tr>
                    <td>batch</td>
                    <td>migration / file</td>
                </tr>
            </thead>
            <tbody>
                {migrationzz.length ? null : (
                    <tr>
                        <td colSpan={2} className="text-secondary">
                            no migration
                        </td>
                    </tr>
                )}
                {migrationzz.map((item) => (
                    <tr key={item.migration}>
                        <td>
                            {item.batch === 0 ? null : (
                                <div>
                                    <CheckCircle className="text-success me-3"></CheckCircle>
                                    {item.batch}
                                </div>
                            )}
                        </td>
                        <td>{makeView(item)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
