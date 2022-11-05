import useTreeStore from "@/Store/useTreeStore"
import { useState } from "react"
import FileProperty from "./FileProperty"

enum Tab {
    Property = "Property",
}

export default function FileView() {
    const store = useTreeStore()
    const tabzz = Object.keys(Tab) as Tab[]
    const [tab, setTab] = useState(Tab.Property)

    return <FileProperty></FileProperty>

    // if (store.file === undefined) {
    //     return null
    // }

    // function getView() {
    //     if (store.file === undefined) {
    //         return null
    //     }

    //     return <FileProperty></FileProperty>
    // }

    // return (
    //     <div>
    //         <h3>{store.file.name}</h3>
    //         <ul className="nav nav-tabs my-3">
    //             {tabzz.map((item) => (
    //                 <li key={item} onClick={() => setTab(item)} className="nav-item">
    //                     <span className={tab === item ? "nav-link active" : "nav-link"}>
    //                         {item}
    //                     </span>
    //                 </li>
    //             ))}
    //         </ul>

    //         {getView()}
    //     </div>
    // )
}
