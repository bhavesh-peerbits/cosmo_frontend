import useGetApplicationChanges from '@api/management/useGetApplicationChanges';
import ApplicationAudit from '@model/ApplicationAudit';
import { formatDate } from '@i18n';
import { useTranslation } from 'react-i18next';
import CosmoTable, { HeaderFunction } from '../table/CosmoTable';

interface ApplicationChangesTableProps {
	appId: string;
}
const ApplicationChangesTable = ({ appId }: ApplicationChangesTableProps) => {
	const { t } = useTranslation('changes');
	const { data = [] } = useGetApplicationChanges(appId);

	const columns: HeaderFunction<ApplicationAudit> = table => [
		table.createDataColumn(row => row.objectModified, {
			id: 'object-modified',
			header: t('object-modified'),
			sortUndefined: 1
		}),
		table.createDataColumn(row => row.field, {
			id: 'field-modified',
			header: t('field-modified')
		}),
		table.createDataColumn(row => row.change, {
			id: 'change',
			header: t('change')
		}),
		table.createDataColumn(row => row.userWhoChanged, {
			id: 'user',
			header: t('user'),
			cell: info => info.getValue()?.displayName || '-',
			meta: {
				exportableFn: (info: { displayName: string }) => info.displayName
			}
		}),
		table.createDataColumn(row => row.date, {
			id: 'modify-date',
			header: t('date'),
			cell: info => formatDate(info.getValue())
		})
	];

	return (
		<CosmoTable data={data} createHeaders={columns} noDataMessage={t('no-changes')} />
	);
};
export default ApplicationChangesTable;
