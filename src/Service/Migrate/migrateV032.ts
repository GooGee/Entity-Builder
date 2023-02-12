import makeTypeFormat from "@/Database/Factory/makeTypeFormat"

const Version = 32

export default function migrateV032(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    const set: Set<number> = new Set()
    let maxId = 1
    db.tables.TypeFormat.forEach((item) => {
        if (item.ownerId) {
            set.add(item.ownerId)
        }
        if (item.id > maxId) {
            maxId = item.id
        }
    })
    const ownerzz = db.tables.TypeFormat.filter((item) => set.has(item.id))
    ownerzz.forEach(function (owner) {
        const wpzz = db.tables.WuParameter.filter((item) => item.wuId === owner.wuId)
        if (wpzz.length === 0) {
            return
        }
        const argzz = db.tables.TypeFormat.filter((item) => item.ownerId === owner.id)
        if (argzz.length < wpzz.length) {
            for (let index = argzz.length; index < wpzz.length; index++) {
                maxId += 1
                const data = makeTypeFormat() as LB.TypeFormat
                data.id = maxId
                argzz.push(data)
            }
        }
        wpzz.forEach(function (wp, index) {
            argzz[index].forWuParameterId = wp.id
        })
    })
}
