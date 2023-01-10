import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromAssociationApi } from '@model/Association';

const useGetControls = (leaves?: string) => {
	return leaves
		? api.analystChangeMonitoringControllerApi
				.getControls({ leafs: leaves })
				.then(({ data }) => (data ? [...data.values()].map(fromAssociationApi) : []))
		: [];
};

export default (leaves?: string) =>
	useQuery(['controls', leaves], () => useGetControls(leaves));
