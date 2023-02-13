/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AssociationApi } from 'cosmo-api';
import User, { fromUserApi, toUserApi } from '../User';

export type StepInfoType = {
	publicComment: string | undefined;
	privateComment: string | undefined;
};

interface Association {
	reviewer?: User;
	delegates?: User[];
	id: string;
	name?: string;
}

export const fromAssociationApi = (association: AssociationApi): Association => {
	return {
		reviewer: association.reviewer ? fromUserApi(association.reviewer) : undefined,
		delegates: association.delegates
			? [...association.delegates].map(user => fromUserApi(user))
			: [],
		id: `${association.id}`,
		name: association.name
	};
};

export const toAssociationApi = (association: Association): AssociationApi => {
	return {
		id: +association.id,
		reviewer: association.reviewer ? toUserApi(association.reviewer) : undefined,
		// @ts-ignore
		delegates: association.delegates,
		name: association.name
	};
};

export default Association;
