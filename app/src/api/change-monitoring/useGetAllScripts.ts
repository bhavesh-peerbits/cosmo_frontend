import api from '@api';
import { useQuery } from '@tanstack/react-query';

const useGetAppIntances = (draftId: string) => {
	return api.analystChangeMonitoringControllerApi
		.getScriptByDraft({ draftId: +draftId })
		.then(({ data }) => data);
};

export default (draftId: string) =>
	useQuery(['scripts', draftId], () => useGetAppIntances(draftId));
