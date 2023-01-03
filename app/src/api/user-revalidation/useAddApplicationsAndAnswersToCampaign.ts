import api from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fromFileAnswersStatusApi } from '@model/FileAnswerStatus';
import Application from '@model/Application';

interface AddAnswersToCampaignProps {
	campaignId: string;
	application: Application;
	file: File;
}

const addAnswersToCampaign = ({
	campaignId,
	file,
	application
}: AddAnswersToCampaignProps) => {
	return api.analystCampaignApi
		.addApplicationsAndAnswersToCampaign({
			campaignId: +campaignId,
			file,
			applicationId: +application.id
		})
		.then(({ data }) => fromFileAnswersStatusApi(data.response || {}));
};

export default () => {
	const queryClient = useQueryClient();
	return useMutation(addAnswersToCampaign, {
		onSuccess: (data, variables) => {
			if (data.answers.length !== 0) {
				queryClient.invalidateQueries([
					'campaigns',
					variables.campaignId,
					'applications'
				]);
				queryClient.invalidateQueries(['answers-review', variables.campaignId]);
				queryClient.invalidateQueries(['campaigns-review']);
				queryClient.invalidateQueries([
					'answers-revalidation-review',
					variables.campaignId
				]);
			}
		}
	});
};
