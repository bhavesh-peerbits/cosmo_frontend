/* eslint-disable prettier/prettier */
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
	documentTemplates,
	documentTemplatesFilter,
	filteredDocumentTemplates
} from '@store/document-templates/documentTemplatesFilters';
import { useEffect } from 'react';
import useUrlState from '@hooks/useUrlState';
import useGetAllTemplates from '@api/document-templates/useGetAllTemplates';

const useDocumentTemplates = () => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		type: string[];
		allowChanges: boolean | undefined;
		approvalSteps: number | undefined;
		totalChapters: number | undefined;
		usages: number | undefined;
		createdOnFrom: string | undefined;
		createdOnTo: string | undefined;
		isTile: boolean;
		q: string | undefined;
	}>({
		type: [],
		allowChanges: undefined,
		approvalSteps: undefined,
		totalChapters: undefined,
		usages: undefined,
		createdOnFrom: undefined,
		createdOnTo: undefined,
		isTile: true,
		q: undefined
	});
	const [filters, setFilters] = useRecoilState(documentTemplatesFilter);
	const setTemplates = useSetRecoilState(documentTemplates);
	const {
		templates,
		type,
		allowChanges,
		approvalSteps,
		totalChapters,
		usages,
		createdOnFrom,
		createdOnTo,
		isTile,
		q
	} = useRecoilValue(filteredDocumentTemplates);

	const { data = new Map() } = useGetAllTemplates();
	useEffect(() => {
		setTemplates([...data.values()]);
	}, [data, setTemplates]);

	useEffect(
		() =>
			setFilters({
				type: urlFilters.type ?? [],
				allowChanges: urlFilters.allowChanges,
				approvalSteps: urlFilters.approvalSteps,
				totalChapters: urlFilters.totalChapters,
				usages: urlFilters.usages,
				createdOnFrom: urlFilters.createdOnFrom,
				createdOnTo: urlFilters.createdOnTo,
				isTile: urlFilters.isTile,
				q: urlFilters.q
			}),
		[urlFilters, setFilters]
	);

	const filtersAvailable = {
		type,
		allowChanges,
		approvalSteps,
		totalChapters,
		usages,
		createdOnFrom,
		createdOnTo,
		isTile,
		q
	};
	return { templates, filtersAvailable, filters, setFilters: setUrlFilters };
};

export default useDocumentTemplates;
