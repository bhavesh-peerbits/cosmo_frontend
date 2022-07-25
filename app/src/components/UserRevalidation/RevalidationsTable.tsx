import CosmoTable, { HeaderFunction } from '@components/table/CosmoTable';
import { formatDate } from '@i18n';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type Campaign = {
	id: string;
	name: string;
	layer?: string;
	type?: string;
	dueDate?: Date;
	startDate?: Date;
	application?: string;
	status?: string;
};
const RevalidationsTable = () => {
	const { t } = useTranslation('userRevalidation');
	const campaigns = [
		{
			id: 'id1',
			name: 'Very Very Very Very Very long Name',
			type: 'SUID',
			layer: 'OS',
			dueDate: new Date(),
			startDate: new Date(),
			status: 'ongoing',
			application: 'Application Name'
		},
		{
			id: 'id2',
			name: 'Campaign Name',
			type: 'User Access Review',
			layer: 'DB',
			dueDate: new Date(),
			startDate: new Date(),
			status: 'ongoing',
			application: 'Application Very Very Very Very Very Very Very Very Very Very Name'
		},
		{
			id: 'id3',
			name: 'Very Very Very Very Very long Name',
			type: 'User Access Review',
			layer: 'OS',
			dueDate: new Date(),
			startDate: new Date(),
			status: 'ongoing',
			application: 'Application Name'
		},
		{
			id: 'id4',
			name: 'Campaign Name',
			type: 'Firefight',
			layer: 'Software',
			dueDate: new Date(),
			startDate: new Date(),
			status: 'ongoing',
			application: 'Application Name'
		}
	];
	const columns: HeaderFunction<Campaign> = useCallback(
		table => [
			table.createDataColumn(row => row.name, {
				id: 'name',
				header: t('campaign-name'),
				sortUndefined: 1
			}),
			table.createDataColumn(row => row.dueDate, {
				id: 'due-date',
				header: 'Due Date',
				cell: info => {
					const date = info.getValue();
					return date ? formatDate(date, 'short') : '-';
				}
			}),
			table.createDataColumn(row => row.layer, {
				id: 'layer',
				header: t('layer')
			}),
			table.createDataColumn(row => row.type, {
				id: 'type',
				header: t('revalidation-type')
			}),
			table.createDataColumn(row => row.application, {
				id: 'application',
				header: 'app'
			}),
			table.createDataColumn(row => row.status, {
				id: 'role',
				header: 'status'
			})
		],
		[t]
	);
	return <CosmoTable data={campaigns} createHeaders={columns} />;
};
export default RevalidationsTable;
