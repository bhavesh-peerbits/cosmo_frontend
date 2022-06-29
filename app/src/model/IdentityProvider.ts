import { IdentityProviderApi } from 'cosmo-api/src';
import { SERVER_URL } from '@api';

interface IdentityProvider {
	id: string;
	name: string;
	url: string;
}

export const fromProviderApi = (provider: IdentityProviderApi): IdentityProvider => {
	return {
		id: provider.id,
		name: provider.displayName || provider.alias,
		url: `${SERVER_URL.replace(/\/$/, '')}/${provider.url.replace(/^\//, '')}`
	};
};

export default IdentityProvider;
