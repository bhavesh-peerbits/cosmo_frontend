import api from '@api';

interface GetCsvAnswerParams {
	deltaId: number;
	deltaFilesIds: number[];
}
export default async function getCsvAnswer({
	deltaId,
	deltaFilesIds
}: GetCsvAnswerParams) {
	return api.changeMonitoringControllerApi.getCsvAnswer(
		{
			deltaId,
			requestBody: deltaFilesIds
		},
		{ responseType: 'blob' }
	);
}
