import { PhaseTypeApi } from 'cosmo-api';

interface PhaseType {
	id: string;
	name?: string;
	description?: string;
}

export const fromPhaseTypeApi = (phaseTypeApi: PhaseTypeApi): PhaseType => {
	return {
		id: `${phaseTypeApi.id}`,
		name: phaseTypeApi.name,
		description: phaseTypeApi.description
	};
};

export const toPhaseTypeApi = (phaseType: PhaseType): PhaseTypeApi => {
	return {
		id: +phaseType.id,
		name: phaseType.name,
		description: phaseType.description
	};
};

export default PhaseType;
