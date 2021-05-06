import { LOGIN_USER1 } from "../../constants";
const initialstate = {
    user: null,
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
        default:
            return state

    }

}