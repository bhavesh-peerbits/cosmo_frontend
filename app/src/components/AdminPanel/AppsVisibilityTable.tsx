import { useTranslation } from 'react-i18next';
import { Button, TableToolbarSearch } from '@carbon/react';
import { HeaderFunction } from '@components/table/CosmoTable';
import { useCallback, useState } from 'react';
import CosmoTableInlineAction from '@components/table/CosmoTableInlineAction';
import Application from '@model/Application';
import { UserFollow } from '@carbon/react/icons';
import useVisibilityApps from '@hooks/admin-panel/useVisibilityApps';

const ActionsCell = () => {
	const { t } = useTranslation('userSelect');
	return (
		<Button
			hasIconOnly
			kind='ghost'
			renderIcon={UserFollow}
			iconDescription={t('add-user')}
		/>
	);
};

const AppsVisibilityTable = () => {
	const { t } = useTranslation('management');

	const { t: tTable } = useTranslation('table');
	const [, setUserSelected] = useState<string[]>([]);
	const { apps, filters, setFilters } = useVisibilityApps();

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
				id: 'owner',
				header: t('owner'),
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
		<CosmoTableInlineAction
			data={apps}
			createHeaders={columns}
			noDataMessage={tTable('no-data')}
			toolbar={{ toolbarContent }}
			exportFileName={({ all }) => (all ? 'applications-all' : 'applications-selection')}
			inlineAction={<ActionsCell />}
			setRowSelected={setUserSelected}
		/>
	);
};

export default AppsVisibilityTable;
