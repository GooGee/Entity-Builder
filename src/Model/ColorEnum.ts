enum ColorEnum {
    white = "#fff",
    red = "#f00",
    pink = "#f0f",
    orange = "#f80",
    yellow = "#ff0",
    green = "#0f0",
    aqua = "#0ff",
    blue = "#00f",
    navy = "#08f",
    violet = "#80f",
}

export default ColorEnum

export const colorzz = Object.values(ColorEnum)

export function getBG(color: string, selected: string) {
    if (color === selected) {
        return color
    }
    return ColorEnum.white
}

export function getBorder(color: string) {
    if (color === ColorEnum.white) {
        return "#333"
    }
    return color
}
