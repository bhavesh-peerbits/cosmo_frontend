import api from '@api';
import EvidenceRequestDraft, {
	fromEvidenceRequestDraftApi,
	toEvidenceRequestDraftApi
} from '@model/EvidenceRequest/EvidenceRequestDraft';
import { useQueryClient, useMutation } from '@tanstack/react-query';

const saveDraft = (requestDraft: EvidenceRequestDraft) => {
	return api.evidenceRequest
		.saveDraft({
			draftDto: toEvidenceRequestDraftApi(requestDraft)
		})
		.then(({ data }) => fromEvidenceRequestDraftApi(data));
};

const useSaveDraft = () => {
	const queryClient = useQueryClient();
	return useMutation(saveDraft, {
		onSuccess: data => {
			queryClient.invalidateQueries(['all-request-draft']);
			queryClient.invalidateQueries(['draft', data.id]);
		}
	});
};

export default useSaveDraft;
