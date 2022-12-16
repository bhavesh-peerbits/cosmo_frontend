import useGetApplicationChanges from '@api/management/useGetApplicationChanges';
import ApplicationAudit from '@model/ApplicationAudit';
import { formatDate } from '@i18n';
import { useTranslation } from 'react-i18next';
import CosmoTable from '../table/CosmoTable';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

interface ApplicationChangesTableProps {
	appId: string;
}
const ApplicationChangesTable = ({ appId }: ApplicationChangesTableProps) => {
	const { t } = useTranslation('changes');
	const { data = [] } = useGetApplicationChanges(appId);

	const columns= useMemo<ColumnDef<ApplicationAudit>[]>( () => [
		{
			id: 'object-modified',
      accessorFn:row => row.objectModified,
			header: t('object-modified'),
			sortUndefined: 1
		},
		 {
			id: 'field-modified',
      accessorFn:row => row.field,
			header: t('field-modified')
		},
		 {
			id: 'user',
      accessorFn:row => row.userWhoChanged,
			header: t('user'),
			cell: info => info.getValue()?.displayName || '-',
			meta: {
				exportableFn: (info: { displayName: string }) => info.displayName
			},
			enableGlobalFilter: false
		},
		{
			id: 'modify-date',
      accessorFn:row => row.date,
			header: t('date'),
			cell: info => formatDate(info.getValue()),
			enableGlobalFilter: false
		},
		 {
			id: 'change',
      accessorFn:row => row.change,
			header: t('change'),
			enableGlobalFilter: false
		}
	];

	return (
		<CosmoTable
			data={data.filter(
				audit =>
					audit.action === 'MODIFY' &&
					audit.field !== 'Last Modifier' &&
					audit.field !== 'Last Modify'
			)}
			createHeaders={columns}
			noDataMessage={t('no-changes')}
			searchBarPlaceholder={t('search-changes-placeholder')}
		/>
	);
};
export default ApplicationChangesTable;
