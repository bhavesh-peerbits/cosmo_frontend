import { useTranslation } from 'react-i18next';
import { Button, TableToolbarSearch } from '@carbon/react';
import { HeaderFunction } from '@components/table/CosmoTable';
import { useCallback, useState } from 'react';
import CosmoTableInlineAction from '@components/table/CosmoTableInlineAction';
import Application from '@model/Application';
import { UserFollow } from '@carbon/react/icons';
import useGetAllAnalystUsers from '@api/user-admin/useGetAllAnalystUsers';
import useVisibilityApps from '@hooks/admin-panel/useVisibilityApps';
import SelectUserApplication from './SelectUserApplication';

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
	const { t: tTable } = useTranslation('table');
	const { apps, filters, setFilters } = useVisibilityApps();
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [appSelectedId, setAppSelectedId] = useState<string>();
	const { data: analystUsers = [] } = useGetAllAnalystUsers();

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
			table.createDataColumn(row => row.createdBy, {
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
			onChange={e => setFilters(old => ({ ...old, q: e.currentTarget?.value }))}
		/>
	);

	return (
		<>
			{appSelectedId ? (
				<SelectUserApplication
					appSelectedId={appSelectedId}
					setIsSelectOpen={setIsSelectOpen}
					isSelectOpen={isSelectOpen}
					setAppSelected={setAppSelectedId}
					analystUsers={analystUsers}
				/>
			) : null}

			<CosmoTableInlineAction
				data={apps}
				createHeaders={columns}
				noDataMessage={tTable('no-data')}
				toolbar={{ toolbarContent }}
				exportFileName={({ all }) =>
					all ? 'applications-all' : 'applications-selection'
				}
				inlineAction={<ActionsCell setIsSelectOpen={setIsSelectOpen} />}
				setRowSelected={setAppSelectedId}
			/>
		</>
	);
};

export default AppsVisibilityTable;
