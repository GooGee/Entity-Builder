import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import menuzz, { PageEnum } from "./menuzz"
import useAppInfoStore from "./Store/useAppInfoStore"
import CollectionPage from "./View/CollectionPage"
import DiagramPage from "./View/DiagramPage"
import DoctrinePage from "./View/DoctrinePage"
import EntityPage from "./View/EntityPage"
import ExamplePage from "./View/ExamplePage"
import FlowPage from "./View/FlowPage"
import HomePage from "./View/HomePage"
import InfoPage from "./View/InfoPage"
import MigrationPage from "./View/MigrationPage"
import OapiPage from "./View/OapiPage"
import ParameterPage from "./View/ParameterPage"
import Bar from "./View/Part/Bar"
import ToastGroup from "./View/Part/ToastGroup"
import RequestPage from "./View/RequestPage"
import ResponsePage from "./View/ResponsePage"
import ServerPage from "./View/ServerPage"
import ToastPage from "./View/ToastPage"
import TreePage from "./View/TreePage"
import VariablePage from "./View/VariablePage"
import WuPage from "./View/WuPage"
import showNote from "./View/Dialog/showNote"
import ListModal from "./View/Modal/ListModal"

function App() {
    const store = useAppInfoStore()

    useEffect(() => {
        const sp = new URLSearchParams(window.location.search)
        const ide = sp.get("ide")
        if (ide) {
            store.setIde(ide)
        }
    }, [])

    function getPage(name: PageEnum) {
        switch (name) {
            case PageEnum.Collection:
                return <CollectionPage></CollectionPage>
            case PageEnum.Doctrine:
                return <DoctrinePage></DoctrinePage>
            case PageEnum.Diagram:
                return <DiagramPage></DiagramPage>
            case PageEnum.Entity:
                return <EntityPage></EntityPage>
            case PageEnum.Example:
                return <ExamplePage></ExamplePage>
            case PageEnum.Flow:
                return <FlowPage></FlowPage>
            case PageEnum.Info:
                return <InfoPage></InfoPage>
            case PageEnum.Migration:
                return <MigrationPage></MigrationPage>
            case PageEnum.OpenApi:
                return <OapiPage></OapiPage>
            case PageEnum.ParameterInHeader:
            case PageEnum.ParameterInCookie:
            case PageEnum.ParameterInPath:
            case PageEnum.ParameterInQuery:
                return <ParameterPage page={name}></ParameterPage>
            case PageEnum.Request:
                return <RequestPage></RequestPage>
            case PageEnum.Response:
                return <ResponsePage></ResponsePage>
            case PageEnum.Server:
                return <ServerPage></ServerPage>
            case PageEnum.Enum:
                return <VariablePage></VariablePage>
            case PageEnum.Tree:
                return <TreePage></TreePage>
            case PageEnum.Wu:
                return <WuPage></WuPage>
            case PageEnum.Toast:
                return <ToastPage></ToastPage>
        }
        return <HomePage></HomePage>
    }

    return (
        <>
            <Bar></Bar>
            <div className="container-fluid">
                <Routes>
                    {menuzz
                        .filter((item) => item.visible)
                        .map((item) => (
                            <Route key={item.path} path={item.path} element={getPage(item.name)} />
                        ))}
                </Routes>

                <ToastGroup></ToastGroup>
            </div>

            <ListModal></ListModal>

            <div className="position-fixed bottom-0 end-0 bg-white m-3" style={{ zIndex: 1222 }}>
                <button className="btn btn-outline-primary" onClick={showNote}>
                    note
                </button>
            </div>
        </>
    )
}

export default App
