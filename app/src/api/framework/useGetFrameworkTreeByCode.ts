import { useQuery } from '@tanstack/react-query';
import api from '@api';
import { fromFrameworkApi } from '@model/EvidenceRequest/Framework';

const getFrameworkTreeByCode = (code: string) => {
	return api.frameworkTreeApi
		.getFrameworkTreeByCode({ code })
		.then(({ data }) => fromFrameworkApi(data));
};

const useGetFrameworkTreeByCode = (code: string) =>
	useQuery(['framework', code], () => getFrameworkTreeByCode(code as string), {
		enabled: !!code
	});

export default useGetFrameworkTreeByCode;
