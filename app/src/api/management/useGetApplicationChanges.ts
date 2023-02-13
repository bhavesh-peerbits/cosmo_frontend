import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromApplicationAuditApi } from '@model/Narrative/ApplicationAudit';

const getApplicationChanges = (appId: string) => {
	return api.applicationApi
		.getAllAuditForApplication({ appId: +appId })
		.then(({ data }) => data.map(fromApplicationAuditApi));
};

export default (appId: string) =>
	useQuery(['appChanges', appId], () => getApplicationChanges(appId));
