import api from '@api';
import FileLink, { fromFileLinkApi, toFileLinkApi } from '@model/FileLink';
import { useQueryClient, useMutation } from '@tanstack/react-query';

interface PutASelectionOfFilesParams {
	fileLinkDtoList: FileLink[];
	draftId: number;
	files: File[];
}

const putASelectionOfFilesOnDraft = ({
	fileLinkDtoList,
	draftId,
	files
}: PutASelectionOfFilesParams) => {
	return api.EvidenceRequestFileS3Api.putASelectionOfFilesOnDraft({
		fileLinkDtoList: { fileLinks: fileLinkDtoList.map(toFileLinkApi) },
		draftId,
		files
	}).then(({ data }) => data.map(fromFileLinkApi));
};

const usePutASelectionOfFilesOnDraft = () => {
	const queryClient = useQueryClient();
	return useMutation(putASelectionOfFilesOnDraft, {
		onSuccess: () => {
			queryClient.invalidateQueries(['evidence-request']);
		}
	});
};

export default usePutASelectionOfFilesOnDraft;
