import { useState } from "react"
import WebLink from "./Button/WebLink"
import ContactDetail from "./Oapi/ContactDetail"
import InfoDetail from "./Oapi/InfoDetail"
import LicenseDetail from "./Oapi/LicenseDetail"
import TabList from "./Part/TabList"
import ExternalDetail from "./Oapi/ExternalDetail"

enum Tab {
    contact = "contact",
    external = "external",
    info = "info",
    license = "license",
}

export default function InfoPage() {
    const tabzz = Object.keys(Tab)

    const [tab, setTab] = useState(Tab.info as string)

    function makeView() {
        if (tab === Tab.contact) {
            return <ContactDetail></ContactDetail>
        }

        if (tab === Tab.external) {
            return <ExternalDetail></ExternalDetail>
        }

        if (tab === Tab.info) {
            return <InfoDetail></InfoDetail>
        }

        if (tab === Tab.license) {
            return <LicenseDetail></LicenseDetail>
        }
    }

    return (
        <div className="row">
            <div className="col offset-3">
                <div>
                    <h1 className="inline">OpenApi 3.0</h1>

                    <WebLink
                        className="ms-3"
                        href="https://spec.openapis.org/oas/v3.0.3#info-object"
                    >
                        doc
                    </WebLink>
                </div>

                <TabList tab={tab} tabzz={tabzz} setTab={setTab}></TabList>

                {makeView()}
            </div>
        </div>
    )
}
