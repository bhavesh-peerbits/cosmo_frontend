import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import User, { toUserApi } from '@model/User';

interface SaveDraftAssociationParameters {
	monitoringId: string;
	controlCode: string;
	focalPoint?: User;
	delegates?: User[];
	frameworkLeafsCodes: string;
	frameworkLeafsNames: string;
	frameworkName: string;
}

const saveDraftAssociation = ({
	monitoringId,
	controlCode,
	delegates,
	focalPoint,
	frameworkLeafsCodes,
	frameworkLeafsNames,
	frameworkName
}: SaveDraftAssociationParameters) => {
	return api.analystChangeMonitoringControllerApi.saveDraftAssociation({
		monitoringId: +monitoringId,
		saveDraftAssociationDto: {
			controlCode,
			delegates: delegates?.map(toUserApi),
			focalPoint: focalPoint ? toUserApi(focalPoint) : undefined,
			frameworkLeafsCodes,
			frameworkLeafsNames,
			frameworkName
		}
	});
};

const useSaveDraftAssociation = () => {
	const queryClient = useQueryClient();
	return useMutation(saveDraftAssociation, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['monitoring-draft', `${variables.monitoringId}`]);
		}
	});
};

export default useSaveDraftAssociation;
