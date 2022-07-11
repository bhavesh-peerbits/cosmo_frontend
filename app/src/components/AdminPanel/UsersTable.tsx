import { useTranslation } from 'react-i18next';
import User from '@model/User';
import { OverflowMenu, OverflowMenuItem, TableToolbarSearch } from '@carbon/react';
import CosmoTable, { HeaderFunction } from '@components/table/CosmoTable';
import { useCallback } from 'react';
import useGetUsers from '@api/user/useGetUsers';

const ActionsCell = () => {
	const { t } = useTranslation('userAdmin');
	return (
		<div className='flex items-center space-x-3'>
			<div>
				<OverflowMenu ariaLabel='Actions' iconDescription={t('actions')}>
					<OverflowMenuItem itemText={t('edit')} />
					<OverflowMenuItem isDelete itemText={t('block')} />
				</OverflowMenu>
			</div>
		</div>
	);
};

const ApplicationsTable = () => {
	const { t } = useTranslation('userAdmin');
	const { data: users = [] } = useGetUsers();

	const columns: HeaderFunction<User> = useCallback(
		table => [
			table.createDataColumn(row => row.name, {
				id: 'name',
				header: t('name'),
				cell: info => info.getValue()
			}),
			table.createDataColumn(row => row.surname, {
				id: 'surname',
				header: t('surname')
			}),
			table.createDataColumn(row => row.email, {
				id: 'email',
				header: 'Email'
			}),
			table.createDataColumn(row => row.principalRole, {
				id: 'role',
				header: t('role'),
				sortUndefined: 1
			}),
			table.createDataColumn(
				() => {
					('');
				},
				{
					id: 'actions',
					cell: ActionsCell,
					header: ''
				}
			)
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
		<div>
			<CosmoTable
				data={users}
				createHeaders={columns}
				noDataMessage='No Data'
				toolbar={{ toolbarContent }}
				exportFileName={({ all }) => (all ? 'users-all' : 'users-selection')}
			/>
		</div>
	);
};

export default ApplicationsTable;
