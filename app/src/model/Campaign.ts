/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
	CampaignApi,
	CampaignDtoLayerApi,
	CampaignDtoStatusApi,
	CampaignDtoTypeApi
} from 'cosmo-api';
import User, { fromUserApi, toUserApi } from '@model/User';
import formatIso from 'date-fns/formatISO';

interface Campaign {
	id: string;
	name: string;
	applicationsCount: number;
	dueDate?: Date;
	type: CampaignDtoTypeApi;
	status?: CampaignDtoStatusApi;
	archived: boolean;
	completionDate?: Date;
	contributors: User[];
	startDate?: Date;
	layer: CampaignDtoLayerApi;
}

export const fromCampaignApi = (campaign: CampaignApi): Campaign => {
	return {
		id: `${campaign.id ?? 0}`,
		name: campaign.name || '',
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

export const toCampaignApi = (campaign: Campaign): CampaignApi => {
	return {
		id: +campaign.id,
		name: campaign.name,
		applicationsCount: campaign.applicationsCount,
		dueDate: campaign.dueDate
			? formatIso(campaign.dueDate, { representation: 'date' })
			: undefined,
		type: campaign.type,
		status: campaign.status,
		archived: campaign.archived,
		completionDate: campaign.completionDate
			? formatIso(campaign.completionDate, { representation: 'date' })
			: undefined,
		// @ts-ignore
		contributors: campaign.contributors.map(toUserApi),
		startDate: campaign.startDate
			? formatIso(campaign.startDate, { representation: 'date' })
			: undefined,
		layer: campaign.layer
	};
};

export default Campaign;
