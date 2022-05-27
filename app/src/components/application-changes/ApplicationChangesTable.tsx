import useGetApplicationChanges from '@api/management/useGetApplicationChanges';
import ApplicationAudit from '@model/ApplicationAudit';
import { formatDate } from '@i18n';
import CosmoTable, { HeaderFunction } from '../table/CosmoTable';

interface ApplicationChangesTableProps {
	appId: string;
}
const ApplicationChangesTable = ({ appId }: ApplicationChangesTableProps) => {
	const { data = [] } = useGetApplicationChanges(appId);

	const columns: HeaderFunction<ApplicationAudit> = table => [
		table.createDataColumn(row => row.objectModified, {
			id: 'object-modified',
			header: 'Object Modified',
			sortUndefined: 1
		}),
		table.createDataColumn(row => row.field, {
			id: 'field-modified',
			header: 'Field Modified'
		}),
		table.createDataColumn(row => row.change, {
			id: 'change',
			header: 'Change'
		}),
		table.createDataColumn(row => row.userWhoChanged, {
			id: 'user',
			header: 'User',
			cell: info => info.getValue()?.displayName || '-',
			meta: {
				exportableFn: (info: { displayName: string }) => info.displayName
			}
		}),
		table.createDataColumn(row => row.date, {
			id: 'modify-date',
			header: 'Modify Date',
			cell: info => formatDate(info.getValue())
		})
	];

	return <CosmoTable data={data} createHeaders={columns} noDataMessage='No Changes' />;
};
export default ApplicationChangesTable;
