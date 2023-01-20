import useGetApplicationChanges from '@api/management/useGetApplicationChanges';
import ApplicationAudit from '@model/ApplicationAudit';
import { formatDate } from '@i18n';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import StringDashCell from '@components/table/Cell/StringDashCell';
import CosmoTable from '../table/CosmoTable';

interface ApplicationChangesTableProps {
	appId: string;
}
const ApplicationChangesTable = ({ appId }: ApplicationChangesTableProps) => {
	const { t } = useTranslation('changes');
	const { data = [] } = useGetApplicationChanges(appId);

	const columns = useMemo<ColumnDef<ApplicationAudit>[]>(
		() => [
			{
				id: 'object-modified',
				accessorFn: row => row.objectModified,
				header: t('object-modified'),
				sortUndefined: 1
			},
			{
				id: 'field-modified',
				accessorFn: row => row.field,
				header: t('field-modified')
			},
			{
				id: 'user',
				accessorFn: row => row.userWhoChanged.displayName,
				header: t('user'),
				cell: StringDashCell,
				enableGlobalFilter: false
			},
			{
				id: 'modify-date',
				accessorFn: row => formatDate(row.date),
				header: t('date'),
				enableGlobalFilter: false
			},
			{
				id: 'change',
				accessorFn: row => row.change,
				header: t('change'),
				enableGlobalFilter: false
			}
		],
		[t]
	);

	return (
		<CosmoTable
			tableId='AppChangesTable'
			data={data.filter(
				audit =>
					audit.action === 'MODIFY' &&
					audit.field !== 'Last Modifier' &&
					audit.field !== 'Last Modify'
			)}
			columns={columns}
			noDataMessage={t('no-changes')}
			isColumnOrderingEnabled
			toolbar={{
				searchBar: true,
				toolbarBatchActions: [],
				toolbarTableMenus: []
			}}
		/>
	);
};
export default ApplicationChangesTable;
