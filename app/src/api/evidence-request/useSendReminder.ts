import { useMutation } from '@tanstack/react-query';
import api from '@api';
import EvidenceRequest, {
	toEvidenceRequestApi
} from '@model/EvidenceRequest/EvidenceRequest';

interface SendReminderParams {
	evidenceRequest: EvidenceRequest;
}

const sendReminder = ({ evidenceRequest }: SendReminderParams) => {
	return api.evidenceRequest.sendReminder({
		evidenceRequestDto: toEvidenceRequestApi(evidenceRequest)
	});
};

const useSendReminder = () => {
	return useMutation(sendReminder);
};

export default useSendReminder;
