import api from '@api';
import FileLink, { fromFileLinkApi, toFileLinkApi } from '@model/common/FileLink';
import { useQueryClient, useMutation } from '@tanstack/react-query';

interface PutASelectionOfFilesParams {
	fileLinkDtoList: FileLink[];
	stepId: number;
	files: File[];
}

const putASelectionOfFiles = ({
	fileLinkDtoList,
	stepId,
	files
}: PutASelectionOfFilesParams) => {
	return api.EvidenceRequestFileS3Api.putASelectionOfFilesOnStep({
		fileLinkDtoList: { fileLinks: fileLinkDtoList.map(toFileLinkApi) },
		stepId,
		files
	}).then(({ data }) => data.map(fromFileLinkApi));
};

const usePutASelectionOfFiles = () => {
	const queryClient = useQueryClient();
	return useMutation(putASelectionOfFiles, {
		onSuccess: () => {
			queryClient.invalidateQueries(['evidence-request']);
		}
	});
};

export default usePutASelectionOfFiles;
