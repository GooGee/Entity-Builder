import validateName, { pattern } from "@/Service/validateName"
import Swal from "sweetalert2"

export default function showNameInput(text: string, inputValue: string) {
    return Swal.fire({
        cancelButtonColor: "#ccc",
        confirmButtonColor: "#09f",
        input: "text",
        inputValue,
        inputValidator(inputValue: string) {
            if (validateName(inputValue)) {
                return null
            }
            return `Invalid name. /${pattern}/`
        },
        showCancelButton: true,
        text,
    })
}
