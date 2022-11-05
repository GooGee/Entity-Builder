import { ParameterLocation } from "@/Model/Oapi"
import { OmitId } from "../dbhelper"
import makeSideBarItem from "./makeSideBarItem"
import makeTypeFormat from "./makeTypeFormat"

export default function makeParameter(
    location: ParameterLocation,
    name: string,
): OmitId<LB.Parameter> {
    return {
        ...makeSideBarItem(name),
        allowEmptyValue: false,
        allowReserved: false,
        deprecated: false,
        description: "",
        example: "",
        explode: false,
        in: location,
        name,
        name2: location === ParameterLocation.header ? "" : name,
        required: true,
        tf: makeTypeFormat(),
        constraintzz: [],
    }
}
