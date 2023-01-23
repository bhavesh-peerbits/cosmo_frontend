import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromApplicationApi } from '@model/Application';
import { toMap } from '@model/util';

const useGetAllApplications = () => {
	return api.analystChangeMonitoringControllerApi
		.getAllApplication()
		.then(({ data }) => (data ? [...data.values()].map(fromApplicationApi) : []))
		.then(toMap);
};

export default () => useQuery(['monitoring-apps'], useGetAllApplications);
