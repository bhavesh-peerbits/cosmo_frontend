import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromApplicationApi } from '@model/Narrative/Application';
import { toMap } from '@model/common/util';

const useGetAllApplications = () => {
	return api.analystChangeMonitoringControllerApi
		.getAllApplication()
		.then(({ data }) => (data ? [...data.values()].map(fromApplicationApi) : []))
		.then(toMap);
};

export default () => useQuery(['monitoring-apps'], useGetAllApplications);
