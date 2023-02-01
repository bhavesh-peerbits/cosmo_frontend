import { useTranslation } from 'react-i18next';
import User from '@model/User';
import { Layer } from '@carbon/react';
import CosmoTable from '@components/table/CosmoTable';
import { useMemo, useState } from 'react';
import useRoleAssignmentUsers from '@hooks/admin-panel/useRoleAssignmentUsers';
import SetUserStatusModal from '@components/Modals/SetUserStatusModal';
import EditUserModal from '@components/Modals/EditUserModal';
import { ColumnDef } from '@tanstack/react-table';

const UsersTable = () => {
	const { t } = useTranslation('userAdmin');
	const { t: tTable } = useTranslation('table');
	const { users } = useRoleAssignmentUsers();
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
				sortUndefined: 1,
				meta: { filter: { enabled: false } }
			},
			{
				id: 'name',
				accessorFn: row => row.name,
				header: t('name'),
				sortUndefined: 1,
				meta: { filter: { enabled: false } }
			},
			{
				id: 'surname',
				accessorFn: row => row.surname,
				header: t('surname'),
				meta: { filter: { enabled: false } }
			},
			{
				id: 'email',
				accessorFn: row => row.email,
				header: 'Email',
				meta: { filter: { enabled: false } }
			},
			{
				id: 'role',
				accessorFn: row => row.principalRole,
				header: t('role'),
				cell: info => info.getValue() || '-',
				meta: {
					filter: {
						type: 'multiselect',
						label: t('role')
					}
				}
			},
			{
				id: 'status',
				accessorFn: row => (row.inactive ? t('blocked') : t('active')),
				header: t('status'),

				meta: {
					exportableFn: info => ((info as string) ? t('blocked') : t('active')),
					filter: {
						type: 'checkbox',
						label: t('status')
					}
				}
			}
		],
		[t]
	);

	return (
		<Layer>
			{isModalOpen && modalToOpen()}
			<CosmoTable
				tableId='userstable'
				inlineActions={[
					{
						label: t('edit'),
						onClick: data => {
							setIsModalOpen(true);
							setActionSelected('edit');
							setUser(data.original);
						},
						disabled: data =>
							data.original.inactive || data.original.roles.includes('SYS_ADMIN')
					},
					{
						isDelete: data => !data.original.inactive,
						conditionalLabel: data => t(data.original.inactive ? 'unblock' : 'block'),
						onClick: data => {
							setIsModalOpen(true);
							setActionSelected('Block');
							setUser(data.original);
						},
						disabled: data => data.original.roles.includes('SYS_ADMIN')
					}
				]}
				data={users}
				columns={columns}
				isColumnOrderingEnabled
				noDataMessage={tTable('no-data')}
				toolbar={{
					searchBar: true,
					toolbarBatchActions: [],
					toolbarTableMenus: []
				}}
				exportFileName={({ all }) => (all ? 'users-all' : 'users-selection')}
			/>
		</Layer>
	);
};

export default UsersTable;
