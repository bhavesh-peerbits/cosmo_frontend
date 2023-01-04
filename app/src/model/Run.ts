import { User } from '@sentry/react';
import { DeltaDto, RunDtoStatusEnum, RunFileLinkDto } from 'cosmo-api/src/v1';
import RunAsset from './RunAsset';

interface Run {
	id: string;
	orderNumber: number;
	status: RunDtoStatusEnum;
	startingDate?: string;
	completionDate?: string;
	completionUser?: User;
	focalPoint?: User;
	focalPointDelegates?: User[];
	runAsset: RunAsset[];
	deltas?: DeltaDto[];
	runFileLinks?: RunFileLinkDto[];
	notes?: string;
}
export default Run;
