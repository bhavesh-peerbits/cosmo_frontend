import { useTranslation } from 'react-i18next';
import { Button, TableToolbarSearch } from '@carbon/react';
import { HeaderFunction } from '@components/table/CosmoTable';
import { useCallback, useState } from 'react';
import CosmoTableInlineAction from '@components/table/CosmoTableInlineAction';
import Application from '@model/Application';
import { UserFollow } from '@carbon/react/icons';
import useVisibilityApps from '@hooks/admin-panel/useVisibilityApps';
import MultiAddSelect from '@components/MultiAddSelect';
import useGetUsers from '@api/user/useGetUsers';
import User from '@model/User';

type ActionCellProps = {
	setIsSelectOpen: (val: boolean) => void;
};
const ActionsCell = ({ setIsSelectOpen }: ActionCellProps) => {
	const { t } = useTranslation('userSelect');
	return (
		<Button
			hasIconOnly
			kind='ghost'
			renderIcon={UserFollow}
			iconDescription={t('add-user')}
			tooltipPosition='left'
			onClick={() => setIsSelectOpen(true)}
		/>
	);
};

const AppsVisibilityTable = () => {
	const { t } = useTranslation('management');
	const { t: tSelect } = useTranslation('userSelect');
	const { t: tTable } = useTranslation('table');
	const { t: tProc } = useTranslation('procedureInfo');
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [, setUserSelected] = useState<string[]>([]);
	const { apps, filters, setFilters } = useVisibilityApps();
	const { data: users = [] } = useGetUsers();
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

	const columns: HeaderFunction<Application> = useCallback(
		table => [
			table.createDataColumn(row => row.name, {
				id: 'name',
				header: t('application-name'),
				sortUndefined: 1
			}),
			table.createDataColumn(row => row.codeName, {
				id: 'code',
				header: t('code')
			}),
			table.createDataColumn(row => row.owner, {
				id: 'created-by',
				header: t('created-by'),
				cell: info => info.getValue()?.displayName || '-',
				meta: {
					exportableFn: info => info.displayName || '-'
				}
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
			value={filters.query ?? ''}
			onChange={e => setFilters({ q: e.currentTarget?.value })}
		/>
	);

	return (
		<>
			<MultiAddSelect
				items={{
					entries: users.map(u => ({
						id: u.id,
						title: u.displayName,
						tagInfo: u.principalRole,
						subtitle: u.email || tSelect('no-email'),
						role: u.principalRole,
						avatar: {
							imageDescription: u.username,
							initials: u.displayName
						}
					}))
				}}
				title={tSelect('select-user')}
				description={tSelect('select-users')}
				open={isSelectOpen}
				onSubmitButtonText={tProc('save')}
				onSubmit={id => {
					setSelectedUsers(users.filter(user => id.includes(user.id)));
					setIsSelectOpen(false);
				}}
				onCloseButtonText={t('cancel')}
				onClose={() => setIsSelectOpen(false)}
				globalSearchLabel={tSelect('username-email')}
				globalSearchPlaceholder={tSelect('find-user')}
				globalFilters={[
					{
						id: 'role',
						label: tSelect('role')
					}
				]}
				globalFiltersIconDescription={tSelect('filters')}
				globalFiltersPlaceholderText={tSelect('choose-option')}
				globalFiltersPrimaryButtonText={tSelect('apply')}
				globalFiltersSecondaryButtonText={tSelect('reset')}
				clearFiltersText={tSelect('clear-filters')}
				influencerItemTitle={tSelect('name')}
				influencerItemSubtitle='email'
				noResultsTitle={tSelect('no-results')}
				noResultsDescription={tSelect('different-keywords')}
				selectedItems={{
					entries: selectedUsers.map(u => ({
						id: u.id,
						title: u.displayName,
						tagInfo: u.principalRole,
						subtitle: u.email || tSelect('no-email'),
						role: u.principalRole,
						avatar: {
							imageDescription: u.username,
							initials: u.displayName
						}
					}))
				}}
			/>

			<CosmoTableInlineAction
				data={apps}
				createHeaders={columns}
				noDataMessage={tTable('no-data')}
				toolbar={{ toolbarContent }}
				exportFileName={({ all }) =>
					all ? 'applications-all' : 'applications-selection'
				}
				inlineAction={<ActionsCell setIsSelectOpen={setIsSelectOpen} />}
				setRowSelected={setUserSelected}
			/>
		</>
	);
};

export default AppsVisibilityTable;
