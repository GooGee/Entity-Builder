import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import { OapiType } from "@/Model/Oapi"

const Version = 31

export default function migrateV031(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.TypeFormat = []

    const header = db.tables.Entity.find((item) => item.name === "Header")
    if (header) {
        header.name = "ParameterInHeader"
    }

    deleteTF(db.tables.Column, db.tables.TypeFormat, "ownerColumnId")
    deleteTF(db.tables.Request, db.tables.TypeFormat, "ownerRequestId")
    deleteTF(db.tables.Response, db.tables.TypeFormat, "ownerResponseId")
    deleteTF(db.tables.Wu, db.tables.TypeFormat, "ownerWuId")

    // @ts-ignore
    delete db.tables["WuChild"]
}

let id = 1

function createTF(tf: TypeFormat) {
    id += 1
    // @ts-ignore
    if (tf.type === "TypeParameter") {
        tf.type = OapiType.WuParameter
    }
    const wuId = tf.type === OapiType.Wu ? tf.targetId : 1
    const wuParameterId = tf.type === OapiType.WuParameter ? tf.targetId : null
    const variableId = tf.type === OapiType.Enum ? tf.targetId : null
    const data = makeTypeFormat(
        tf.type,
        wuId,
        wuParameterId,
        variableId,
    ) as LB.TypeFormat
    data.id = id
    return data
}

function deleteTF(
    itemzz: LB.IdItem[],
    tfzz: LB.TypeFormat[],
    key: keyof LB.TypeFormat,
) {
    itemzz.forEach(function (item) {
        if (hasTF(item)) {
            const tf = createTF(item.tf!)
            tfzz.push(tf)
            // @ts-ignore
            tf[key] = item.id
            item.tf!.argumentzz.forEach(function (item) {
                const child = createTF(item)
                tfzz.push(child)
                child.ownerId = tf.id
                // child.forWuParameterId
            })
            delete item["tf"]
        }
    })
}

function hasTF(item: LB.IdItem): item is Item {
    return "tf" in item
}

interface Item extends LB.IdItem {
    tf?: TypeFormat
}

interface TypeFormat extends LB.TypeFormat {
    argumentzz: TypeFormat[]
    targetId: number
}
