import { CampaignDtoStatusApi, CampaignDtoStatusApiEnum } from 'cosmo-api/src';

export type CampaignStatus = CampaignDtoStatusApi;

export const mapCampaignStatusToCampaignDisplayStatus = (
	campaignStatus: CampaignDtoStatusApi
) => {
	switch (campaignStatus) {
		case CampaignDtoStatusApiEnum.Completed:
			return 'Completed';
		case CampaignDtoStatusApiEnum.CompletedWithPartialAnswers:
			return 'Completed with partial answers';
		case CampaignDtoStatusApiEnum.ReviewInProgress:
			return 'Review in progress';
		case CampaignDtoStatusApiEnum.ReadyForReview:
			return 'Ready for review';
		case CampaignDtoStatusApiEnum.WaitingForData:
			return 'Waiting for data';
		case CampaignDtoStatusApiEnum.Annulled:
			return 'Annulled';
		default:
			return 'Annulled';
	}
};
