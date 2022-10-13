import api from '@api';
import EvidenceRequestDraft, {
	fromEvidenceRequestDraftApi,
	toEvidenceRequestDraftApi
} from '@model/EvidenceRequestDraft';
import { useQueryClient, useMutation } from 'react-query';

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
		onSuccess: () => {
			queryClient.invalidateQueries(['all-request-draft']);
		}
	});
};

export default useSaveDraft;
