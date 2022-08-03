import api from '@api';

export default async function useGetAppNarrative(appId: string) {
	return api.generateReportApi.getApplicationReportNarrative(
		{
			appId: +appId
		},
		{ responseType: 'blob' }
	);
}
