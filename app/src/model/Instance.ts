import { InstanceApi } from 'cosmo-api';
import Application, { fromApplicationApi } from './Application';

interface Instance {
	id: string;
	name: string;
	description?: string;
	application: Application;
}

export const fromInstanceApi = (instanceApi: InstanceApi): Instance => ({
	id: `${instanceApi.id}`,
	name: instanceApi.name,
	description: instanceApi.description,
	application: fromApplicationApi(instanceApi.application)
});
export default Instance;
