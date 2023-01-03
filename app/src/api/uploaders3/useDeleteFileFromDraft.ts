import api from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteFileParams {
	fileId: string;
	draftId: string;
}

const deleteFileFromDraft = ({ fileId, draftId }: DeleteFileParams) => {
	return api.EvidenceRequestFileS3Api.deleteFileFromDraft({
		fileId: +fileId,
		draftId: +draftId
	});
};

const useDeleteFileFromDraft = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteFileFromDraft, {
		onSuccess: () => {
			queryClient.invalidateQueries(['evidence-request']);
		}
	});
};

export default useDeleteFileFromDraft;
