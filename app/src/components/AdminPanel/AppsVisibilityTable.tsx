import { useTranslation } from 'react-i18next';
import { Button, Layer } from '@carbon/react';
import { useMemo, useState } from 'react';
import Application from '@model/Application';
import { UserFollow } from '@carbon/react/icons';
import useGetAllAnalystUsers from '@api/user-admin/useGetAllAnalystUsers';
import useVisibilityApps from '@hooks/admin-panel/useVisibilityApps';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import StringDashCell from '@components/table/Cell/StringDashCell';
import CosmoTable from '@components/table/CosmoTable';
import SelectUserApplication from './SelectUserApplication';

type ActionCellProps = {
	setIsSelectOpen: (val: boolean) => void;
	setAppSelectedId: (val: string) => void;
	info: CellContext<Application, unknown>;
};

const ActionsCell = ({ setIsSelectOpen, setAppSelectedId, info }: ActionCellProps) => {
	const { t } = useTranslation('userSelect');
	const { getValue } = info;
	return (
		<Button
			hasIconOnly
			kind='ghost'
			renderIcon={UserFollow}
			iconDescription={t('add-user')}
			tooltipPosition='left'
			onClick={() => {
				setIsSelectOpen(true);
				setAppSelectedId(getValue() as string);
			}}
		/>
	);
};

const AppsVisibilityTable = () => {
	const { t } = useTranslation('management');
	const { t: tTable } = useTranslation('table');
	const { apps } = useVisibilityApps();
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const [appSelectedId, setAppSelectedId] = useState<string>();
	const { data: analystUsers = [] } = useGetAllAnalystUsers();

	const columns = useMemo<ColumnDef<Application>[]>(
		() => [
			{
				id: 'name',
				accessorFn: row => row.name,
				header: t('application-name'),
				sortUndefined: 1
			},
			{
				id: 'code',
				accessorFn: row => row.codeName,
				header: t('code')
			},
			{
				id: 'created-by',
				accessorFn: row => row.createdBy?.displayName,
				header: t('created-by'),
				cell: StringDashCell,
				meta: {
					exportableFn: info => (info as string) || '-'
				}
			},
			{
				id: 'action',
				header: tTable('action'),
				accessorFn: row => row.id,
				cell: info => ActionsCell({ setIsSelectOpen, setAppSelectedId, info }),
				meta: {
					disableExport: true
				}
			}
		],
		[t, tTable]
	);

	return (
		<Layer>
			{appSelectedId ? (
				<SelectUserApplication
					appSelectedId={appSelectedId}
					setIsSelectOpen={setIsSelectOpen}
					isSelectOpen={isSelectOpen}
					setAppSelected={setAppSelectedId}
					analystUsers={analystUsers}
				/>
			) : null}

			<CosmoTable
				tableId='appvisibility'
				data={apps}
				columns={columns}
				isColumnOrderingEnabled
				noDataMessage={tTable('no-data')}
				exportFileName={({ all }) =>
					all ? 'applications-all' : 'applications-selection'
				}
				toolbar={{
					searchBar: true,
					toolbarBatchActions: [],
					toolbarTableMenus: []
				}}
			/>
		</Layer>
	);
};

export default AppsVisibilityTable;
