import { Button } from '@carbon/react';
import { useMemo, useState } from 'react';
import User from '@model/User';
import { Add } from '@carbon/react/icons';
import { useDebounce } from 'ahooks';
import useGetFilteredPagedUser from '@api/user-admin/useGetFilteredPagedUser';
import usePaginationStore from '@hooks/pagination/usePaginationStore';
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
	const [filters, setFilters] = useState('');
	const { t: tTable } = useTranslation('table');
	const search = useDebounce(filters, { wait: 600 });
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [userSelectedId, setUserSelectedId] = useState<string>();
	const { pagination } = usePaginationStore('userappvisibility');
	const { data: applications } = useGetAppsAdminNotMap();
	const { data: { content, totalElements } = {} } = useGetFilteredPagedUser(
		search,
		pagination.pageIndex,
		pagination.pageSize
	);

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
				header: 'surname'
			},
			{
				id: 'username',
				accessorFn: row => row.username,
				header: 'username'
			},
			{
				id: 'action',
				header: tTable('action'),
				accessorFn: row => row.id,
				cell: info => ActionsCell({ setIsSelectOpen, setUserSelectedId, info }),
				meta: {
					disableExport: true
				}
			}
		],
		[tTable]
	);

	return (
		<>
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
				dataLength={totalElements}
				columns={columns}
				noDataMessage='no-data'
				exportFileName={({ all }) => (all ? 'users-all' : 'users-selection')}
				toolbar={{
					searchBar: {
						enabled: true,
						value: filters ?? '',
						onSearch: e => setFilters(e)
					},
					toolbarBatchActions: [],
					toolbarTableMenus: []
				}}
			/>
		</>
	);
};

export default UserAppsVisibilityTable;
