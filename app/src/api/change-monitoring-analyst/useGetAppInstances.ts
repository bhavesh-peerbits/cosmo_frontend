import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromInstanceAssetApi } from '@model/Narrative/InstanceAsset';

const useGetAppIntances = (applicationCodeName?: string) => {
	return applicationCodeName
		? api.analystChangeMonitoringControllerApi
				.getApplicationInstances({ applicationCodeName })
				.then(({ data }) => (data ? [...data.values()].map(fromInstanceAssetApi) : []))
		: [];
};

export default (appCodeName?: string) =>
	useQuery(['instance-assets', appCodeName], () => useGetAppIntances(appCodeName));
