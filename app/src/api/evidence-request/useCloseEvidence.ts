import api from '@api';
import { CloseEvidenceApi } from 'cosmo-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const closeEvidence = ({ data }: { data: CloseEvidenceApi }) => {
	return api.evidenceRequest.closeEvidence({
		closeEvidenceDto: data,
		erId: +(data.id ?? 0)
	});
};

const useCloseEvidence = () => {
	const queryClient = useQueryClient();
	return useMutation(closeEvidence, {
		onSuccess: () => {
			queryClient.invalidateQueries(['evidence-request']);
		}
	});
};

export default useCloseEvidence;
