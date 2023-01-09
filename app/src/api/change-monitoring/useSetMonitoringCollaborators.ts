import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface SetCollabParameters {
	id: string;
	usersId: string[];
}

const setMonitoringCollaborator = ({ id, usersId }: SetCollabParameters) => {
	return api.analystChangeMonitoringControllerApi.setMonitoringCollaborator({
		monitoringId: +id,
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
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
