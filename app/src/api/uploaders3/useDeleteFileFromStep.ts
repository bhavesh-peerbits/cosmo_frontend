import api from '@api';
import { useMutation, useQueryClient } from 'react-query';

interface DeleteFileParams {
	fileId: string;
	stepId: string;
}

const deleteFileFromStep = ({ fileId, stepId }: DeleteFileParams) => {
	return api.EvidenceRequestFileS3Api.deleteFileFormStep({
		fileId: +fileId,
		stepId: +stepId
	});
};

const useDeleteFileFromStep = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteFileFromStep, {
		onSuccess: () => {
			queryClient.invalidateQueries(['evidence-request']);
		}
	});
};

export default useDeleteFileFromStep;
