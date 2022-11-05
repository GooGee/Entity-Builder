import ColorEnum from "@/Model/ColorEnum"
import { OmitId } from "../dbhelper"

export default function makeSideBarItem(
    name: string,
    data: Record<string, any> = {},
): OmitId<LB.SideBarItem> {
    return {
        color: ColorEnum.white,
        description: "",
        name,
        reserved: false,
        ...data,
    }
}
