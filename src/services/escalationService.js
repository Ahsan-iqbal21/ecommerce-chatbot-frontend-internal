import ApiBaseHelper from '../network/apiBaseHelper';
import ApiLinks from '../network/apiLinks';

class EscalationService {
  static async getAllEscalations() {
    const response = await ApiBaseHelper.get(ApiLinks.GET_ALL_ESCALATIONS);
    return response;
  }

  static async changeStatus(escalationId, status) {
    const response = await ApiBaseHelper.patch(ApiLinks.CHANGE_ESCALATION_STATUS(escalationId), { status });
    return response;
  }
}

export default EscalationService;