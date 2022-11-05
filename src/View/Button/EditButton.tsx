import { editFile } from "@/Bridge/sendToJava"
import useToastzzStore from "@/Store/useToastzzStore"

interface Property {
    content: string
    file: string
    text?: string
}

export default function EditButton(property: Property) {
    const sToastzzStore = useToastzzStore()

    return (
        <button
            onClick={() => {
                try {
                    editFile(property.file, property.content)
                } catch (error) {
                    sToastzzStore.showError(error)
                }
            }}
            className="btn btn-outline-success"
        >
            {property.text ?? "edit"}
        </button>
    )
}
