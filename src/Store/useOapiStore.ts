import produce from "immer"
import * as oapi from "openapi3-ts"
import create from "zustand"

type OapiStoreType = oapi.OpenAPIObject & {
    setContact(data: oapi.ContactObject): void
    setInfo(info: oapi.InfoObject): void
    setLicense(data: oapi.LicenseObject): void
    setOAPI(data: oapi.OpenAPIObject): void
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
        setOAPI(data: oapi.OpenAPIObject) {
            set(data)
        },
    }
})

export default useOapiStore
