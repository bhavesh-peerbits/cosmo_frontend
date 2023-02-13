import { CampaignDtoTypeApi, CampaignDtoTypeApiEnum } from 'cosmo-api/src';

export type CampaignType = CampaignDtoTypeApi;
export type CampaignDisplayType = 'Firefighter' | 'SUID' | 'User Access Review';

export const mapCampaignTypeToCampaignDisplayType = (
	campaignType: CampaignDtoTypeApi
): CampaignDisplayType => {
	switch (campaignType) {
		case CampaignDtoTypeApiEnum.Firefighter:
			return 'Firefighter';
		case CampaignDtoTypeApiEnum.Suid:
			return 'SUID';
		default:
			return 'User Access Review';
	}
};
