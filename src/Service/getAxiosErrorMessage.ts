import axios, { AxiosError } from "axios"

function isAxiosError(error: unknown): error is AxiosError<LB.ApiErrorResponse> {
    return axios.isAxiosError(error)
}

export default function getAxiosErrorMessage(error: unknown): string {
    if (typeof error === "string") {
        return error
    }

    if (isAxiosError(error)) {
        if (error.response) {
            if (error.response.data) {
                if (error.response.data.message) {
                    return error.response.data.message
                }
            }
        }
        return error.message
    }

    if (error instanceof Error) {
        return error.message
    }

    if (error instanceof Object) {
        if ("message" in error) {
            return getAxiosErrorMessage(error["message"])
        }
    }

    return JSON.stringify(error)
}
