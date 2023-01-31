import { useMutation } from '@tanstack/react-query';
import api from '@api';

interface CheckPathAssetParams {
	assetId: string;
	requestBody: string[];
}

const checkPathAssetMonitoring = ({ assetId, requestBody }: CheckPathAssetParams) => {
	return api.analystChangeMonitoringControllerApi
		.checkPath({ assetId: +assetId, requestBody })
		.then(({ data }) => data);
};

const useCheckPathAssetMonitoring = () => {
	return useMutation(checkPathAssetMonitoring);
};

export default useCheckPathAssetMonitoring;
