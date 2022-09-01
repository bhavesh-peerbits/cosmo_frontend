import {
	AccessControllerApi,
	AnalystCampaignControllerApi,
	AnswerDto,
	AnswerDtoAnswerTypeEnum,
	ApplicationAuditDto,
	ApplicationAuditDtoAuditActionTypesEnum,
	ApplicationControllerApi,
	ApplicationDto,
	ApplicationUserDto,
	AuthControllerApi,
	CampaignDto,
	CampaignDtoLayerEnum,
	CampaignDtoStatusEnum,
	CampaignDtoTypeEnum,
	CampaignReviewDto,
	Configuration,
	GenerateReportControllerApi,
	IdentityProviderDto,
	NarrativeReviewControllerApi,
	PairListAnswerDtoListString,
	ProcedureAppInstanceDto,
	ProcedureControllerApi,
	ProcedureDto,
	RealmControllerApi,
	ReviewDto,
	ReviewDtoStatusEnum,
	ReviewerCampaignControllerApi,
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
		realmApi: new RealmControllerApi(config),
		revalidationApi: new ReviewerCampaignControllerApi(config),
		analystCampaignApi: new AnalystCampaignControllerApi(config)
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
export type CampaignApi = CampaignDto;
export type CampaignWithReviewApi = CampaignReviewDto;
export const CampaignDtoTypeApiEnum = CampaignDtoTypeEnum;
export type CampaignDtoTypeApi = CampaignDtoTypeEnum;
export const CampaignDtoLayerApiEnum = CampaignDtoLayerEnum;
export type CampaignDtoLayerApi = CampaignDtoLayerEnum;
export const CampaignDtoStatusApiEnum = CampaignDtoStatusEnum;
export type CampaignDtoStatusApi = CampaignDtoStatusEnum;
export type CampaignApplicationApi = ReviewDto;
export type CampaignApplicationStatusApi = ReviewDtoStatusEnum;
export type AnswerApi = AnswerDto;
export type AnswerApiTypeEnum = AnswerDtoAnswerTypeEnum;
export type FileAnswerStatusApi = PairListAnswerDtoListString;
