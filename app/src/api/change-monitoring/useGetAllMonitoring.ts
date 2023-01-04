import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { toMap } from '@model/util';
import { fromMonitoringApi } from '@model/Monitoring';

const getAllMonitoring = () => {
	return api.analystChangeMonitoringControllerApi
		.getAllMonitoring()
		.then(({ data }) => (data ? Array.from(data).map(fromMonitoringApi) : []))
		.then(toMap);
};

export default () => useQuery(['all-monitoring'], getAllMonitoring);
