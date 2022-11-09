import api from '@api';

export default async function useGetFile(fileId: string) {
	return api.EvidenceRequestFileS3Api.getFile(
		{
			fileId: +fileId
		},
		{ responseType: 'blob' }
	);
}
