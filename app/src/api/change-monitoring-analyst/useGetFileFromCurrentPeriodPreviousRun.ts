import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromRunFileLinkApi } from '@model/RunFileLink';

interface GetFileFromCurrentPeriodPreviousRunParameter {
	runId: string;
	monitoringId: string;
	assetId: string;
}
const useGetFileFromCurrentPeriodPreviousRun = ({
	runId,
	monitoringId,
	assetId
}: GetFileFromCurrentPeriodPreviousRunParameter) => {
	return api.analystChangeMonitoringControllerApi
		.getFileFromCurrentPreviousRun({
			runId: +runId,
			monitoringId: +monitoringId,
			assetId: +assetId
		})
		.then(({ data }) => (data ? [...data.values()].map(fromRunFileLinkApi) : []));
};

export default (runId: string, monitoringId: string, assetId: string) =>
	useQuery(['previous-file', assetId, monitoringId, runId], () =>
		useGetFileFromCurrentPeriodPreviousRun({ monitoringId, runId, assetId })
	);
