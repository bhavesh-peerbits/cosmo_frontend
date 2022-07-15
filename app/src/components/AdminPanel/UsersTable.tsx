import { useTranslation } from 'react-i18next';
import User from '@model/User';
import { OverflowMenu, OverflowMenuItem, TableToolbarSearch } from '@carbon/react';
import { HeaderFunction } from '@components/table/CosmoTable';
import { useCallback, useState } from 'react';
import CosmoTableInlineAction from '@components/table/CosmoTableInlineAction';
import useRoleAssignmentUsers from '@hooks/admin-panel/useRoleAssignmentUsers';
import BlockUserModal from '@components/Modals/BlockUserModal';
import EditUserModal from '@components/Modals/EditUserModal';

type ActionCellProps = {
	setIsModalOpen: (val: boolean) => void;
	setActionSelected: (val: string) => void;
};

const ActionsCell = ({ setIsModalOpen, setActionSelected }: ActionCellProps) => {
	const { t } = useTranslation('userAdmin');
	return (
		<OverflowMenu ariaLabel='Actions' iconDescription={t('actions')}>
			<OverflowMenuItem
				itemText={t('edit')}
				onClick={() => {
					setIsModalOpen(true);
					setActionSelected('edit');
				}}
			/>
			<OverflowMenuItem
				isDelete
				itemText={t('block')}
				onClick={() => {
					setIsModalOpen(true);
					setActionSelected('Block');
				}}
			/>
		</OverflowMenu>
	);
};

const UsersTable = () => {
	const { t: tUserAdmin } = useTranslation('userAdmin');
	const { t: tTable } = useTranslation('table');
	const { users, filters, setFilters } = useRoleAssignmentUsers();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userSelected, setUserSelected] = useState<string[]>([]);
	const [actionSelected, setActionSelected] = useState('');

	const modalToOpen = () => {
		switch (actionSelected) {
			case 'Block':
				return (
					<BlockUserModal
						user={userSelected}
						isOpen={isModalOpen}
						setIsOpen={setIsModalOpen}
					/>
				);
			default:
				return (
					<EditUserModal
						user={userSelected}
						isOpen={isModalOpen}
						setIsOpen={setIsModalOpen}
					/>
				);
		}
	};

	const columns: HeaderFunction<User> = useCallback(
		table => [
			table.createDataColumn(row => row.name, {
				id: 'name',
				header: tUserAdmin('name'),
				sortUndefined: 1
			}),
			table.createDataColumn(row => row.surname, {
				id: 'surname',
				header: tUserAdmin('surname')
			}),
			table.createDataColumn(row => row.email, {
				id: 'email',
				header: 'Email'
			}),
			table.createDataColumn(row => row.principalRole, {
				id: 'role',
				header: tUserAdmin('role')
			})
		],
		[tUserAdmin]
	);

	const toolbarContent = (
		<TableToolbarSearch
			size='lg'
			persistent
			placeholder={tUserAdmin('search-placeholder')}
			id='search'
			value={filters.query ?? ''}
			onChange={e => setFilters({ q: e.currentTarget?.value })}
		/>
	);

	return (
		<>
			{isModalOpen && modalToOpen()}
			<CosmoTableInlineAction
				data={users}
				createHeaders={columns}
				noDataMessage={tTable('no-data')}
				toolbar={{ toolbarContent }}
				exportFileName={({ all }) => (all ? 'users-all' : 'users-selection')}
				inlineAction={
					<ActionsCell
						setActionSelected={setActionSelected}
						setIsModalOpen={setIsModalOpen}
					/>
				}
				setRowSelected={setUserSelected}
				isGroupable
			/>
		</>
	);
};

export default UsersTable;
