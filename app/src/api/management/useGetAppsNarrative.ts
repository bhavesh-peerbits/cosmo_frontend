import api from '@api';

export default async function useGetAppsNarrative(applicationIds: number[]) {
	return api.generateReportApi.getSomeApplicationReportNarrative(
		{
			requestBody: applicationIds
		},
		{ responseType: 'blob' }
	);
}
