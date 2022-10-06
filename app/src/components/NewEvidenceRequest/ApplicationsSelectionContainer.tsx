import { Grid, TableToolbarSearch } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import CosmoTable, { HeaderFunction } from '@components/table/CosmoTable';
import useManagementApps from '@hooks/management/useManagementApps';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import { RowSelectionState } from '@tanstack/react-table';
import Application from 'model/Application';
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useState
} from 'react';
import { useTranslation } from 'react-i18next';

type ApplicationsSelectionContainerProps = {
	request: EvidenceRequestDraft;
	setIsNextActive: (val: boolean) => void;
	setRequestDraft: Dispatch<SetStateAction<EvidenceRequestDraft>>;
};
const ApplicationsSelectionContainer = ({
	request,
	setIsNextActive,
	setRequestDraft
}: ApplicationsSelectionContainerProps) => {
	const { t } = useTranslation(['evidenceRequest', 'management']);
	// const { apps } = useManagementApps();
	const { filters, setFilters } = useManagementApps();
	const [selectedRows, setSelectedRows] = useState<
		(Application | undefined)[] | undefined
	>();
	const [apps, setApps] = useState<Application[] | undefined>([]);
	useEffect(
		() => setApps(request?.requests?.map(req => req.application as Application)),
		[request?.requests]
	); // TODO Remove when BE controls are ready

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
	useEffect(() => {
		const newRequests = request.requests?.map(req => {
			if (selectedRows?.find(app => app?.id === req.application?.id)) {
				return { ...req, selected: !req.selected };
			}
			return req;
		});
		setRequestDraft(old => ({
			...old,
			requests: newRequests
		}));
	}, [request.requests, selectedRows, setRequestDraft]);

	useEffect(() => {
		setIsNextActive((selectedRows && selectedRows.length > 0) || false);
	}, [selectedRows, setIsNextActive]);

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
			value={filters.query ?? ''}
			onChange={e => setFilters({ q: e.currentTarget?.value })}
		/>
	);

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
					data={apps || []}
					createHeaders={columns}
					noDataMessage={t('management:no-applications')}
					toolbar={{ toolbarContent }}
					isSelectable
					level={2}
					setSelectedRows={setSelectedRows}
					selectedRows={selectedAppsIndex as RowSelectionState}
				/>
			</FullWidthColumn>
		</Grid>
	);
};
export default ApplicationsSelectionContainer;
