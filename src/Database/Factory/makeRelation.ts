import { makeForeignKeyId, SchemaEnum } from "@/Database/createSchema"
import {
    makeColumnCRUD,
    makeRelationCRUD,
    makeTypeFormatCRUD,
} from "@/Database/makeCRUD"
import RelationType from "@/Database/RelationType"
import createColumnTypeFormat from "@/Factory/createColumnTypeFormat"
import { OapiType } from "@/Model/Oapi"
import { OmitId } from "../dbhelper"
import Constant from "@/Model/Constant"
import CaseEnum from "@/Model/CaseEnum"

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

            return createColumnTypeFormat(entity1Id, fk, OapiType.integer).then(
                (column) => create(column.id),
            )
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
    const fk = type === RelationType.OneToMany ? makeForeignKeyId(entity0.name, CaseEnum.CosineCase) : Constant.Id
    return buildRelation(
        type,
        entity0.id,
        entity1.id,
        name0,
        (entity0.name),
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
    const name1 = (entity0.name)
    return makeRelationCRUD().create(
        makeRelation(type, entity0.id, entity1.id, name0, name1, fki),
    )
}

export function makeVariableName(type: RelationType, entity1: LB.Entity) {
    return (
        (entity1.name) + (type === RelationType.OneToMany ? Constant.Zz : "")
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
        addToModel: false,
    }
}
