import { useMutation, useQueryClient } from 'react-query';
import api from '@api';

interface CollabProps {
	id: number;
	userIds: string[];
}

const addCollaboratorToEvidence = ({ id, userIds }: CollabProps) => {
	return api.evidenceRequest.addCollaboratorsToEvidence({
		erId: id,
		requestBody: userIds
	});
};

const useAddCollaboratorsToEvidence = () => {
	const queryClient = useQueryClient();
	return useMutation(addCollaboratorToEvidence, {
		onSuccess: () => {
			queryClient.invalidateQueries(['evidence-request']);
		}
	});
};

export default useAddCollaboratorsToEvidence;
