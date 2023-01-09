import { User } from '@sentry/react';
import { MonitoringDraftApi } from 'cosmo-api';
import FileLink, { fromFileLinkApi } from './FileLink';
import Instance, { fromInstanceApi } from './Instance';
import MonitoringAsset, { fromMonitoringAssetApi } from './MonitoringAsset';
import { MonitoringStatus } from './MonitoringStatus';
import Scheduling, { fromSchedulingApi } from './Scheduling';
import Script from './Script';
import { fromUserApi } from './User';

interface MonitoringDraft {
	id: string;
	name: string;
	type: string;
	owner: User;
	focalPoint?: User;
	delegates?: User[];
	collaborators?: User[];
	instance?: Instance;
	monitoringAssets?: MonitoringAsset[];
	frameworkLeafs?: string;
	controlCode?: string;
	script?: Script;
	status: MonitoringStatus;
	note?: string;
	scheduling?: Scheduling;
	files?: FileLink[];
}

export const fromMonitoringDraftApi = (
	monitoringDraftApi: MonitoringDraftApi
): MonitoringDraft => ({
	id: `${monitoringDraftApi.id}`,
	name: monitoringDraftApi.name,
	type: monitoringDraftApi.type ? 'AUTOMATIC' : 'MANUAL',
	owner: fromUserApi(monitoringDraftApi.owner),
	focalPoint: monitoringDraftApi.focalPoint
		? fromUserApi(monitoringDraftApi.focalPoint)
		: undefined,
	delegates: monitoringDraftApi.delegates
		? [...monitoringDraftApi.delegates].map(fromUserApi)
		: [],
	collaborators: monitoringDraftApi.collaborators
		? [...monitoringDraftApi.collaborators].map(fromUserApi)
		: [],
	instance: monitoringDraftApi.instance
		? fromInstanceApi(monitoringDraftApi.instance)
		: undefined,
	monitoringAssets: monitoringDraftApi.monitoringAssets
		? [...monitoringDraftApi.monitoringAssets].map(fromMonitoringAssetApi)
		: undefined,
	frameworkLeafs: monitoringDraftApi.frameworkLeafs,
	controlCode: monitoringDraftApi.controlCode,
	script: monitoringDraftApi.script,
	status: monitoringDraftApi.status,
	note: monitoringDraftApi.note,
	scheduling: monitoringDraftApi.scheduling
		? fromSchedulingApi(monitoringDraftApi.scheduling)
		: undefined,
	files: monitoringDraftApi.files
		? [...monitoringDraftApi.files].map(fromFileLinkApi)
		: undefined
});

export default MonitoringDraft;
