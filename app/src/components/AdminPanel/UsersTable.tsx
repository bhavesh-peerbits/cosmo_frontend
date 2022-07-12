import { useTranslation } from 'react-i18next';
import User from '@model/User';
import { OverflowMenu, OverflowMenuItem, TableToolbarSearch } from '@carbon/react';
import { HeaderFunction } from '@components/table/CosmoTable';
import { useCallback } from 'react';
import useGetUsers from '@api/user/useGetUsers';
import CosmoTableInlineAction from '@components/table/CosmoTableInlineAction';

const ActionsCell = () => {
	const { t } = useTranslation('userAdmin');
	return (
		<OverflowMenu ariaLabel='Actions' iconDescription={t('actions')}>
			<OverflowMenuItem itemText={t('edit')} />
			<OverflowMenuItem isDelete itemText={t('block')} />
		</OverflowMenu>
	);
};

const UsersTable = () => {
	const { t } = useTranslation('userAdmin');
	const { data: users = [] } = useGetUsers();

	const columns: HeaderFunction<User> = useCallback(
		table => [
			table.createDataColumn(row => row.name, {
				id: 'name',
				header: t('name'),
				sortUndefined: 1
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
				header: t('role')
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
		<CosmoTableInlineAction
			data={users}
			createHeaders={columns}
			noDataMessage='No Data'
			toolbar={{ toolbarContent }}
			exportFileName={({ all }) => (all ? 'users-all' : 'users-selection')}
			inlineAction={<ActionsCell />}
		/>
	);
};

export default UsersTable;
