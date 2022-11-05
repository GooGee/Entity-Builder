import { openLink } from "@/Bridge/sendToJava"
import useAppInfoStore from "@/Store/useAppInfoStore"

interface Property {
    children: string
    className?: string
    href: string
}

export default function WebLink(property: Property) {
    const store = useAppInfoStore()

    if (store.ide) {
        return (
            <span
                className={"btn btn-link " + property.className}
                onClick={() => openLink(property.href)}
            >
                {property.children}
            </span>
        )
    }

    return (
        <a className={property.className} href={property.href} target="_blank">
            {property.children}
        </a>
    )
}
