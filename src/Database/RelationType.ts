enum RelationType {
    // ManyToOne = "ManyToOne",
    // ManyToMany = "ManyToMany",
    OneToMany = "OneToMany",
    OneToOne = "OneToOne",
}

export default RelationType

export const RelationTypezz = Object.keys(RelationType) as Array<
    keyof typeof RelationType
>

export const RelationTypeKV: Map<keyof typeof RelationType, string> = new Map()
RelationTypezz.forEach((item) => RelationTypeKV.set(item, item))

export function getRelationMeaning(type: string, reversed = false): string {
    if (reversed) {
        // if (type === RelationType.ManyToMany) {
        //     return getRelationMeaning(type)
        // }
        return "belongs to"
    }

    // if (type === RelationType.ManyToOne) {
    //     return "belongs to"
    // }
    if (type === RelationType.OneToMany) {
        return "has many"
    }
    // if (type === RelationType.ManyToMany) {
    //     return "belongs to many"
    // }
    return "has one"
}

// function getReversed(type: string) {
//     if (type === RelationType.ManyToOne) {
//         return RelationType.OneToMany
//     }
//     if (type === RelationType.OneToMany) {
//         return RelationType.ManyToOne
//     }
//     return type
// }
