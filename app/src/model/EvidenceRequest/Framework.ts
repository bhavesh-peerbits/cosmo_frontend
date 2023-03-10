import { FrameworkApi } from 'cosmo-api';

interface Framework {
	code: string;
	name?: string;
	description?: string;
	children?: Framework[];
	leafs?: string[];
}

export const fromFrameworkApi = (frameworkApi: FrameworkApi): Framework => {
	return {
		code: frameworkApi.code || '',
		name: frameworkApi.name,
		description: frameworkApi.description,
		children: frameworkApi.children
			? frameworkApi.children.map(fromFrameworkApi)
			: undefined,
		leafs: frameworkApi.leafs
	};
};

export const toFrameworkApi = (framework: Framework): FrameworkApi => {
	return {
		code: framework.code,
		name: framework.name,
		description: framework.description,
		children: framework.children?.map(toFrameworkApi),
		leafs: framework.leafs
	};
};

export default Framework;
