import { TableToolbarSearch, Button } from '@carbon/react';
import { HeaderFunction } from '@components/table/CosmoTable';
import { useCallback, useState } from 'react';
import User from '@model/User';
import { Add } from '@carbon/react/icons';
import CosmoTableInlineAction from '@components/table/CosmoTableInlineAction';
import { useDebounce } from 'ahooks';
import useGetFilteredPagedUser from '@api/user-admin/useGetFilteredPagedUser';
import usePaginationStore from '@hooks/pagination/usePaginationStore';
import SelectApplicationUser from './SelectApplicationUser';

type ActionCellProps = {
	setIsSelectOpen: (val: boolean) => void;
};

const ActionsCell = ({ setIsSelectOpen }: ActionCellProps) => {
	return (
		<Button
			hasIconOnly
			kind='ghost'
			renderIcon={Add}
			iconDescription='add'
			tooltipPosition='left'
			onClick={() => setIsSelectOpen(true)}
		/>
	);
};

const UserAppsVisibilityTable = () => {
	const [filters, setFilters] = useState('');
	const search = useDebounce(filters, { wait: 600 });
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [userSelectedId, setUserSelectedId] = useState<string>();
	const { pagination } = usePaginationStore('userappvisibility');
	const { data: { content, totalElements } = {} } = useGetFilteredPagedUser(
		search,
		pagination.pageIndex,
		pagination.pageSize
	);

	const columns: HeaderFunction<User> = useCallback(
		table => [
			table.createDataColumn(row => row.name, {
				id: 'name',
				header: 'Name'
			}),
			table.createDataColumn(row => row.surname, {
				id: 'surname',
				header: 'surname'
			}),
			table.createDataColumn(row => row.username, {
				id: 'username',
				header: 'username'
			})
		],
		[]
	);
	const toolbarContent = (
		<TableToolbarSearch
			size='lg'
			persistent
			placeholder='search-placeholder'
			id='search'
			value={filters ?? ''}
			onChange={e => {
				e.currentTarget?.value ? setFilters(e.currentTarget?.value) : setFilters('');
			}}
		/>
	);

	return (
		<>
			{userSelectedId ? (
				<SelectApplicationUser
					appSelectedId={userSelectedId}
					setIsSelectOpen={setIsSelectOpen}
					isSelectOpen={isSelectOpen}
				/>
			) : null}

			<CosmoTableInlineAction
				tableId='userappvisibility'
				dataLength={totalElements}
				data={content || []}
				createHeaders={columns}
				noDataMessage='no-data'
				toolbar={{ toolbarContent }}
				exportFileName={({ all }) =>
					all ? 'applications-all' : 'applications-selection'
				}
				inlineAction={<ActionsCell setIsSelectOpen={setIsSelectOpen} />}
				setRowSelected={setUserSelectedId}
			/>
		</>
	);
};

export default UserAppsVisibilityTable;
