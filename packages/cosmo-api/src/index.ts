import {
	AccessControllerApi,
	AnalystCampaignControllerApi,
	AnswerDto,
	AnswerDtoAnswerTypeEnum,
	ApplicationAuditDto,
	ApplicationAuditDtoAuditActionTypesEnum,
	ApplicationCampaignDto,
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
	DraftDto,
	EvidenceRequestControllerApi,
	EvidenceRequestDraftDto,
	EvidenceRequestDto,
	FileLinkDto,
	GenerateReportControllerApi,
	IdentityProviderDto,
	InstanceDto,
	InstanceAssetDto,
	MonitoringDtoStatusEnum,
	NarrativeReviewControllerApi,
	NewDraftDto,
	PairListAnswerDtoListString,
	PhaseTypeDto,
	ProcedureAppInstanceDto,
	ProcedureControllerApi,
	ProcedureDto,
	RealmControllerApi,
	ReviewDto,
	ReviewDtoStatusEnum,
	ReviewerCampaignControllerApi,
	ReviewerControllerApi,
	StepDto,
	CloseEvidenceDto,
	UserAdminControllerApi,
	UserBase,
	UserControllerApi,
	UserDto,
	WorkflowDto,
	AssociationDto,
	EvidenceRequestFileS3ControllerApi,
	FrameworkTreeDto,
	FrameworkTreeForEvidenceControllerApi,
	EvidenceRequestFocalPointControllerApi,
	MonitoringDto,
	MonitoringDraftDto,
	AnalystChangeMonitoringControllerApi,
	MonitoringAssetDto,
	AssetDto,
	SchedulingDto,
	RunDto,
	RunAssetDto
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
		analystCampaignApi: new AnalystCampaignControllerApi(config),
		evidenceRequest: new EvidenceRequestControllerApi(config),
		frameworkTreeApi: new FrameworkTreeForEvidenceControllerApi(config),
		evidenceRequestFocalPointApi: new EvidenceRequestFocalPointControllerApi(config),
		EvidenceRequestFileS3Api: new EvidenceRequestFileS3ControllerApi(config),
		analystChangeMonitoringControllerApi: new AnalystChangeMonitoringControllerApi(config)
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
export type ApplicationCampaignApi = ApplicationCampaignDto;
export type ApplicationStepRequestApi = EvidenceRequestDraftDto;
export type EvidenceRequestDraftApi = DraftDto;
export type EvidenceRequestApi = EvidenceRequestDto;
export type EvidenceRequestStepApi = StepDto;
export type NewDraftParameterApi = NewDraftDto;
export type FileLinkApi = FileLinkDto;
export type WorkflowApi = WorkflowDto;
export type PhaseTypeApi = PhaseTypeDto;
export type FrameworkApi = FrameworkTreeDto;
export type CloseEvidenceApi = CloseEvidenceDto;
export type AssociationApi = AssociationDto;
export const MonitoringDtoStatusApiEnum = MonitoringDtoStatusEnum;
export type MonitoringDtoStatusApi = MonitoringDtoStatusEnum;
export type InstanceApi = InstanceDto;
export type MonitoringApi = MonitoringDto;
export type MonitoringAssetApi = MonitoringAssetDto;
export type AssetApi = AssetDto;
export type SchedulingApi = SchedulingDto;
export type RunApi = RunDto;
export type RunAssetApi = RunAssetDto;
export type InstanceAssetApi = InstanceAssetDto;
export type MonitoringDraftApi = MonitoringDraftDto;
