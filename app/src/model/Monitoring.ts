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
	controlCode?: string;
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
