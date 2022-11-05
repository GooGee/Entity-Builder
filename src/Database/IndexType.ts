enum IndexType {
    index = "index",
    unique = "unique",
}

export default IndexType

export const IndexTypezz = Object.keys(IndexType) as Array<keyof typeof IndexType>
