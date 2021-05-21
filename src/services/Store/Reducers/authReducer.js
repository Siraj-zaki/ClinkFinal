import { LOGIN_USER1 ,ZipCode} from "../../constants";
const initialstate = {
    user: null,
    user_area: null,
    name: "junaid"
}
export default function AuthReducer(state = initialstate, action) {
    switch (action.type) {
        case LOGIN_USER1:
            return {
                ...state,
                user: action.payload
            }
            break;
            case ZipCode:
            return {
                ...state,
                user_area: action.payload
            }
            break;
        default:
            return state

    }

}
