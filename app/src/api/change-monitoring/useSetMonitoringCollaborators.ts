import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface SetCollabParameters {
	id: string;
	usersId: string[];
}

const setMonitoringCollaborator = ({ id, usersId }: SetCollabParameters) => {
	return api.analystChangeMonitoringControllerApi.setMonitoringCollaborator({
		monitoringId: +id,
		requestBody: usersId
	});
};

const useSetMonitoringCollaborator = () => {
	const queryClient = useQueryClient();
	return useMutation(setMonitoringCollaborator, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['monitoring-draft', `${variables.id}`]);
		}
	});
};

export default useSetMonitoringCollaborator;
