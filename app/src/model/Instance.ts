import { InstanceApi } from 'cosmo-api';
import Application, { fromApplicationApi, toApplicationApi } from './Application';

interface Instance {
	id: string;
	name: string;
	description?: string;
	application: Application;
	isInReview?: boolean;
	lastReview?: Date;
}

export const fromInstanceApi = (instanceApi: InstanceApi): Instance => ({
	id: `${instanceApi.id}`,
	name: instanceApi.name,
	description: instanceApi.description,
	application: fromApplicationApi(instanceApi.application),
	isInReview: instanceApi.isInReview,
	lastReview: instanceApi.lastReview ? new Date(instanceApi.lastReview) : undefined
});

export const toInstanceApi = (instance: Instance): InstanceApi => ({
	id: +instance.id,
	name: instance.name,
	description: instance.description,
	application: toApplicationApi(instance.application),
	isInReview: instance.isInReview,
	lastReview: instance.lastReview?.toISOString()
});

export default Instance;
