import { User } from '@sentry/react';
import { RunApi } from 'cosmo-api';
import { DeltaDto, RunDtoStatusEnum } from 'cosmo-api/src/v1';
import RunAsset, { fromRunAssetApi } from './RunAsset';
import { fromUserApi } from './User';

interface Run {
	id: string;
	orderNumber: number;
	status: RunDtoStatusEnum;
	startingDate?: Date;
	completionDate?: Date;
	completionUser?: User;
	focalPoint?: User;
	focalPointDelegates?: User[];
	runAsset: RunAsset[];
	deltas?: DeltaDto[];
	notes?: string;
}
export const fromRunApi = (runApi: RunApi): Run => ({
	id: `${runApi.id}`,
	orderNumber: runApi.orderNumber,
	status: runApi.status,
	startingDate: runApi.startingDate ? new Date(runApi.startingDate) : undefined,
	completionDate: runApi.completionDate ? new Date(runApi.completionDate) : undefined,
	completionUser: runApi.completionUser ? fromUserApi(runApi.completionUser) : undefined,
	focalPoint: runApi.focalPoint ? fromUserApi(runApi.focalPoint) : undefined,
	focalPointDelegates: runApi.focalPointDelegates
		? [...runApi.focalPointDelegates].map(fromUserApi)
		: [],
	runAsset: [...runApi.runAsset].map(fromRunAssetApi),
	deltas: runApi.deltas ? [...runApi.deltas] : undefined,
	notes: runApi.notes
});
export default Run;
