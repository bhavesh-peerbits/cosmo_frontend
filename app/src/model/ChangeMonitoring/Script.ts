import { ScriptDtoOsEnum } from 'cosmo-api/src/v1';

interface Script {
	id: number;
	name: string;
	description?: string;
	os: ScriptDtoOsEnum;
}
export default Script;
