import ApiBaseHelper from '../network/apiBaseHelper';
import ApiLinks from '../network/apiLinks';

class FollowupService {
  static async getAllFollowups() {
    const response = await ApiBaseHelper.get(ApiLinks.GET_ALL_FOLLOWUPS);
    return response;
  }

  static async changeStatus(followupId, status) {
    console.log("followupId", followupId);
    console.log("status", status);
    const response = await ApiBaseHelper.patch(ApiLinks.CHANGE_FOLLOWUP_STATUS(followupId), { status });
    return response;
  }
}

export default FollowupService;
