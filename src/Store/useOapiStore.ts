import produce from "immer"
import * as oapi from "openapi3-ts"
import create from "zustand"

type OapiType = oapi.OpenAPIObject & {
    externalDocs: oapi.ExternalDocumentationObject
}

type OapiStoreType = OapiType & {
    setContact(data: oapi.ContactObject): void
    setExternal(data: oapi.ExternalDocumentationObject): void
    setInfo(info: oapi.InfoObject): void
    setLicense(data: oapi.LicenseObject): void
    setOAPI(data: OapiType): void
}

const useOapiStore = create<OapiStoreType>(function (set) {
    const data = {
        ...oapi.OpenApiBuilder.create().getSpec(),
        openapi: "3.0.3",
        info: {
            contact: {
                name: "name",
                url: "",
                email: "",
            },
            description: "",
            license: {
                name: "license",
                url: "",
            },
            termsOfService: "",
            title: "title",
            version: "0.1.0",
        },
        externalDocs: {
            description: "",
            url: "",
        },
    }

    return {
        ...data,

        setContact(data: oapi.ContactObject) {
            set(
                produce(function (item: OapiStoreType) {
                    item.info.contact = data
                }),
            )
        },
        setExternal(data: oapi.ExternalDocumentationObject) {
            set(
                produce(function (item: OapiStoreType) {
                    item.externalDocs = data
                }),
            )
        },
        setInfo(data: oapi.InfoObject) {
            set(
                produce(function (item: OapiStoreType) {
                    item.info = data
                }),
            )
        },
        setLicense(data: oapi.LicenseObject) {
            set(
                produce(function (item: OapiStoreType) {
                    item.info.license = data
                }),
            )
        },
        setOAPI(data: OapiType) {
            set(data)
        },
    }
})

export default useOapiStore
