import { TableToolbarSearch } from '@carbon/react';
import CosmoTable, { HeaderFunction } from '@components/table/CosmoTable';
import { useCallback, useEffect, useState } from 'react';
import User, { fromUserApi } from '@model/User';
import { useQueryClient } from 'react-query';
import api from '@api';

// type ActionCellProps = {
// 	setIsSelectOpen: (val: boolean) => void;
// };

// const ActionsCell = ({ setIsSelectOpen }: ActionCellProps) => {
// 	const { t } = useTranslation('userSelect');
// 	return (
// 		<Button
// 			hasIconOnly
// 			kind='ghost'
// 			renderIcon={UserFollow}
// 			iconDescription={t('add-user')}
// 			tooltipPosition='left'
// 			onClick={() => setIsSelectOpen(true)}
// 		/>
// 	);
// };

const UserAppsVisibilityTable = () => {
	const queryClient = useQueryClient();
	const [filters, setFilters] = useState('');
	const [users, setUsers] = useState<User[]>();

	useEffect(() => {
		queryClient.fetchQuery({
			queryKey: ['paged-user'],
			queryFn: () =>
				api.userAdminApi
					.getFilteredUser({
						page: 0,
						size: 10,
						searchField: filters.length <= 3 ? '__none' : filters
					})
					.then(({ data }) => setUsers([...data].map(fromUserApi)))
		});
	}, [filters, queryClient]);

	const columns: HeaderFunction<User> = useCallback(
		table => [
			table.createDataColumn(row => row.name, {
				id: 'name',
				header: 'application-name',
				sortUndefined: 1
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
			onChange={e => setFilters(e.currentTarget?.value)}
		/>
	);

	return (
		<CosmoTable
			data={users || []}
			createHeaders={columns}
			noDataMessage='no-data'
			toolbar={{ toolbarContent }}
			exportFileName={({ all }) => (all ? 'applications-all' : 'applications-selection')}
		/>
	);
};

export default UserAppsVisibilityTable;
