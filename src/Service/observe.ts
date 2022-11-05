import useCollectionItemzzStore from "@/Store/useCollectionItemzzStore"
import useCollectionzzStore from "@/Store/useCollectionzzStore"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useExamplezzStore from "@/Store/useExamplezzStore"
import useFilezzStore from "@/Store/useFilezzStore"
import useIndexzzStore from "@/Store/useIndexzzStore"
import useModuleActionFilezzStore from "@/Store/useModuleActionFilezzStore"
import useModuleActionzzStore from "@/Store/useModuleActionzzStore"
import useModulezzStore from "@/Store/useModulezzStore"
import useParameterzzStore from "@/Store/useParameterzzStore"
import usePathzzStore from "@/Store/usePathzzStore"
import useRelationzzStore from "@/Store/useRelationzzStore"
import useRequestzzStore from "@/Store/useRequestzzStore"
import useResponsezzStore from "@/Store/useResponsezzStore"
import useSchemazzStore from "@/Store/useSchemazzStore"
import useServerzzStore from "@/Store/useServerzzStore"
import useVariablezzStore from "@/Store/useVariablezzStore"
import useWuChildzzStore from "@/Store/useWuChildzzStore"
import useWuColumnzzStore from "@/Store/useWuColumnzzStore"
import useWuParameterzzStore from "@/Store/useWuParameterzzStore"
import useWuzzStore from "@/Store/useWuzzStore"

export default function observe() {
    useCollectionItemzzStore.getState().observe()
    useCollectionzzStore.getState().observe()

    useDirectoryzzStore.getState().observe()
    useFilezzStore.getState().observe()

    useColumnzzStore.getState().observe()
    useIndexzzStore.getState().observe()
    useRelationzzStore.getState().observe()
    useSchemazzStore.getState().observe()

    useExamplezzStore.getState().observe()
    useModulezzStore.getState().observe()
    useModuleActionzzStore.getState().observe()
    useModuleActionFilezzStore.getState().observe()
    useParameterzzStore.getState().observe()
    usePathzzStore.getState().observe()
    useRequestzzStore.getState().observe()
    useResponsezzStore.getState().observe()
    useServerzzStore.getState().observe()
    useVariablezzStore.getState().observe()

    useWuChildzzStore.getState().observe()
    useWuColumnzzStore.getState().observe()
    useWuParameterzzStore.getState().observe()
    useWuzzStore.getState().observe()
}
