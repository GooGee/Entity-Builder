import Swal from "sweetalert2"

export default function showSelect(
    text: string,
    inputValue: string,
    inputOptions: Map<string, string>,
    allowEmpty = false,
    inputValidator?: (inputValue: string) => string | null,
) {
    if (allowEmpty) {
        inputOptions.set("", "----")
    }
    return Swal.fire({
        cancelButtonColor: "#ccc",
        confirmButtonColor: "#09f",
        input: "select",
        inputOptions,
        inputValue,
        inputValidator,
        showCancelButton: true,
        text,
    })
}
