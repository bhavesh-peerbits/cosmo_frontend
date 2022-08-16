import { TableToolbarSearch } from '@carbon/react';
import { HeaderFunction } from '@components/table/CosmoTable';
import GroupedCosmoTable from '@components/table/GroupedCosmoTable';
import useRevalidationsOngoing from '@hooks/user-revalidation/useRevalidationsOngoing';
import { formatDate } from '@i18n';
import Campaign from '@model/Campaign';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const RevalidationsTable = () => {
	const { t } = useTranslation(['userRevalidation', 'management']);
	const { revalidations, filters, setFilters } = useRevalidationsOngoing();

	const columns: HeaderFunction<Campaign> = useCallback(
		table => [
			table.createDataColumn(row => row.name, {
				id: 'name',
				header: t('userRevalidation:campaign-name'),
				sortUndefined: 1
			}),
			table.createDataColumn(row => row.dueDate, {
				id: 'due-date',
				header: t('userRevalidation:due-date'),
				cell: info => {
					const date = info.getValue();
					return date ? formatDate(date, 'short') : '-';
				}
			}),
			table.createDataColumn(row => row.layer, {
				id: 'layer',
				header: t('userRevalidation:layer')
			}),
			table.createDataColumn(row => row.type, {
				id: 'type',
				header: t('userRevalidation:revalidation-type')
			}),
			table.createDataColumn(row => row.applicationsCount, {
				id: 'applications-count',
				header: t('management:applications')
			}),
			table.createDataColumn(row => row.status, {
				id: 'status',
				header: t('userRevalidation:status')
			})
		],
		[t]
	);
	const toolbarContent = (
		<TableToolbarSearch
			size='lg'
			persistent
			placeholder={t('userRevalidation:search-placeholder')}
			id='search'
			value={filters.query ?? ''}
			onChange={e => setFilters({ q: e.currentTarget?.value })}
		/>
	);
	return (
		<GroupedCosmoTable
			data={revalidations}
			createHeaders={columns}
			toolbar={{ toolbarContent }}
		/>
	);
};
export default RevalidationsTable;
