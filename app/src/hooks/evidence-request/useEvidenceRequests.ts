import useGetAllEvidenceRequest from '@api/evidence-request/useGetAllEvidenceRequest';
import useUrlState from '@hooks/useUrlState';
import {
	evidenceRequests,
	evidenceRequestsFilters,
	filteredEvidenceRequests
} from '@store/evidence-request/evidenceRequestsFilter';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const useEvidenceRequests = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		minDueDate: string | undefined;
		maxDueDate: string | undefined;
		minCompDate: string | undefined;
		maxCompDate: string | undefined;
		status: string[];
		creator: string[];
		q: string | undefined;
		currentStepOrder: number[] | undefined;
		currentStepType: string[] | undefined;
		tab: number | undefined;
		application: string[];
		workflowType: string[];
	}>({
		minDueDate: undefined,
		maxDueDate: undefined,
		minCompDate: undefined,
		maxCompDate: undefined,
		status: [],
		creator: [],
		q: undefined,
		currentStepOrder: [],
		currentStepType: [],
		tab: undefined,
		application: [],
		workflowType: []
	});
	const [filters, setFilters] = useRecoilState(evidenceRequestsFilters);
	const setReqs = useSetRecoilState(evidenceRequests);
	const {
		status,
		maxCompDate,
		minCompDate,
		minDueDate,
		maxDueDate,
		requests,
		creator,
		currentStepOrder,
		currentStepType,
		application,
		workflowType
	} = useRecoilValue(filteredEvidenceRequests);
	const { data = new Map() } = useGetAllEvidenceRequest();

	useEffect(() => {
		setReqs([...data.values()]);
	}, [data, setReqs]);

	useEffect(() => {
		setFilters({
			minDueDate: urlFilters.minDueDate,
			maxDueDate: urlFilters.maxDueDate,
			minCompDate: urlFilters.minCompDate,
			maxCompDate: urlFilters.maxCompDate,
			status: urlFilters.status || [],
			creator: urlFilters.creator || [],
			query: urlFilters.q,
			currentStepOrder: urlFilters.currentStepOrder || [],
			currentStepType: urlFilters.currentStepType || [],
			tab: urlFilters.tab,
			application: urlFilters.application || [],
			workflowType: urlFilters.workflowType || []
		});
	}, [urlFilters, setFilters]);

	const filtersAvailable = {
		minDueDate,
		maxDueDate,
		minCompDate,
		maxCompDate,
		status,
		requests,
		creator,
		currentStepOrder,
		currentStepType,
		application,
		workflowType
	};
	return { requests, filtersAvailable, filters, setFilters: setUrlFilters };
};

export default useEvidenceRequests;
