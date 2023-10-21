import useSettingStore from "@/Store/useSettingStore"
import useToastzzStore from "@/Store/useToastzzStore"
import Swal from "sweetalert2"

export default function showNote() {
    return Swal.fire({
        allowEscapeKey: false,
        allowOutsideClick: false,
        cancelButtonColor: "#ccc",
        confirmButtonColor: "#09f",
        input: "textarea",
        inputValue: useSettingStore.getState().note,
        showCancelButton: true,
        text: "note",
        width: "88%",
    })
        .then(function (result) {
            if (result.isConfirmed) {
                useSettingStore.setState({ note: result.value })
            }
        })
        .catch(useToastzzStore.getState().showError)
}
