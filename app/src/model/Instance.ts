import { InstanceApi } from 'cosmo-api';
import Application, {
	fromApplicationApi,
	toApplicationApi
} from './Narrative/Application';

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

export const toInstanceApi = (instance: Instance): InstanceApi => ({
	id: +instance.id,
	name: instance.name,
	description: instance.description,
	application: toApplicationApi(instance.application)
});

export default Instance;
