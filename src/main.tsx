import nunjucks from "nunjucks"
import React from "react"
import ReactDOM from "react-dom"
import ReactModal from "react-modal"
import { HashRouter } from "react-router-dom"
import "sweetalert2/dist/sweetalert2.css"
import App from "./App"

nunjucks.configure({ autoescape: false })
ReactModal.setAppElement("#root")

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>,
    document.getElementById("root")!,
)
