export default function makeNumberInputHandler<T>(
    key: keyof T,
    state: T,
    setState: (state: T) => void,
    value = 0,
) {
    return function (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        let number = parseFloat(event.target.value)
        if (isNaN(number)) {
            number = value
        }
        setState({
            ...state,
            [key]: number,
        })
    }
}
