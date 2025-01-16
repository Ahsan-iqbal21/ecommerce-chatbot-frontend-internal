import FollowupService from "../../../services/followupService";
import { CHANGE_FOLLOWUP_STATUS_SUCCESS, FOLLOWUP_ERROR, GET_FOLLOWUPS_SUCCESS } from "../../actionTypes/followup/followupActionTypes";

export const getFollowups = () => async (dispatch) => {
    try {
        const response = await FollowupService.getAllFollowups();
        dispatch({ type: GET_FOLLOWUPS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FOLLOWUP_ERROR, payload: error.response.data.message });
        throw error;
    }
};

export const changeStatus = (followupId, status) => async (dispatch) => {
    try {
        await FollowupService.changeStatus(followupId, status);
        dispatch({ type: CHANGE_FOLLOWUP_STATUS_SUCCESS, payload: { followupId, status } });
    } catch (error) {
        dispatch({ type: FOLLOWUP_ERROR, payload: error.response.data.message });
        throw error;
    }
};