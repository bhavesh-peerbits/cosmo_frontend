import { Button, Grid, TableToolbarSearch } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import CosmoTable, { HeaderFunction } from '@components/table/CosmoTable';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import { RowSelectionState } from '@tanstack/react-table';
import Application from 'model/Application';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

type ApplicationsSelectionContainerProps = {
	request: EvidenceRequestDraft;
	setCurrentStep: (val: number) => void;
	setRequestDraft: Dispatch<SetStateAction<EvidenceRequestDraft>>;
	apps: Application[];
};
const ApplicationsSelectionContainer = ({
	request,
	setCurrentStep,
	setRequestDraft,
	apps
}: ApplicationsSelectionContainerProps) => {
	const { t } = useTranslation(['evidenceRequest', 'management', 'modals']);
	const [filters, setFilters] = useState('');
	const [selectedRows, setSelectedRows] = useState<
		(Application | undefined)[] | undefined
	>();

	const selectedAppsIndex = useMemo(
		() =>
			request.requests
				?.filter(req => req.selected)
				.reduce((prev, curr) => {
					const index = apps?.findIndex(app => app?.id === curr?.application?.id);
					return { ...prev, [index as number]: true };
				}, {}),
		[request.requests, apps]
	);

	const columns: HeaderFunction<Application> = useCallback(
		table => [
			table.createDataColumn(row => row.name, {
				id: 'name',
				header: t('management:application-name')
			}),
			table.createDataColumn(row => row.codeName, {
				id: 'code',
				header: t('management:code')
			}),
			table.createDataColumn(row => row.owner, {
				id: 'owner',
				header: t('management:owner'),
				cell: info => info.getValue()?.displayName || '-'
			})
		],
		[t]
	);
	const toolbarContent = (
		<TableToolbarSearch
			size='lg'
			persistent
			placeholder={t('management:search-placeholder')}
			id='search'
			onChange={e => setFilters(e.currentTarget?.value)}
		/>
	);
	const handleNext = () => {
		const newRequests = request.requests?.map(req => {
			if (selectedRows?.find(app => app?.id === req.application?.id)) {
				return { ...req, selected: !req.selected };
			}
			return req;
		});
		if (selectedRows?.length) {
			setCurrentStep(1);
			setRequestDraft(old => ({
				...old,
				requests: newRequests
			}));
		}
	};

	return (
		<Grid fullWidth narrow className='space-y-5'>
			<FullWidthColumn>
				<FullWidthColumn className='text-heading-3'>
					<span>{t('evidenceRequest:apps-selection')}</span>
				</FullWidthColumn>
				<FullWidthColumn className='text-text-secondary text-body-long-1'>
					<span>Description to add</span>
				</FullWidthColumn>
			</FullWidthColumn>
			<FullWidthColumn>
				<CosmoTable
					data={
						filters
							? apps.filter(app => app.name.toLowerCase().includes(filters.toLowerCase()))
							: apps
					}
					createHeaders={columns}
					noDataMessage={t('management:no-applications')}
					toolbar={{ toolbarContent }}
					isSelectable
					level={2}
					setSelectedRows={setSelectedRows}
					selectedRows={selectedAppsIndex as RowSelectionState}
				/>
			</FullWidthColumn>
			<FullWidthColumn className='flex justify-end'>
				<Button size='md' disabled={!selectedRows?.length} onClick={handleNext}>
					{t('modals:next')}
				</Button>
			</FullWidthColumn>
		</Grid>
	);
};
export default ApplicationsSelectionContainer;
