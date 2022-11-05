import { connect } from "@/api"
import { exportDB } from "@/Database/getDBC"
import Constant from "@/Model/Constant"
import getAxiosErrorMessage from "@/Service/getAxiosErrorMessage"
import start, { startDemo } from "@/Service/start"
import useAppInfoStore from "@/Store/useAppInfoStore"
import { useState } from "react"
import WaitingButton from "./Button/WaitingButton"
import WebLink from "./Button/WebLink"

function HomePage() {
    const [error, setError] = useState("")
    const [waiting, setWaiting] = useState(false)
    const store = useAppInfoStore()

    function doConnect() {
        if (waiting) {
            return
        }
        setWaiting(true)
        setError("")
        connect()
            .then((response) => start(response.data.data))
            .then(() => {
                setWaiting(false)
                store.setConnected()
            })
            .catch((error) => {
                console.log(error)
                store.setConnected(false)
                setError(getAxiosErrorMessage(error))
                setWaiting(false)
            })
    }

    function runDemo() {
        startDemo().then(() => {
            setWaiting(false)
            store.setConnected(true, true)
            setError("")
        })
    }

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-6 text-center">
                <h1 className="text-secondary">{Constant.Name}</h1>
                <p>{APP_VERSION}</p>
                {store.connected ? null : (
                    <p>
                        {waiting ? (
                            <span className="spinner-border text-primary"></span>
                        ) : (
                            <>
                                <span>{location.origin}</span>
                                <br />
                                <br />
                                <WaitingButton onClick={doConnect} waiting={waiting}>
                                    connect
                                </WaitingButton>
                                {store.ide ? null : (
                                    <WaitingButton
                                        className="btn btn-outline-primary ms-3"
                                        onClick={runDemo}
                                        waiting={waiting}
                                    >
                                        demo
                                    </WaitingButton>
                                )}
                            </>
                        )}
                    </p>
                )}
                {import.meta.env.DEV && store.connected ? (
                    <p>
                        <button
                            onClick={() =>
                                exportDB().then((response) =>
                                    console.log(JSON.stringify(response)),
                                )
                            }
                            className="btn btn-outline-primary"
                            type="button"
                        >
                            export
                        </button>
                    </p>
                ) : null}
                {store.connected ? (
                    <p className="text-success">connected to {location.origin}</p>
                ) : null}
                {error ? (
                    <>
                        <p className="text-danger">{error}</p>
                        <p>
                            make sure server {location.origin} is running,
                            <br />
                            and PHP package {Constant.PackageName} is installed.
                        </p>
                    </>
                ) : null}
                <WebLink href="https://googee.github.io/laravel-builder">help</WebLink>
            </div>
        </div>
    )
}

export default HomePage
