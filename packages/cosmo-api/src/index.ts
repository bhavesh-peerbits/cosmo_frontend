import {
	AccessControllerApi,
	AnalystCampaignControllerApi,
	ApplicationAuditDto,
	ApplicationAuditDtoAuditActionTypesEnum,
	ApplicationControllerApi,
	ApplicationDto,
	AuthControllerApi,
	CampaignDto,
	CampaignDtoLayerEnum,
	CampaignDtoStatusEnum,
	CampaignDtoTypeEnum,
	Configuration,
	GenerateReportControllerApi,
	IdentityProviderDto,
	NarrativeReviewControllerApi,
	ProcedureAppInstanceDto,
	ProcedureControllerApi,
	ProcedureDto,
	RealmControllerApi,
	ReviewerCampaignControllerApi,
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
		generateReportApi: new GenerateReportControllerApi(config),
		authApi: new AuthControllerApi(config),
		realmApi: new RealmControllerApi(config),
		revalidationApi: new ReviewerCampaignControllerApi(config),
		analystCampaignApi: new AnalystCampaignControllerApi(config)
	};
}
export type ApplicationApi = ApplicationDto;
export type UserApi = UserDto;
export type ProcedureApi = ProcedureDto;
export type ProcedureAppInstanceApi = ProcedureAppInstanceDto;
export type ApplicationAuditApi = ApplicationAuditDto;
export type ApplicationAuditActionTypeApi = ApplicationAuditDtoAuditActionTypesEnum;
export type IdentityProviderApi = IdentityProviderDto;
export type CampaignApi = CampaignDto;
export const CampaignDtoTypeApiEnum = CampaignDtoTypeEnum;
export type CampaignDtoTypeApi = CampaignDtoTypeEnum;
export const CampaignDtoLayerApiEnum = CampaignDtoLayerEnum;
export type CampaignDtoLayerApi = CampaignDtoLayerEnum;
export const CampaignDtoStatusApiEnum = CampaignDtoStatusEnum;
export type CampaignDtoStatusApi = CampaignDtoStatusEnum;
