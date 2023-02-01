import { Button, Layer } from '@carbon/react';
import { useMemo, useState } from 'react';
import User from '@model/User';
import { Add } from '@carbon/react/icons';
import useGetFilteredPagedUser from '@api/user-admin/useGetFilteredPagedUser';
import useGetAppsAdminNotMap from '@api/user-admin/useGetAppsAdminNotMap';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import CosmoTable from '@components/table/CosmoTable';
import { useTranslation } from 'react-i18next';
import SelectApplicationUser from './SelectApplicationUser';

type ActionCellProps = {
	setIsSelectOpen: (val: boolean) => void;
	setUserSelectedId: (val: string) => void;
	info: CellContext<User, unknown>;
};

const ActionsCell = ({ setIsSelectOpen, setUserSelectedId, info }: ActionCellProps) => {
	const { getValue } = info;
	return (
		<div className='float-right flex'>
			<Button
				hasIconOnly
				kind='ghost'
				renderIcon={Add}
				iconDescription='add'
				tooltipPosition='left'
				onClick={() => {
					setIsSelectOpen(true);
					setUserSelectedId(getValue() as string);
				}}
			/>
		</div>
	);
};

const UserAppsVisibilityTable = () => {
	const { t: tTable } = useTranslation('table');
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [userSelectedId, setUserSelectedId] = useState<string>();
	const { data: applications } = useGetAppsAdminNotMap();
	const { data: { content } = {} } = useGetFilteredPagedUser('userappvisibility');

	const columns = useMemo<ColumnDef<User>[]>(
		() => [
			{
				id: 'name',
				accessorFn: row => row.name,
				header: 'Name'
			},
			{
				id: 'surname',
				accessorFn: row => row.surname,
				header: 'Surname'
			},
			{
				id: 'username',
				accessorFn: row => row.username,
				header: 'Username'
			},
			{
				id: 'action',
				header: tTable('action'),
				accessorFn: row => row.id,
				enableColumnFilter: false,
				enableSorting: false,
				cell: info => ActionsCell({ setIsSelectOpen, setUserSelectedId, info }),
				meta: {
					disableExport: true
				}
			}
		],
		[tTable]
	);

	return (
		<Layer>
			{userSelectedId ? (
				<SelectApplicationUser
					userSelectedId={userSelectedId}
					setIsSelectOpen={setIsSelectOpen}
					isSelectOpen={isSelectOpen}
					applications={applications || []}
				/>
			) : null}

			<CosmoTable
				tableId='userappvisibility'
				data={content || []}
				columns={columns}
				serverSidePagination
				isColumnOrderingEnabled
				noDataMessage='no-data'
				exportFileName={({ all }) => (all ? 'users-all' : 'users-selection')}
				toolbar={{
					searchBar: true,
					toolbarBatchActions: [],
					toolbarTableMenus: []
				}}
			/>
		</Layer>
	);
};

export default UserAppsVisibilityTable;
