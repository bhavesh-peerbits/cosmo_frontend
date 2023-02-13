import { MonitoringDraftApi } from 'cosmo-api';
import FileLink, { fromFileLinkApi, toFileLinkApi } from '../common/FileLink';
import Instance, { fromInstanceApi, toInstanceApi } from '../Narrative/Instance';
import MonitoringAsset, {
	fromMonitoringAssetApi,
	toMonitoringAssetApi
} from './MonitoringAsset';
import { MonitoringStatus } from '../MonitoringStatus';
import Scheduling, { fromSchedulingApi, toSchedulingApi } from '../Scheduling';
import Script from '../Script';
import User, { fromUserApi, toUserApi } from '../User';

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
	frameworkLeafsName?: string;
	frameworkLeafsCodes?: string;
	frameworkName?: string;
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
	frameworkLeafsCodes: monitoringDraftApi.frameworkLeafsCodes,
	frameworkLeafsName: monitoringDraftApi.frameworkLeafsName,
	frameworkName: monitoringDraftApi.frameworkName,
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

export const toMonitoringDraftApi = (
	monitoringDraft: MonitoringDraft
): MonitoringDraftApi => {
	return {
		id: +monitoringDraft.id,
		name: monitoringDraft.name,
		type: monitoringDraft.type === 'AUTOMATIC',
		owner: toUserApi(monitoringDraft.owner),
		focalPoint: monitoringDraft.focalPoint
			? toUserApi(monitoringDraft.focalPoint)
			: undefined,
		delegates: monitoringDraft.delegates
			? [...monitoringDraft.delegates].map(toUserApi)
			: [],
		collaborators: monitoringDraft.collaborators
			? [...monitoringDraft.collaborators].map(toUserApi)
			: [],
		instance: monitoringDraft.instance
			? toInstanceApi(monitoringDraft.instance)
			: undefined,
		monitoringAssets: monitoringDraft.monitoringAssets
			? [...monitoringDraft.monitoringAssets].map(toMonitoringAssetApi)
			: undefined,
		frameworkLeafsCodes: monitoringDraft.frameworkLeafsCodes,
		frameworkLeafsName: monitoringDraft.frameworkLeafsName,
		frameworkName: monitoringDraft.frameworkName,
		controlCode: monitoringDraft.controlCode,
		script: monitoringDraft.script,
		status: monitoringDraft.status,
		note: monitoringDraft.note,
		scheduling: monitoringDraft.scheduling
			? toSchedulingApi(monitoringDraft.scheduling)
			: undefined,
		files: monitoringDraft.files
			? [...monitoringDraft.files].map(toFileLinkApi)
			: undefined
	};
};

export default MonitoringDraft;
