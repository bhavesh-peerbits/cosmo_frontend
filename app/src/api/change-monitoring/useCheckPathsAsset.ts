import { useMutation } from '@tanstack/react-query';
import api from '@api';

interface CheckPathAssetParams {
	assetId: string;
	body: string;
}

const checkPathAssetMonitoring = ({ assetId, body }: CheckPathAssetParams) => {
	return api.analystChangeMonitoringControllerApi
		.checkPath({ assetId: +assetId, body })
		.then(({ data }) => data);
};

const useCheckPathAssetMonitoring = () => {
	return useMutation(checkPathAssetMonitoring);
};

export default useCheckPathAssetMonitoring;
