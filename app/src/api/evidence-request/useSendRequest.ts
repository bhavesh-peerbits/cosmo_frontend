import api from '@api';
import EvidenceRequestDraft, {
	fromEvidenceRequestDraftApi,
	toEvidenceRequestDraftApi
} from '@model/EvidenceRequest/EvidenceRequestDraft';
import { useQueryClient, useMutation } from '@tanstack/react-query';

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
		onSuccess: () => {
			queryClient.invalidateQueries(['all-request-draft']);
			queryClient.removeQueries(['draft']);
			queryClient.invalidateQueries(['all-request']);
		}
	});
};

export default useSendRequest;
