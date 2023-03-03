/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import { atom, selector } from 'recoil';
import { GetRecoilType } from '@store/util';
import { isAfter, isBefore } from 'date-fns';
import Templates from '@model/Administration/DocumentTemplates';

type Filters = {
	type: string[];
	allowChanges: boolean | undefined;
	approvalSteps: number | undefined;
	totalChapters: number | undefined;
	usages: number | undefined;
	createdOnFrom: string | undefined;
	createdOnTo: string | undefined;
	q: string | undefined;
	isTile: boolean | undefined;
};

const documentTemplatesFilter = atom<Filters>({
	key: 'documentTemplatesFilter',
	default: {
		type: [],
		allowChanges: undefined,
		approvalSteps: undefined,
		totalChapters: undefined,
		usages: undefined,
		createdOnFrom: undefined,
		createdOnTo: undefined,
		isTile: true,
		q: undefined
	}
});

const documentTemplates = atom<Templates[]>({
	key: 'documentTemplates',
	default: []
});

const applyFilters = (
	templates: GetRecoilType<typeof documentTemplates>,
	filters: GetRecoilType<typeof documentTemplatesFilter>
) => {
	const filteredTemplates = templates
		// filter by query term string
		.filter(template =>
			filters.q
				? template.name
						?.toLowerCase()
						?.trim()
						?.includes(filters.q.toString().toLowerCase().trim())
				: true
		);

	if (filters.isTile !== false) {
		return (
			filteredTemplates
				// filter by type
				.filter(request =>
					filters.type.length > 0 ? filters.type.includes(request.type) : true
				)

				// filter by changes
				.filter(request =>
					filters.allowChanges !== undefined
						? request.allowChanges === filters.allowChanges
						: true
				)

				// filter by total approval steps
				.filter(request =>
					filters.approvalSteps !== undefined
						? request.approvalSteps === filters.approvalSteps
						: true
				)

				// filter by total chapters
				.filter(request =>
					filters.totalChapters !== undefined
						? request.totalChapters === filters.totalChapters
						: true
				)

				// filter by total usage
				.filter(request =>
					filters.usages !== undefined ? request.usages === filters.usages : true
				)

				// filter by created on from
				.filter(request =>
					filters.createdOnFrom
						? request.createdOn &&
						  isAfter(request.createdOn, new Date(filters.createdOnFrom))
						: true
				)

				// filter by created on to
				.filter(request =>
					filters.createdOnTo
						? request.createdOn &&
						  isBefore(request.createdOn, new Date(filters.createdOnTo))
						: true
				)
		);
	}
	return filteredTemplates;
};

const filteredDocumentTemplates = selector({
	key: 'filteredDocumentTemplates',
	get: ({ get }) => {
		const filters = get(documentTemplatesFilter);
		const templates = get(documentTemplates);
		return {
			templates: applyFilters(templates, filters),
			type: [],
			allowChanges: undefined,
			approvalSteps: undefined,
			totalChapters: undefined,
			usages: undefined,
			createdOnFrom: undefined,
			createdOnTo: undefined,
			isTile: true,
			q: undefined
		};
	}
});

export { documentTemplatesFilter, documentTemplates, filteredDocumentTemplates };
