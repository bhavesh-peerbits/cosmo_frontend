import { Button, Layer } from '@carbon/react';
import { Suspense, useMemo, useState } from 'react';
import User from '@model/User';
import { Add } from '@carbon/react/icons';
import useGetAppsAdminNotMap from '@api/user-admin/useGetAppsAdminNotMap';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import CosmoTable from '@components/table/CosmoTable';
import { useTranslation } from 'react-i18next';
import useGetAllAnalystAndAdminUsers from '@api/user-admin/useGetAllAnalystAndAdminUsers';
import SelectApplicationUser from '../Modals/SelectApplicationUser';

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
	const { data: content } = useGetAllAnalystAndAdminUsers();

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
					disableExport: true,
					filter: { enabled: false }
				}
			}
		],
		[tTable]
	);

	return (
		<Layer>
			{userSelectedId ? (
				<Suspense>
					<SelectApplicationUser
						userSelectedId={userSelectedId}
						setIsSelectOpen={setIsSelectOpen}
						isSelectOpen={isSelectOpen}
						applications={applications || []}
					/>
				</Suspense>
			) : null}

			<CosmoTable
				tableId='userappvisibility'
				data={content || []}
				columns={columns}
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
