import axios, { AxiosError } from "axios"

function isAxiosError(error: unknown): error is AxiosError<LB.ApiErrorResponse> {
    return axios.isAxiosError(error)
}

export default function getAxiosErrorMessage(error: unknown) {
    if (isAxiosError(error)) {
        if (error.response) {
            if (error.response.data) {
                if (error.response.data.message) {
                    return error.response.data.message
                }
                if (error.response.data.detail) {
                    return error.response.data.detail
                }
            }
        }
        return error.message
    }

    if (error instanceof Error) {
        return error.message
    }

    if (typeof error === "string") {
        return error
    }

    if (error instanceof Object) {
        if ("message" in error) {
            return error["message"]
        }
    }

    return JSON.stringify(error)
}
