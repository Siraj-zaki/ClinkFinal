import { delivery_time } from "../../constants";
const initialstate = {
    delivery: null,
    user_area: null,
    name: "junaid"
}
export default function DeliveryTime(state = initialstate, action) {
    switch (action.type) {
        case delivery_time:
            return {
                ...state,
                delivery: action.payload
            }
            break;
            
        default:
            return state

    }

}
