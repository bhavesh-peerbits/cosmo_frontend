import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromMonitoringApi } from '@model/ChangeMonitoring/Monitoring';

const getAllMonitoringInbox = () => {
	return api.focalPointChangeMonitoringControllerApi
		.getAllMonitoring()
		.then(({ data }) => (data ? data.map(fromMonitoringApi) : []));
};

export default () => useQuery(['all-monitoring-inbox'], getAllMonitoringInbox);
