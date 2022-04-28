import { CellProps, Column } from 'react-table';
import { useMemo } from 'react';
import useManagementApps from '@hooks/management/useManagementApps';
import { useTranslation } from 'react-i18next';
import Application from '@model/Application';
import { CloudDownload, Email, TrashCan } from '@carbon/react/icons';
import { TableToolbarSearch } from '@carbon/react';
import CosmoTable from '@components/CosmoTable';
import IconResolver from '@components/IconResolver';

const ApplicationIconCell = ({ value, row }: CellProps<Application, string>) => {
	return (
		<div className='flex items-center space-x-3'>
			<div>
				<IconResolver icon={row.original.icon} />
			</div>
			<p>{value}</p>
		</div>
	);
};

const ApplicationsTable = () => {
	const { t } = useTranslation('management');
	const { apps } = useManagementApps();
	const { filters, setFilters } = useManagementApps();

	const columns: Column<Application>[] = useMemo(
		() => [
			{ accessor: 'name', Header: t('application-name'), Cell: ApplicationIconCell },
			{ accessor: 'description', Header: t('description') },
			{ accessor: 'owner', Header: t('owner') },
			{ accessor: 'code', Header: t('code') }
			// { accessor: 'lastReview', Header: t('last-review') },
			// { accessor: 'lastModify', Header: t('last-modify') }
		],
		[t]
	);

	const toolbarBatchActions = [
		{ id: 'email', icon: Email, onClick: () => {}, label: t('email') },
		{ id: 'cloud', icon: CloudDownload, onClick: () => {}, label: t('download') },
		{ id: 'trash', icon: TrashCan, onClick: () => {}, label: t('delete') }
	];

	const toolbarContent = (
		<TableToolbarSearch
			size='lg'
			placeholder={t('search-placeholder')}
			persistent
			id='search'
			value={filters.query ?? ''}
			onChange={e => setFilters({ q: e.currentTarget?.value })}
		/>
	);

	return (
		<CosmoTable
			data={apps}
			columns={columns}
			noDataMessage={t('no-applications')}
			toolbar={{ toolbarContent, toolbarBatchActions }}
		/>
	);
};

export default ApplicationsTable;
