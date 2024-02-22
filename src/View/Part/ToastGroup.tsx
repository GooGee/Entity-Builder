import useToastzzStore from "@/Store/useToastzzStore"

function ToastGroup() {
    const store = useToastzzStore()
    return (
        <div className="toast-container position-fixed bottom-0 mb-3 pb-3 end-0 me-3">
            {store.list.map((item) => (
                <div key={item.id} className={item.color + " toast show align-items-center"}>
                    <div className="d-flex">
                        <div className="toast-body">{item.text}</div>
                        <button
                            onClick={() => store.dismiss(item.id)}
                            className="btn-close me-2 m-auto"
                            type="button"
                        ></button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ToastGroup
