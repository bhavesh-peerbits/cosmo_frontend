import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import Answer from '@model/UserRevalidation/Answer';

export function deleteAnswerById({
	answerId,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	campaignId
}: {
	answerId: string;
	campaignId: string;
}) {
	return api.analystCampaignApi.deleteAnswerById({ answerId: +answerId });
}

export default () => {
	const queryClient = useQueryClient();
	return useMutation(deleteAnswerById, {
		onSuccess: (data, variables) => {
			queryClient.setQueriesData(
				{
					predicate: ({ queryKey }) =>
						queryKey.length === 3 &&
						queryKey[0] === 'answers-review' &&
						queryKey[1] === variables.campaignId
				},
				old => {
					(old as Map<string, Answer>).delete(variables.answerId);
					return new Map(old as Map<string, Answer>);
				}
			);
		}
	});
};
