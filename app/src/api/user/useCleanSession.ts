import { useMutation } from '@tanstack/react-query';
import api from '@api/index';

interface CleanSessionRequest {
	tenant: string;
}

function performCleanSession(tenant: string) {
	return api.realmApi.clearSession({
		tenant
	});
}

export default () =>
	useMutation(['cleanSession'], ({ tenant }: CleanSessionRequest) =>
		performCleanSession(tenant)
	);
