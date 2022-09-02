import { CampaignDtoTypeApi, CampaignDtoTypeApiEnum } from 'cosmo-api/src';

export type CampaignType = CampaignDtoTypeApi;
export type CampaignDisplayType = 'Firefight' | 'SUID' | 'User Access Review';

export const mapCampaignTypeToCampaignDisplayType = (
	campaignType: CampaignDtoTypeApi
): CampaignDisplayType => {
	switch (campaignType) {
		case CampaignDtoTypeApiEnum.Firefight:
			return 'Firefight';
		case CampaignDtoTypeApiEnum.Suid:
			return 'SUID';
		default:
			return 'User Access Review';
	}
};
