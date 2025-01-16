import { CHANGE_ESCALATION_STATUS_SUCCESS, ESCALATION_ERROR, GET_ESCALATIONS_SUCCESS } from "../../actionTypes/escalation/escalationActionTypes";

const initialState = {
    escalations: [],
    error: null
};
  
const escalationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ESCALATIONS_SUCCESS:
            return {
                ...state,
                escalations: action.payload,
                error: null
            };
        case CHANGE_ESCALATION_STATUS_SUCCESS:
            return {
                ...state,
                escalations: state.escalations.map(escalation =>
                escalation.escalationId === action.payload.escalationId
                    ? { ...escalation, status: action.payload.status }
                    : escalation
                ),
                error: null
            };
        case ESCALATION_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
  
export default escalationsReducer;
