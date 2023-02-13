import { MonitoringApi } from 'cosmo-api';
import FileLink, { fromFileLinkApi } from './common/FileLink';
import Instance, { fromInstanceApi } from './Narrative/Instance';
import MonitoringAsset, { fromMonitoringAssetApi } from './MonitoringAsset';
import { MonitoringStatus } from './MonitoringStatus';
import Run, { fromRunApi } from './Run';
import Scheduling, { fromSchedulingApi } from './Scheduling';
import Script from './Script';
import User, { fromUserApi } from './User';

interface Monitoring {
	id: string;
	name: string;
	type: string;
	owner: User;
	focalPoint: User;
	delegates?: User[];
	collaborators?: User[];
	instance: Instance;
	monitoringAssets: MonitoringAsset[];
	frameworkLeafsName?: string;
	frameworkLeafsCodes?: string;
	frameworkName?: string;
	controlCode: string;
	script: Script;
	status: MonitoringStatus;
	note?: string;
	scheduling: Scheduling;
	currentRun?: number;
	completionDate?: string;
	completionUser?: User;
	runs: Run[];
	files?: FileLink[];
}
export default Monitoring;

export const fromMonitoringApi = (monitoringApi: MonitoringApi): Monitoring => ({
	id: `${monitoringApi.id}`,
	name: monitoringApi.name,
	type: monitoringApi.type ? 'AUTOMATIC' : 'MANUAL',
	owner: fromUserApi(monitoringApi.owner),
	focalPoint: fromUserApi(monitoringApi.focalPoint),
	delegates: monitoringApi.delegates ? [...monitoringApi.delegates].map(fromUserApi) : [],
	collaborators: monitoringApi.collaborators
		? [...monitoringApi.collaborators].map(fromUserApi)
		: [],
	instance: fromInstanceApi(monitoringApi.instance),
	monitoringAssets: [...monitoringApi.monitoringAssets].map(fromMonitoringAssetApi),
	frameworkLeafsCodes: monitoringApi.frameworkLeafsCodes,
	frameworkLeafsName: monitoringApi.frameworkLeafsName,
	frameworkName: monitoringApi.frameworkName,
	controlCode: monitoringApi.controlCode,
	script: monitoringApi.script,
	status: monitoringApi.status,
	note: monitoringApi.note,
	scheduling: fromSchedulingApi(monitoringApi.scheduling),
	currentRun: monitoringApi.currentRun,
	completionDate: monitoringApi.completionDate,
	completionUser: monitoringApi.completionUser
		? fromUserApi(monitoringApi.completionUser)
		: undefined,
	runs: [...monitoringApi.runs].map(fromRunApi),
	files: monitoringApi.files ? [...monitoringApi.files].map(fromFileLinkApi) : undefined
});
