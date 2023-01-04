import Application from './Application';
import User from './User';

// TODO fix
interface Monitoring {
	id: string;
	name: string;
	type: boolean;
	focalPoint?: User;
	focalPointDelegates?: User[];
	collaborators?: User[];
	application?: Application;
	instance?: string;
	assets?: string[];
	framework?: string;
	controls?: string[];
	script?: string;
	note?: string;
	numberOfRun: number;
	currentRun: number;
	scheduling: {
		frequency: string;
		startDate: Date;
		endDate: Date;
	};
	status: string;
}
export default Monitoring;
// import FileLink from './FileLink';
// import Instance from './Instance';
// import MonitoringAsset from './MonitoringAsset';
// import { MonitoringStatus } from './MonitoringStatus';
// import Run from './Run';
// import Scheduling from './Scheduling';
// import Script from './Script';
// import User from './User';

// interface Monitoring {
// 	id: string;
// 	name: string;
// 	type: boolean;
// 	owner: User;
// 	focalPoint: User;
// 	delegates?: User[];
// 	collaborators?: User[];
// 	instance: Instance;
// 	monitoringAssets: MonitoringAsset[];
// 	framework: string;
// 	controlCode: string;
// 	script: Script;
// 	status: MonitoringStatus;
// 	note?: string;
// 	scheduling: Scheduling;
// 	totalRuns: number;
// 	currentRun?: number;
// 	completionDate?: string;
// 	completionUser?: User;
// 	runs: Run[];
// 	files?: FileLink[];
// }
// export default Monitoring;
