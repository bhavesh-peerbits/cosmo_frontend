import {
	AccessControllerApi,
	ApplicationControllerApi,
	ApplicationDto,
	Configuration,
	ProcedureAppInstanceDto,
	ProcedureControllerApi,
	ProcedureDto,
	UserControllerApi,
	UserDto
} from './v1';

export const ApiConfiguration = Configuration;
export default function configureApi(config: Configuration) {
	return {
		accessApi: new AccessControllerApi(config),
		userApi: new UserControllerApi(config),
		applicationApi: new ApplicationControllerApi(config),
		procedureApi: new ProcedureControllerApi(config)
	};
}
export type ApplicationApi = ApplicationDto;
export type UserApi = UserDto;
export type ProcedureApi = ProcedureDto;
export type ProcedureAppInstanceApi = ProcedureAppInstanceDto;
