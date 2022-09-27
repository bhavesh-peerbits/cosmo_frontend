import { Grid, TableToolbarSearch } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import CosmoTable, { HeaderFunction } from '@components/table/CosmoTable';
import useManagementApps from '@hooks/management/useManagementApps';
import Application from 'model/Application';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const ApplicationsSelectionContainer = () => {
	const { t } = useTranslation(['evidenceRequest', 'management']);
	const { apps } = useManagementApps();
	const { filters, setFilters } = useManagementApps();

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
					data={apps}
					createHeaders={columns}
					noDataMessage={t('management:no-applications')}
					toolbar={{ toolbarContent }}
					isSelectable
					level={2}
				/>
			</FullWidthColumn>
		</Grid>
	);
};
export default ApplicationsSelectionContainer;
