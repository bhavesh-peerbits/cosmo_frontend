import api from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteDraftParams {
	draftId: string;
}

const deleteMonitoringDraft = ({ draftId }: DeleteDraftParams) => {
	return api.analystChangeMonitoringControllerApi.deleteDraft({ draftId: +draftId });
};

const useDeleteMonitoringDraft = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteMonitoringDraft, {
		onSuccess: (data, params) => {
			queryClient.invalidateQueries(['all-monitoring-drafts']);
			queryClient.removeQueries(['monitoring-draft', params.draftId]);
			queryClient.invalidateQueries(['draft-monitoring-names']);
		}
	});
};

export default useDeleteMonitoringDraft;
