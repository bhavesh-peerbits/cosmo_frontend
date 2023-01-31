import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import Script from '@model/Script';

interface SaveDraftScriptParameters {
	monitoringId: string;
	script?: Script;
}

const saveDraftScript = ({ monitoringId, script }: SaveDraftScriptParameters) => {
	return api.analystChangeMonitoringControllerApi.saveDraftScript({
		monitoringId: +monitoringId,
		saveDraftScriptDto: {
			script
		}
	});
};

const useSaveDraftScript = () => {
	const queryClient = useQueryClient();
	return useMutation(saveDraftScript, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['monitoring-draft', `${variables.monitoringId}`]);
		}
	});
};

export default useSaveDraftScript;
