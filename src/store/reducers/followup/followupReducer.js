import { CHANGE_FOLLOWUP_STATUS_SUCCESS, FOLLOWUP_ERROR, GET_FOLLOWUPS_SUCCESS } from "../../actionTypes/followup/followupActionTypes";

const initialState = {
    followups: [],
    error: null
};
  
const followupsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FOLLOWUPS_SUCCESS:
            return {
                ...state,
                followups: action.payload,
                error: null
            };
        case CHANGE_FOLLOWUP_STATUS_SUCCESS:
            return {
                ...state,
                followups: state.followups.map(followup =>
                followup.followupId === action.payload.followupId
                    ? { ...followup, status: action.payload.status }
                    : followup
                ),
                error: null
            };              
        case FOLLOWUP_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
  
export default followupsReducer;
