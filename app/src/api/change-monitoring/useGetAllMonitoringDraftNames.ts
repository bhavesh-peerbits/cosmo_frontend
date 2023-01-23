import api from '@api';
import { useQuery } from '@tanstack/react-query';

const getAllMonitoringDraftName = () => {
	return api.analystChangeMonitoringControllerApi
		.getAllDraftNames()
		.then(({ data }) => [...data.values()]);
};

export default () => useQuery(['draft-monitoring-names'], getAllMonitoringDraftName);
