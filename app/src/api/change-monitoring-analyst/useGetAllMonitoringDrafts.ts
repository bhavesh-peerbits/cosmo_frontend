import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { toMap } from '@model/util';
import { fromMonitoringDraftApi } from '@model/ChangeMonitoring/MonitoringDraft';

const getAllMonitoringDraft = () => {
	return api.analystChangeMonitoringControllerApi
		.getAllMonitoringDraft()
		.then(({ data }) => (data ? [...data.values()].map(fromMonitoringDraftApi) : []))
		.then(toMap);
};

export default () => useQuery(['all-monitoring-drafts'], getAllMonitoringDraft);
