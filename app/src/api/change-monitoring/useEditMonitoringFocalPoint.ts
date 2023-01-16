import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface SaveMonitoringDraftParameters {
	focalPoint: string;
	delegates: string[];
	monitoringId: number;
}

const editMonitoringFocalPoint = ({
	focalPoint,
	delegates,
	monitoringId
}: SaveMonitoringDraftParameters) => {
	return api.analystChangeMonitoringControllerApi.editMonitoringFocalpointAndDelegates({
		focalPointAndDelegatesDto: { delegates, focalPoint },
		monitoringId
	});
};

const useEditMonitoringFocalPoint = () => {
	const queryClient = useQueryClient();
	return useMutation(editMonitoringFocalPoint, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['monitoring', `${variables.monitoringId}`]);
		}
	});
};

export default useEditMonitoringFocalPoint;
