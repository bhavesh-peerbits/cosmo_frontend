import api from '@api';
import { useMutation, useQueryClient } from 'react-query';

interface DeleteDraftParams {
	draftId: string;
}

const deleteDraft = ({ draftId }: DeleteDraftParams) => {
	return api.evidenceRequest.deleteDraftById({ draftId: +draftId });
};

const useDeleteDraft = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteDraft, {
		onSuccess: (data, params) => {
			queryClient.invalidateQueries(['all-request-draft']);
			queryClient.removeQueries(['draft', params.draftId]);
		}
	});
};

export default useDeleteDraft;
