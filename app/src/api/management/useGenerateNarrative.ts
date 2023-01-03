import { useMutation } from '@tanstack/react-query';

const generateNarrative = () => {
	return new Promise(resolve => {
		setTimeout(() => resolve({}), 1000);
	});
};

const useGenerateNarrative = (appId: string) => {
	return useMutation(['generateNarrativeApp', appId], generateNarrative);
};

export default useGenerateNarrative;
