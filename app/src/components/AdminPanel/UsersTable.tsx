import { useTranslation } from 'react-i18next';
import User from '@model/User';
import { OverflowMenu, OverflowMenuItem } from '@carbon/react';
import CosmoTable from '@components/table/CosmoTable';
import { useMemo, useState } from 'react';
import useRoleAssignmentUsers from '@hooks/admin-panel/useRoleAssignmentUsers';
import SetUserStatusModal from '@components/Modals/SetUserStatusModal';
import EditUserModal from '@components/Modals/EditUserModal';
import { ColumnDef } from '@tanstack/react-table';

type ActionCellProps = {
	setIsModalOpen: (val: boolean) => void;
	setActionSelected: (val: string) => void;
	user: User | undefined;
	setUser: (val: User) => void;
};

const ActionsCell = ({
	setIsModalOpen,
	setActionSelected,
	user,
	setUser
}: ActionCellProps) => {
	const { t } = useTranslation('userAdmin');
	user && setUser(user);
	return (
		<OverflowMenu ariaLabel='Actions' iconDescription={t('actions')} direction='top'>
			<OverflowMenuItem
				itemText={t('edit')}
				onClick={() => {
					setIsModalOpen(true);
					setActionSelected('edit');
				}}
				disabled={user?.inactive || user?.roles.includes('SYS_ADMIN')}
			/>
			<OverflowMenuItem
				isDelete={!user?.inactive}
				itemText={t(user?.inactive ? 'unblock' : 'block')}
				onClick={() => {
					setIsModalOpen(true);
					setActionSelected('Block');
				}}
				disabled={user?.roles.includes('SYS_ADMIN')}
			/>
		</OverflowMenu>
	);
};

const UsersTable = () => {
	const { t } = useTranslation('userAdmin');
	const { t: tTable } = useTranslation('table');
	const { users, filters, setFilters } = useRoleAssignmentUsers();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [actionSelected, setActionSelected] = useState('');
	const [user, setUser] = useState<User>();

	const modalToOpen = () => {
		switch (actionSelected) {
			case 'Block':
				return (
					<SetUserStatusModal
						user={user}
						isOpen={isModalOpen}
						setIsOpen={setIsModalOpen}
					/>
				);
			default:
				return (
					<EditUserModal user={user} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
				);
		}
	};

	const columns = useMemo<ColumnDef<User>[]>(
		() => [
			{
				id: 'username',
				accessorFn: row => row.username,
				header: t('username'),
				sortUndefined: 1
			},
			{
				id: 'name',
				accessorFn: row => row.name,
				header: t('name'),
				sortUndefined: 1
			},
			{
				id: 'surname',
				accessorFn: row => row.surname,
				header: t('surname')
			},
			{
				id: 'email',
				accessorFn: row => row.email,
				header: 'Email'
			},
			{
				id: 'role',
				accessorFn: row => row.principalRole,
				header: t('role'),
				cell: info => info.getValue() || '-'
			},
			{
				id: 'status',
				accessorFn: row => row.inactive,
				header: t('status'),
				cell: info => (info.getValue() ? t('blocked') : t('active')),
				meta: {
					exportableFn: (info: string) => (info ? t('blocked') : t('active'))
				}
			},
			{
				id: `action`,
				header: tTable('action'),
				accessorFn: row => row,
				enableGrouping: false,
				cell: () => ActionsCell({ setIsModalOpen, setActionSelected, user, setUser })
			}
		],
		[t, tTable, user]
	);

	return (
		<>
			{isModalOpen && modalToOpen()}
			<CosmoTable
				tableId='userstable'
				data={users}
				columns={columns}
				noDataMessage={tTable('no-data')}
				toolbar={{
					searchBar: {
						enabled: true,
						value: filters.query ?? '',
						onSearch: e => setFilters({ q: e })
					},
					toolbarBatchActions: [],
					toolbarTableMenus: []
				}}
				exportFileName={({ all }) => (all ? 'users-all' : 'users-selection')}
			/>
		</>
	);
};

export default UsersTable;
