import Swal from "sweetalert2"

export default function showConfirm(text: string = "Are you sure?") {
    return Swal.fire({
        cancelButtonColor: "#ccc",
        confirmButtonColor: "#09f",
        icon: "warning",
        showCancelButton: true,
        text,
    })
}
