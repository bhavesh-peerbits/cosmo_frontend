import { AccessControllerApi, Configuration, UserControllerApi } from './v1';

export const ApiConfiguration = Configuration;
export default function configureApi(config: Configuration) {
	return {
		accessApi: new AccessControllerApi(config),
		userApi: new UserControllerApi(config)
	};
}
