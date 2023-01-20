import { useMutation } from '@tanstack/react-query';
import api from '@api';

interface SendRevReminderParams {
	ids: string[];
}

const sendRevReminder = ({ ids }: SendRevReminderParams) => {
	return api.analystCampaignApi.sendReminder1({
		requestBody: ids
	});
};

const useSendRevReminder = () => {
	return useMutation(sendRevReminder);
};

export default useSendRevReminder;
