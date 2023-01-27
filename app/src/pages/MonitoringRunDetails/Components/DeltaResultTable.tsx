import CosmoTable from '@components/table/CosmoTable';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { MisuseOutline, CheckmarkOutline } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { Layer } from '@carbon/react';
import FileLink from '@model/FileLink';
import MultiTagFileLinkCell from '@components/table/Cell/MultiTagFileLinkCell';
import AddAnswerToDeltaModal, {
	DeltaTableRowType
} from '../Modals/AddAnswerToDeltaModal';

type DeltaResultTableProps = {
	data?: DeltaTableRowType[];
	monitoringName: string;
	runNumber: number;
	filesAnswers?: FileLink[];
};

const DeltaResultTable = ({
	data,
	monitoringName,
	runNumber,
	filesAnswers
}: DeltaResultTableProps) => {
	const { t } = useTranslation(['changeMonitoring', 'table', 'runDetails']);
	const [modalToOpen, setModalToOpen] = useState<{
		modal: string;
		rows: DeltaTableRowType[];
	}>({ modal: '', rows: [] });

	const columns = useMemo<ColumnDef<DeltaTableRowType>[]>(
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
				id: 'asset',
				accessorFn: row => row.asset,
				header: 'Asset'
			},
			{
				id: 'date-time',
				accessorFn: row =>
					row.deltaFile.lastModify && new Date(row.deltaFile.lastModify).toLocaleString(),
				header: t('runDetails:date-time')
			},
			{
				id: 'answered-by',
				accessorFn: row => row.givenBy,
				header: t('runDetails:answered-by')
			},
			{
				id: 'answered-at',
				accessorFn: row => row.givenAt && new Date(row.givenAt).toLocaleString(),
				header: t('runDetails:answer-date'),
				meta: { initialVisible: false }
			},
			{
				id: 'answer',
				accessorFn: row => (row.answerFile?.length ? row.answerFile : row.answerValue),
				cell: info =>
					info.row.original.answerFile?.length
						? MultiTagFileLinkCell(info)
						: info.getValue() !== 'NONE' && info.getValue(),
				header: t('runDetails:answer'),
				meta: {
					exportableFn: info =>
						(info as DeltaTableRowType).answerFile
							? (info as DeltaTableRowType).answerFile
									?.map(file => file.name)
									.join(',') || ''
							: (info as DeltaTableRowType).answerValue || ''
				}
			}
		],
		[t]
	);

	const toolbarBatchActions = [
		{
			id: 'confirm',
			label: t('runDetails:confirm'),
			icon: CheckmarkOutline,
			onClick: (rows: DeltaTableRowType[]) => {
				setModalToOpen({ modal: 'add-answer', rows });
			}
		},
		{
			id: 'ignore',
			label: t('runDetails:ignore'),
			icon: MisuseOutline,
			onClick: (rows: DeltaTableRowType[]) => {
				setModalToOpen({ modal: 'ignore', rows });
			}
		}
	];

	// TODO Add upload for answers

	return (
		<Layer level={2}>
			<AddAnswerToDeltaModal
				isOpen={modalToOpen}
				setIsOpen={setModalToOpen}
				monitoringName={monitoringName}
				runNumber={runNumber}
				filesAnswers={filesAnswers}
				orderNumber={runNumber}
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
				exportFileName={({ all }) =>
					all
						? `${monitoringName}-run-${runNumber}-all`
						: `${monitoringName}-run-${runNumber}-selection`
				}
				data={data || []}
				isSelectable
				canAdd
				inlineActions={[
					{
						label: t('runDetails:confirm'),
						onClick: row => setModalToOpen({ modal: 'add-answer', rows: [row.original] })
					},
					{
						label: t('runDetails:ignore'),
						onClick: row => setModalToOpen({ modal: 'ignore', rows: [row.original] })
					}
				]}
			/>
		</Layer>
	);
};
export default DeltaResultTable;
