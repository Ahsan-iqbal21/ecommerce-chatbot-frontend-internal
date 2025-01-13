import EscalationService from "../../../services/escalationService";
import { CHANGE_ESCALATION_STATUS_SUCCESS, ESCALATION_ERROR, GET_ESCALATIONS_SUCCESS } from "../../actionTypes/escalation/escalationActionTypes";

export const getEscalations = () => async (dispatch) => {
    try {
        const response = await EscalationService.getAllEscalations();
        dispatch({ type: GET_ESCALATIONS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ESCALATION_ERROR, payload: error.response.data.message });
        throw error;
    }
};

export const changeStatus = (escalationId, status) => async (dispatch) => {
    try {
        await EscalationService.changeStatus(escalationId, status);
        dispatch({ type: CHANGE_ESCALATION_STATUS_SUCCESS, payload: { escalationId, status } });
    } catch (error) {
        dispatch({ type: ESCALATION_ERROR, payload: error.response.data.message });
        throw error;
    }
};