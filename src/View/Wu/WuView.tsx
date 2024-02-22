import useWuPageStore from "@/Store/useWuPageStore"
import TabList from "../Part/TabList"
import MapDetail from "./MapDetail"
import WuChildList from "./WuChildList"
import WuColumnList from "./WuColumnList"
import WuParameterList from "./WuParameterList"

export default function WuView() {
    const sWuPageStore = useWuPageStore()

    if (sWuPageStore.item === undefined) {
        return null
    }

    const tabzz = ["Column", "Composition", "Map", "WuParameter"]

    return (
        <>
            <TabList tab={sWuPageStore.tab} tabzz={tabzz} setTab={sWuPageStore.setTab}></TabList>

            {sWuPageStore.tab === tabzz[0] ? <WuColumnList item={sWuPageStore.item}></WuColumnList> : null}

            {sWuPageStore.tab === tabzz[1] ? <WuChildList item={sWuPageStore.item}></WuChildList> : null}

            {sWuPageStore.tab === tabzz[2] ? <MapDetail item={sWuPageStore.item}></MapDetail> : null}

            {sWuPageStore.tab === tabzz[3] ? <WuParameterList item={sWuPageStore.item}></WuParameterList> : null}
        </>
    )
}
