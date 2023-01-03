import { useQuery } from '@tanstack/react-query';
import api from '@api/index';
import { fromProviderApi } from '@model/IdentityProvider';

async function getProviders(tenant: string) {
	return api.accessApi
		.getProviders({
			tenant
		})
		.then(({ data }) => data.map(fromProviderApi));
}

export default (tenant: string) =>
	useQuery(['login', 'providers', tenant], () => getProviders(tenant), {
		suspense: false
	});
