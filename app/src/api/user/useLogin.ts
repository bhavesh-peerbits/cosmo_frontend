import { useMutation } from 'react-query';
import api from '@api/index';

interface LoginRequest {
	user: string;
	password: string;
	tenant: string;
}

async function performLogin(user: string, password: string, tenant: string) {
	return (
		await api.accessApi.login({
			user,
			password,
			tenant
		})
	).data;
}

export default () =>
	useMutation(['login'], ({ user, password, tenant }: LoginRequest) =>
		performLogin(user, password, tenant)
	);
