interface Property {
    children: React.ReactNode
    className?: string
    disabled?: boolean
    waiting: boolean
    onClick(): void
}

export default function WaitingButton(property: Property) {
    return (
        <button
            disabled={property.waiting || property.disabled}
            className={property.className ?? "btn btn-outline-primary"}
            onClick={property.onClick}
            type="button"
        >
            {property.waiting ? (
                <div
                    className="spinner-border spinner-border-sm text-secondary me-1"
                    role="status"
                ></div>
            ) : null}
            {property.children}
        </button>
    )
}
