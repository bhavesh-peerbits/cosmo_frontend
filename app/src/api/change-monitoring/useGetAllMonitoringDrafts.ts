import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { toMap } from '@model/util';
import { fromMonitoringApi } from '@model/Monitoring';

const getAllMonitoringDraft = () => {
	return api.analystChangeMonitoringControllerApi
		.getAllMonitoringDraft()
		.then(({ data }) => (data ? [...data.values()].map(fromMonitoringApi) : []))
		.then(toMap);
};

export default () => useQuery(['all-monitoring-drafts'], getAllMonitoringDraft);
