import { makeForeignKeyId, SchemaEnum } from "@/Database/createSchema"
import { makeIntegerColumn } from "@/Database/Factory/makeColumn"
import {
    makeColumnCRUD,
    makeRelationCRUD,
    makeTypeFormatCRUD,
} from "@/Database/makeCRUD"
import RelationType from "@/Database/RelationType"
import { OapiType } from "@/Model/Oapi"
import lodash from "lodash"
import { OmitId } from "../dbhelper"
import makeTypeFormat from "./makeTypeFormat"

export function buildRelation(
    type: RelationType,
    entity0Id: number,
    entity1Id: number,
    name0: string,
    name1: string,
    fk: string,
) {
    return makeColumnCRUD()
        .findChildzz(entity1Id, makeForeignKeyId(SchemaEnum.Entity))
        .then((response) => {
            const found = response.find((item) => item.name === fk)
            if (found) {
                return create(found.id)
            }

            return makeColumnCRUD()
                .create(makeIntegerColumn(entity1Id, fk))
                .then((item) => {
                    const data = makeTypeFormat(OapiType.integer)
                    data.ownerColumnId = item.id
                    return makeTypeFormatCRUD()
                        .create(data)
                        .then(() => create(item.id))
                })
        })

    function create(column1Id: number) {
        return makeRelationCRUD().create(
            makeRelation(type, entity0Id, entity1Id, name0, name1, column1Id),
        )
    }
}

export function connectEntity(
    type: RelationType,
    entity0: LB.Entity,
    entity1: LB.Entity,
) {
    const name0 = makeVariableName(type, entity1)
    const fk = type === RelationType.OneToMany ? makeForeignKeyId(entity0.name) : "id"
    return buildRelation(
        type,
        entity0.id,
        entity1.id,
        name0,
        lodash.lowerFirst(entity0.name),
        fk,
    )
}

export function connectEntityBy(
    type: RelationType,
    entity0: LB.Entity,
    entity1: LB.Entity,
    fki: number,
) {
    const name0 = makeVariableName(type, entity1)
    const name1 = lodash.lowerFirst(entity0.name)
    return makeRelationCRUD().create(
        makeRelation(type, entity0.id, entity1.id, name0, name1, fki),
    )
}

export function makeVariableName(type: RelationType, entity1: LB.Entity) {
    return (
        lodash.lowerFirst(entity1.name) + (type === RelationType.OneToMany ? "zz" : "")
    )
}

export default function makeRelation(
    type: RelationType,
    entity0Id: number,
    entity1Id: number,
    name0: string,
    name1: string,
    column1Id: number,
): OmitId<LB.Relation> {
    return {
        type,
        name0,
        name1,
        entity0Id,
        entity1Id,
        column1Id,
    }
}
