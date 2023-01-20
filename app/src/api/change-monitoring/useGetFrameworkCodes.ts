import api from '@api';
import { useQuery } from '@tanstack/react-query';

const useGetFrameworkCodes = () => {
	return api.analystChangeMonitoringControllerApi
		.getFrameworkCodes()
		.then(({ data }) => [...data.values()]);
};

export default () => useQuery(['framework-codes'], useGetFrameworkCodes);
