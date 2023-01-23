import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromMonitoringApi } from '@model/Monitoring';

const getAllMonitoring = () => {
	return api.focalPointChangeMonitoringControllerApi
		.getAllMonitoring()
		.then(({ data }) => (data ? data.map(fromMonitoringApi) : []));
};

export default () => useQuery(['all-monitoring-inbox'], getAllMonitoring);
