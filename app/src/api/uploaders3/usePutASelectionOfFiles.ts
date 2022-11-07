import api from '@api';
import FileLink, { fromFileLinkApi, toFileLinkApi } from '@model/FileLink';
import { useQueryClient, useMutation } from 'react-query';

interface PutASelectionOfFilesParams {
	fileLinkDtoList: FileLink[];
	stepId: number;
}

const putASelectionOfFiles = ({
	fileLinkDtoList,
	stepId
}: PutASelectionOfFilesParams) => {
	return api.EvidenceRequestFileS3Api.putASelectionOfFiles({
		fileLinkDtoList: { fileLinks: fileLinkDtoList.map(toFileLinkApi) },
		stepId
	}).then(({ data }) => data.fileLinks.map(fromFileLinkApi));
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
