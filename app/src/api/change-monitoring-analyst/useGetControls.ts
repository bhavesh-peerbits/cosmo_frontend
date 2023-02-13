import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromAssociationApi } from '@model/EvidenceRequest/Association';

interface GetControlsParameter {
	leaves?: string;
	instanceId?: string;
}
const useGetControls = ({ leaves, instanceId }: GetControlsParameter) => {
	return leaves && instanceId
		? api.analystChangeMonitoringControllerApi
				.getControls({ leafs: leaves, instanceId: +instanceId })
				.then(({ data }) => (data ? [...data.values()].map(fromAssociationApi) : []))
		: [];
};

export default (leaves?: string, instanceId?: string) =>
	useQuery(['controls', leaves, instanceId], () =>
		useGetControls({ leaves, instanceId })
	);
