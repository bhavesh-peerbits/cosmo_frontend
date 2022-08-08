import {
	AccessControllerApi,
	ApplicationAuditDto,
	ApplicationAuditDtoAuditActionTypesEnum,
	ApplicationControllerApi,
	ApplicationDto,
	ApplicationUserDto,
	AuthControllerApi,
	Configuration,
	GenerateReportControllerApi,
	IdentityProviderDto,
	NarrativeReviewControllerApi,
	ProcedureAppInstanceDto,
	ProcedureControllerApi,
	ProcedureDto,
	RealmControllerApi,
	ReviewerControllerApi,
	UserAdminControllerApi,
	UserBase,
	UserControllerApi,
	UserDto
} from './v1';

export const ApiConfiguration = Configuration;
export default function configureApi(config: Configuration) {
	return {
		accessApi: new AccessControllerApi(config),
		userApi: new UserControllerApi(config),
		userAdminApi: new UserAdminControllerApi(config),
		applicationApi: new ApplicationControllerApi(config),
		procedureApi: new ProcedureControllerApi(config),
		narrativeReview: new NarrativeReviewControllerApi(config),
		reviewerApi: new ReviewerControllerApi(config),
		generateReportApi: new GenerateReportControllerApi(config),
		authApi: new AuthControllerApi(config),
		realmApi: new RealmControllerApi(config)
	};
}
export type ApplicationApi = ApplicationDto;
export type ApplicationUserApi = ApplicationUserDto;
export type UserApi = UserDto;
export type UserBaseApi = UserBase;
export type ProcedureApi = ProcedureDto;
export type ProcedureAppInstanceApi = ProcedureAppInstanceDto;
export type ApplicationAuditApi = ApplicationAuditDto;
export type ApplicationAuditActionTypeApi = ApplicationAuditDtoAuditActionTypesEnum;
export type IdentityProviderApi = IdentityProviderDto;
