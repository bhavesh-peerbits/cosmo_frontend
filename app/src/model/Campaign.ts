import { CampaignApi } from 'cosmo-api/src';
import {
	CampaignDtoLayerEnum,
	CampaignDtoStatusEnum,
	CampaignDtoTypeEnum
} from 'cosmo-api/src/v1';
import User, { fromUserApi } from '@model/User';

interface Campaign {
	id: string;
	name: string | undefined | null;
	applicationsCount: number;
	dueDate: Date | undefined;
	type: CampaignDtoTypeEnum;
	status: CampaignDtoStatusEnum | undefined;
	archived: boolean;
	completionDate: Date | undefined;
	contributors: User[];
	startDate: Date | undefined;
	layer: CampaignDtoLayerEnum;
}

export const fromCampaignApi = (campaign: CampaignApi): Campaign => {
	return {
		id: `${campaign.id ?? 0}`,
		name: campaign.name,
		applicationsCount: campaign.applicationsCount ?? 0,
		dueDate: campaign.dueDate ? new Date(campaign.dueDate) : undefined,
		type: campaign.type,
		status: campaign.status,
		archived: campaign.archived ?? false,
		completionDate: campaign.completionDate
			? new Date(campaign.completionDate)
			: undefined,
		contributors: campaign.contributors
			? [...campaign.contributors].map(user => fromUserApi(user))
			: [],
		startDate: campaign.startDate ? new Date(campaign.startDate) : undefined,
		layer: campaign.layer
	};
};

export default Campaign;
