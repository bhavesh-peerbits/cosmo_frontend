import CosmoTable from '@components/table/CosmoTable';
import { ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { MisuseOutline, CheckmarkOutline } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { Layer, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import User from '@model/User';
import { formatDate } from '@i18n';
import AddAnswerToDeltaModal from '../Modals/AddAnswerToDeltaModal';

type ActionsCellProps = {
	setModalToOpen: Dispatch<SetStateAction<string>>;
};
const ActionsCell = ({ setModalToOpen }: ActionsCellProps) => {
	const { t } = useTranslation('runDetails');
	return (
		<OverflowMenu ariaLabel='Actions' iconDescription={t('actions')} direction='top'>
			<OverflowMenuItem
				itemText={t('confirm')}
				onClick={() => setModalToOpen('add-answer')}
			/>
			<OverflowMenuItem itemText={t('ignore')} onClick={() => setModalToOpen('ignore')} />
		</OverflowMenu>
	);
};

type DeltaResultTableProps = {
	data: {
		name: string;
		directory: string;
		dimension: string;
		date: Date;
		answeredBy?: User;
		answer: string;
	}[];
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DeltaResultTable = ({ data }: DeltaResultTableProps) => {
	const { t } = useTranslation(['changeMonitoring', 'table', 'runDetails']);
	const [modalToOpen, setModalToOpen] = useState('');

	// TODO Use tag for files
	const columns = useMemo<
		ColumnDef<{
			name: string;
			directory: string;
			dimension: string;
			date: Date;
			answeredBy?: User;
			answer: string;
		}>[]
	>(() => {
		const ArrayCol: ColumnDef<{
			name: string;
			directory: string;
			dimension: string;
			date: Date;
			answeredBy?: User;
			answer: string;
		}>[] = [
			{
				id: 'name',
				accessorFn: row => row.name,
				header: t('runDetails:name'),
				sortUndefined: 1
			},
			{
				id: 'directory',
				accessorFn: row => row.directory,
				header: t('runDetails:directory')
			},
			{
				id: 'dimension',
				accessorFn: row => row.dimension,
				header: t('runDetails:dimension')
			},
			{
				id: 'date-time',
				accessorFn: row => formatDate(row.date),
				header: t('runDetails:date-time')
			},
			{
				id: 'answered-by',
				accessorFn: row => row.answeredBy?.displayName,
				header: t('runDetails:answered-by')
			},
			{
				id: 'answer',
				accessorFn: row => row.answer,
				header: t('runDetails:answer')
			},
			{
				id: 'actions',
				header: t('runDetails:actions'),
				cell: () => ActionsCell({ setModalToOpen }),
				enableSorting: false,
				enableGrouping: false
			}
		];
		return ArrayCol;
	}, [t]);

	const toolbarBatchActions = [
		{
			id: 'confirm',
			label: t('runDetails:confirm'),
			icon: CheckmarkOutline,
			onClick: () => {
				setModalToOpen('add-answer');
			}
		},
		{
			id: 'ignore',
			label: t('runDetails:ignore'),
			icon: MisuseOutline,
			onClick: () => {
				setModalToOpen('ignore');
			}
		}
	];
	// TODO change name of export file
	return (
		<Layer level={2}>
			<AddAnswerToDeltaModal
				isOpen={modalToOpen === 'add-answer' || modalToOpen === 'ignore'}
				setIsOpen={setModalToOpen}
				isIgnore={modalToOpen === 'ignore'}
			/>
			<CosmoTable
				tableId='delta-table'
				columns={columns}
				noDataMessage={t('table:no-data')}
				isColumnOrderingEnabled
				toolbar={{
					searchBar: true,
					toolbarBatchActions,
					toolbarTableMenus: []
				}}
				exportFileName={({ all }) => (all ? 'file-upload-all' : 'file-upload-selection')}
				data={data}
				isSelectable
				canAdd
			/>
		</Layer>
	);
};
export default DeltaResultTable;
