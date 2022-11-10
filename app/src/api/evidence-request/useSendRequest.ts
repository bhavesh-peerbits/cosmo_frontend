import api from '@api';
import EvidenceRequestDraft, {
	fromEvidenceRequestDraftApi,
	toEvidenceRequestDraftApi
} from '@model/EvidenceRequestDraft';
import { useQueryClient, useMutation } from 'react-query';

const sendRequest = (requestDraft: EvidenceRequestDraft) => {
	return api.evidenceRequest
		.saveCompletedDraft({
			draftDto: toEvidenceRequestDraftApi(requestDraft)
		})
		.then(({ data }) => fromEvidenceRequestDraftApi(data));
};

const useSendRequest = () => {
	const queryClient = useQueryClient();
	return useMutation(sendRequest, {
		onSuccess: data => {
			queryClient.invalidateQueries(['all-request-draft']);
			queryClient.removeQueries(['draft', data.id]);
			queryClient.invalidateQueries(['all-request']);
		}
	});
};

export default useSendRequest;
