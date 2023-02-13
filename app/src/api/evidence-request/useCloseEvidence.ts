import api from '@api';
import { CloseEvidenceApi } from 'cosmo-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CloseEvidenceProps {
	data: CloseEvidenceApi;
	erId: number;
}

const closeEvidence = ({ data, erId }: CloseEvidenceProps) => {
	return api.evidenceRequest.closeEvidence({
		closeEvidenceDto: data,
		erId
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
