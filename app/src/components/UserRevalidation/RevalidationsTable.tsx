import { TableToolbarSearch } from '@carbon/react';
import { HeaderFunction } from '@components/table/CosmoTable';
import GroupedCosmoTable from '@components/table/GroupedCosmoTable';
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
			status: 'Ongoing',
			application: 'Application Name'
		},
		{
			id: 'id2',
			name: 'Campaign Name',
			type: 'User Access Review',
			layer: 'DB',
			dueDate: new Date(),
			startDate: new Date(),
			status: 'Ongoing',
			application: 'Application Very Very Very Very Very Very Very Very Very Very Name'
		},
		{
			id: 'id3',
			name: 'Campaign Name1',
			type: 'User Access Review',
			layer: 'OS',
			dueDate: new Date(),
			startDate: new Date(),
			status: 'Ongoing',
			application: 'Application Name1'
		},
		{
			id: 'id4',
			name: 'Campaign Name1',
			type: 'Firefight',
			layer: 'Software',
			dueDate: new Date(),
			startDate: new Date(),
			status: 'Ongoing',
			application: 'Application Name2'
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
				header: t('due-date'),
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
				header: t('application')
			}),
			table.createDataColumn(row => row.status, {
				id: 'status',
				header: t('status')
			})
		],
		[t]
	);
	const toolbarContent = (
		<TableToolbarSearch
			size='lg'
			persistent
			placeholder={t('search-placeholder')}
			id='search'
		/>
	);
	return (
		<GroupedCosmoTable
			data={campaigns}
			createHeaders={columns}
			toolbar={{ toolbarContent }}
		/>
	);
};
export default RevalidationsTable;
