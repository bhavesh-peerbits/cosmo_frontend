import { useTranslation } from 'react-i18next';
import { Button } from '@carbon/react';
import { HeaderFunction } from '@components/table/CosmoTable';
import { useCallback, useState } from 'react';
import CosmoTableInlineAction from '@components/table/CosmoTableInlineAction';
import useGetApps from '@api/management/useGetApps';
import Application from '@model/Application';
import { UserFollow } from '@carbon/react/icons';

const ActionsCell = () => {
	return (
		<Button
			hasIconOnly
			kind='ghost'
			renderIcon={UserFollow}
			iconDescription='Add users'
		/>
	);
};

const AppsVisibilityTable = () => {
	const { t: tTable } = useTranslation('table');
	const { data = new Map<string, Application>() } = useGetApps();
	const apps = Array.from(data.values());
	const [, setUserSelected] = useState<string[]>([]);

	const columns: HeaderFunction<Application> = useCallback(
		table => [
			table.createDataColumn(row => row.name, {
				id: 'name',
				header: 'Name',
				sortUndefined: 1
			}),
			table.createDataColumn(row => row.codeName, {
				id: 'code',
				header: 'Code'
			}),
			table.createDataColumn(row => row.owner, {
				id: 'owner',
				header: 'Owner',
				cell: info => info.getValue()?.displayName || '-',
				meta: {
					exportableFn: info => info.displayName || '-'
				}
			})
		],
		[]
	);

	return (
		<CosmoTableInlineAction
			data={apps}
			createHeaders={columns}
			noDataMessage={tTable('no-data')}
			// toolbar={{ toolbarContent }}
			exportFileName={({ all }) => (all ? 'applications-all' : 'applications-selection')}
			inlineAction={<ActionsCell />}
			setRowSelected={setUserSelected}
		/>
	);
};

export default AppsVisibilityTable;
