import { useQuery } from '@tanstack/react-query';
import api from '@api';
import { fromFrameworkApi } from '@model/EvidenceRequest/Framework';

const getFrameworkByCode = (code: string) => {
	return api.analystChangeMonitoringControllerApi
		.getFrameworkByCode({ frameworkCode: code })
		.then(({ data }) => fromFrameworkApi(data));
};

const useGetFrameworkByCode = (code: string) =>
	useQuery(['framework', code], () => getFrameworkByCode(code as string), {
		enabled: !!code
	});

export default useGetFrameworkByCode;
