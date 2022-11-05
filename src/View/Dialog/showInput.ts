import Swal from "sweetalert2"

export default function showInput(
    text: string,
    inputValue: string | number,
    isNumber = false,
    inputValidator?: (inputValue: string) => string | null,
) {
    return Swal.fire({
        cancelButtonColor: "#ccc",
        confirmButtonColor: "#09f",
        input: isNumber ? "number" : "text",
        inputValue,
        inputValidator,
        showCancelButton: true,
        text,
    })
}
