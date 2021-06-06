import { areaProduct} from "../../constants";
const initialstate = {
    product: null,
    user_area: null,
    name: "junaid"
}
export default function AreaProduct(state = initialstate, action) {
    switch (action.type) {
        case areaProduct:
            return {
                ...state,
                product: action.payload
            }
            break;
        default:
            return state

    }

}
