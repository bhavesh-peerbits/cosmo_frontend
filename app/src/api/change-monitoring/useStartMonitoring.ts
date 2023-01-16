import { useMutation } from '@tanstack/react-query';
import api from '@api';
import MonitoringDraft, { toMonitoringDraftApi } from '@model/MonitoringDraft';

interface StartMonitoringParams {
	draft: MonitoringDraft;
}

const startMonitoring = ({ draft }: StartMonitoringParams) => {
	return api.analystChangeMonitoringControllerApi
		.startMonitoring({ monitoringDraftDto: toMonitoringDraftApi(draft) })
		.then(({ data }) => data);
};

const useStartMonitoring = () => {
	return useMutation(startMonitoring);
};

export default useStartMonitoring;
