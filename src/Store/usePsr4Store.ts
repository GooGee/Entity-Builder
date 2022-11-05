import create from "zustand"

type Psr4StoreType = {
    psr4: LB.StringMap
    setPsr4(psr4: LB.StringMap): void
}

const usePsr4Store = create<Psr4StoreType>(function (set) {
    return {
        psr4: {
            "App\\": "app/",
            "Database\\Entity\\": "database/Entity/",
            "Database\\Factories\\": "database/factories/",
            "Database\\Seeders\\": "database/seeders/",
            "Tests\\": "tests/",
        },
        setPsr4(psr4: LB.StringMap) {
            psr4["Database\\Entity\\"] = "database/Entity/"
            set({ psr4 })
        },
    }
})

export default usePsr4Store
