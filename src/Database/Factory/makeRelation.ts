import { makeForeignKeyId, SchemaEnum } from "@/Database/createSchema"
import { makeIntegerColumn } from "@/Database/Factory/makeColumn"
import { makeColumnCRUD, makeRelationCRUD } from "@/Database/makeCRUD"
import RelationType from "@/Database/RelationType"
import lodash from "lodash"
import { OmitId } from "../dbhelper"

export function buildRelation(
    type: RelationType,
    schema0Id: number,
    schema1Id: number,
    name0: string,
    name1: string,
    fk: string,
) {
    return makeColumnCRUD()
        .findChildzz(schema1Id, makeForeignKeyId(SchemaEnum.Schema))
        .then((response) => {
            const found = response.find((item) => item.name === fk)
            if (found) {
                return create(found.id)
            }

            return makeColumnCRUD()
                .create(makeIntegerColumn(schema1Id, fk))
                .then((response) => create(response.id))
        })

    function create(column1Id: number) {
        return makeRelationCRUD().create(
            makeRelation(type, schema0Id, schema1Id, name0, name1, column1Id),
        )
    }
}

export function connectSchema(
    type: RelationType,
    schema0: LB.Schema,
    schema1: LB.Schema,
) {
    const name0 = makeVariableName(type, schema1)
    const fk = type === RelationType.OneToMany ? makeForeignKeyId(schema0.name) : "id"
    return buildRelation(
        type,
        schema0.id,
        schema1.id,
        name0,
        lodash.lowerFirst(schema0.name),
        fk,
    )
}

export function connectSchemaBy(
    type: RelationType,
    schema0: LB.Schema,
    schema1: LB.Schema,
    fki: number,
) {
    const name0 = makeVariableName(type, schema1)
    const name1 = lodash.lowerFirst(schema0.name)
    return makeRelationCRUD().create(
        makeRelation(type, schema0.id, schema1.id, name0, name1, fki),
    )
}

export function makeVariableName(type: RelationType, schema1: LB.Schema) {
    return (
        lodash.lowerFirst(schema1.name) + (type === RelationType.OneToMany ? "zz" : "")
    )
}

export default function makeRelation(
    type: RelationType,
    schema0Id: number,
    schema1Id: number,
    name0: string,
    name1: string,
    column1Id: number,
): OmitId<LB.Relation> {
    return {
        type,
        name0,
        name1,
        schema0Id,
        schema1Id,
        column1Id,
    }
}
