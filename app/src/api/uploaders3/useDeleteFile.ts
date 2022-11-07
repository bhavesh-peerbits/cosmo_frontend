import api from '@api';
import { useMutation, useQueryClient } from 'react-query';

interface DeleteFileParams {
	fileId: string;
}

const deleteFile = ({ fileId }: DeleteFileParams) => {
	return api.EvidenceRequestFileS3Api.deleteFile({ fileId: +fileId });
};

const useDeleteFile = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteFile, {
		onSuccess: () => {
			queryClient.invalidateQueries(['evidence-request']);
		}
	});
};

export default useDeleteFile;
