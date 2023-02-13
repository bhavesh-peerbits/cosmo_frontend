import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromMonitoringApi } from '@model/ChangeMonitoring/Monitoring';

const getAllMonitoring = () => {
	return api.analystChangeMonitoringControllerApi
		.getAllMonitoring1()
		.then(({ data }) => (data ? data.map(fromMonitoringApi) : []));
};

export default () => useQuery(['all-monitoring'], getAllMonitoring);
