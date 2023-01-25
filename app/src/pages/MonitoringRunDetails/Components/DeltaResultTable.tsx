import CosmoTable from '@components/table/CosmoTable';
import { ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { MisuseOutline, CheckmarkOutline } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { Layer, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import { DeltaFileDto, FileLinkDto } from 'cosmo-api/src/v1';
import TagFileLinkCell from '@components/table/Cell/TagFileLinkCell';
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
	data?: {
		givenBy?: string | undefined;
		givenAt?: string | undefined;
		asset?: string | undefined;
		deltaFile: DeltaFileDto;
	}[];
};

const DeltaResultTable = ({ data }: DeltaResultTableProps) => {
	const { t } = useTranslation(['changeMonitoring', 'table', 'runDetails']);
	const [modalToOpen, setModalToOpen] = useState('');

	// TODO Use tag for files
	const columns = useMemo<
		ColumnDef<{
			givenBy?: string | undefined;
			givenAt?: string | undefined;
			asset?: string | undefined;
			deltaFile: DeltaFileDto;
			answerFile?: FileLinkDto;
			answerValue?: string;
		}>[]
	>(
		() => [
			{
				id: 'name',
				accessorFn: row => row.deltaFile.name,
				header: t('runDetails:name'),
				sortUndefined: 1
			},
			{
				id: 'directory',
				accessorFn: row => row.deltaFile.directory,
				header: t('runDetails:directory')
			},
			{
				id: 'dimension',
				accessorFn: row => row.deltaFile.dimension,
				header: t('runDetails:dimension')
			},
			{
				id: 'additional-info',
				accessorFn: row => row.deltaFile.additionalInfo,
				header: t('runDetails:additional-info'),
				meta: { initialVisible: false }
			},
			{
				id: 'date-time',
				accessorFn: row => row.deltaFile.lastModify,
				header: t('runDetails:date-time')
			},
			{
				id: 'answered-by',
				accessorFn: row => row.givenBy,
				header: t('runDetails:answered-by')
			},
			{
				id: 'answered-at',
				accessorFn: row => row.givenAt,
				header: t('runDetails:answer-date'),
				meta: { initialVisible: false }
			},
			{
				id: 'answer',
				accessorFn: row => row.answerFile || row.answerValue,
				cell: info =>
					info.row.original.answerFile
						? TagFileLinkCell
						: info.getValue() !== 'NONE' && info.getValue(),
				header: t('runDetails:answer')
			},
			{
				id: 'actions',
				header: t('runDetails:actions'),
				cell: () => ActionsCell({ setModalToOpen }),
				enableSorting: false,
				enableGrouping: false
			}
		],
		[t]
	);

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
				data={data || []}
				isSelectable
				canAdd
			/>
		</Layer>
	);
};
export default DeltaResultTable;
