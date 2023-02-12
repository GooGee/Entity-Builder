import getDBC from "./getDBC"

export default function importDB(data: LB.DBData) {
    return getDBC().then((dbc) => dbc.import(data))
}
