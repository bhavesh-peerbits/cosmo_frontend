import EvidenceRequest from '@model/EvidenceRequest';
import { GetRecoilType } from '@store/util';
import { atom, selector } from 'recoil';
import isAfter from 'date-fns/isAfter';
import { isBefore } from 'date-fns';

type Filters = {
	query: string | undefined;
	currentStep: number[] | undefined;
	creator: string[];
	minDueDate: string | undefined;
	maxDueDate: string | undefined;
	tab: number | undefined;
	status: string[];
	minCompDate: string | undefined;
	maxCompDate: string | undefined;
	application: string[];
	workflowType: string[];
};

const evidenceRequestsFilters = atom<Filters>({
	key: 'evidenceRequestFilters',
	default: {
		query: undefined,
		currentStep: [],
		creator: [],
		minDueDate: undefined,
		maxDueDate: undefined,
		tab: undefined,
		status: [],
		minCompDate: undefined,
		maxCompDate: undefined,
		application: [],
		workflowType: []
	}
});

const evidenceRequests = atom<EvidenceRequest[]>({
	key: 'evidenceRequests',
	default: []
});

const applyFilters = (
	requests: GetRecoilType<typeof evidenceRequests>,
	filters: GetRecoilType<typeof evidenceRequestsFilters>
) => {
	const filteredRequest = requests
		// filter by query term string
		.filter(request =>
			filters.query
				? request.code
						?.toLowerCase()
						?.trim()
						?.includes(`${filters.query}`.toLowerCase().trim()) ||
				  request.application.codeName
						.toLowerCase()
						.trim()
						.includes(`${filters.query}`.toLowerCase().trim())
				: true
		)
		// .filter(request =>
		// 	filters.currentStep ? filters.currentStep.includes(`${request.currentStep}`) : true
		// )

		.filter(request =>
			filters.status?.length
				? filters.status.some(status => request.status === status)
				: true
		)
		.filter(request =>
			filters.creator?.length
				? filters.creator.some(
						creator =>
							request.creator.displayName?.toLowerCase() === `${creator}`.toLowerCase()
				  )
				: true
		)

		.filter(request =>
			filters.workflowType?.length
				? filters.workflowType.some(wfType => request.workflowType === wfType)
				: true
		)

		.filter(request =>
			filters.application?.length
				? filters.application.some(
						app => request.application.codeName.toLowerCase() === `${app}`.toLowerCase()
				  )
				: true
		)
		// filter due date
		.filter(request =>
			filters.minDueDate
				? request.dueDate && isAfter(request.dueDate, new Date(filters.minDueDate))
				: true
		)
		.filter(request =>
			filters.maxDueDate
				? request.dueDate && isBefore(request.dueDate, new Date(filters.maxDueDate))
				: true
		)
		.filter(request =>
			filters.minCompDate
				? request.completionDate &&
				  isAfter(request.completionDate, new Date(filters.minCompDate))
				: true
		)
		.filter(request =>
			filters.maxCompDate
				? request.completionDate &&
				  isBefore(request.completionDate, new Date(filters.maxCompDate))
				: true
		);

	return filteredRequest;
};

const filteredEvidenceRequests = selector({
	key: 'filteredEvidenceRequests',
	get: ({ get }) => {
		const filters = get(evidenceRequestsFilters);
		const requests = get(evidenceRequests);
		return {
			requests: applyFilters(requests, filters),
			creator: [
				...new Set(
					requests
						.filter(req =>
							filters.tab !== 1
								? req.status === 'IN_PROGRESS'
								: req.status !== 'DRAFT' && req.status !== 'IN_PROGRESS'
						)
						.map(req => req.creator?.displayName)
						.filter(o => !!o) as string[]
				)
			].map(creator => ({
				creator,
				enabled: filters.creator?.includes(creator ?? '')
			})),
			workflowType: [
				...new Set(
					requests
						.filter(req =>
							filters.tab !== 1
								? req.status === 'IN_PROGRESS'
								: req.status !== 'DRAFT' && req.status !== 'IN_PROGRESS'
						)
						.map(req => req.workflowType)
						.filter(o => !!o) as string[]
				)
			].map(workflowType => ({
				workflowType,
				enabled: filters.workflowType.includes(workflowType ?? '')
			})),
			application: [
				...new Set(
					requests
						.filter(req =>
							filters.tab !== 1
								? req.status === 'IN_PROGRESS'
								: req.status !== 'DRAFT' && req.status !== 'IN_PROGRESS'
						)
						.map(req => req.application.codeName)
						.filter(o => !!o) as string[]
				)
			].map(application => ({
				application,
				enabled: filters.application?.includes(`${application}` ?? '')
			})),
			currentStep: [
				...new Set(
					requests
						.filter(req =>
							filters.tab !== 1
								? req.status === 'IN_PROGRESS'
								: req.status !== 'DRAFT' && req.status !== 'IN_PROGRESS'
						)
						.map(req => req.currentStep)
						.filter(o => !!o) as number[]
				)
			].map(currentStep => ({
				currentStep,
				enabled: filters.currentStep?.includes(currentStep)
			})),
			status: [
				...new Set(
					requests
						.filter(req =>
							filters.tab !== 1
								? req.status === 'IN_PROGRESS'
								: req.status !== 'DRAFT' && req.status !== 'IN_PROGRESS'
						)
						.map(req => req.status)
						.filter(o => !!o) as string[]
				)
			].map(status => ({
				status,
				enabled: filters.status?.includes(status ?? '')
			})),
			maxDueDate: new Date(
				Math.max(
					...requests
						.filter(req =>
							filters.tab !== 1
								? req.status === 'IN_PROGRESS'
								: req.status !== 'DRAFT' && req.status !== 'IN_PROGRESS'
						)
						.map(element => {
							return new Date(element.dueDate).getTime();
						})
				)
			),
			minDueDate: new Date(
				Math.min(
					...requests
						.filter(req =>
							filters.tab !== 1
								? req.status === 'IN_PROGRESS'
								: req.status !== 'DRAFT' && req.status !== 'IN_PROGRESS'
						)
						.map(element => {
							return new Date(element.dueDate).getTime();
						})
				)
			),
			minCompDate: undefined,
			maxCompDate: undefined
		};
	}
});

export { evidenceRequestsFilters, evidenceRequests, filteredEvidenceRequests };
