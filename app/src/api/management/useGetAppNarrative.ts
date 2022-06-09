import api from '@api';

export default async function useGetAppNarrative(appId: string) {
	return api.generateReportApi.getApplicationReportNarrative(
		{
			id: +appId
		},
		{ responseType: 'blob' }
	);
}
