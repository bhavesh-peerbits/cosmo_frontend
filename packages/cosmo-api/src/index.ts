import {
	AccessControllerApi,
	ApplicationAuditDto,
	ApplicationAuditDtoAuditActionTypesEnum,
	ApplicationControllerApi,
	ApplicationDto,
	Configuration,
	GenerateReportControllerApi,
	NarrativeReviewControllerApi,
	ProcedureAppInstanceDto,
	ProcedureControllerApi,
	ProcedureDto,
	ReviewerControllerApi,
	UserControllerApi,
	UserDto
} from './v1';

export const ApiConfiguration = Configuration;
export default function configureApi(config: Configuration) {
	return {
		accessApi: new AccessControllerApi(config),
		userApi: new UserControllerApi(config),
		applicationApi: new ApplicationControllerApi(config),
		procedureApi: new ProcedureControllerApi(config),
		narrativeReview: new NarrativeReviewControllerApi(config),
		reviewerApi: new ReviewerControllerApi(config),
		generateReportApi: new GenerateReportControllerApi(config)
	};
}
export type ApplicationApi = ApplicationDto;
export type UserApi = UserDto;
export type ProcedureApi = ProcedureDto;
export type ProcedureAppInstanceApi = ProcedureAppInstanceDto;
export type ApplicationAuditApi = ApplicationAuditDto;
export type ApplicationAuditActionTypeApi = ApplicationAuditDtoAuditActionTypesEnum;
