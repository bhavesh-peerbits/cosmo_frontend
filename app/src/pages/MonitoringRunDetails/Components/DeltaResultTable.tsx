import CosmoTable from '@components/table/CosmoTable';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { MisuseOutline, CheckmarkOutline } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { Layer } from '@carbon/react';
import { DeltaFileDto, FileLinkDto } from 'cosmo-api/src/v1';
import TagFileLinkCell from '@components/table/Cell/TagFileLinkCell';
import FileLink from '@model/FileLink';
import AddAnswerToDeltaModal from '../Modals/AddAnswerToDeltaModal';

export interface DeltaTableRowType {
	givenBy?: string | undefined;
	givenAt?: string | undefined;
	asset?: string | undefined;
	deltaFile: DeltaFileDto;
	answerFile?: FileLinkDto;
	answerValue?: string;
}

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
	const [modalToOpen, setModalToOpen] = useState('');

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
				header: t('runDetails:answer'),
				meta: {
					exportableFn: info =>
						(info as DeltaTableRowType).answerFile
							? (info as DeltaTableRowType).answerFile?.name || ''
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

	// TODO Add upload for answers

	return (
		<Layer level={2}>
			<AddAnswerToDeltaModal
				isOpen={modalToOpen === 'add-answer' || modalToOpen === 'ignore'}
				setIsOpen={setModalToOpen}
				isIgnore={modalToOpen === 'ignore'}
				monitoringName={monitoringName}
				runNumber={runNumber}
				filesAnswers={filesAnswers}
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
					{ label: t('runDetails:confirm'), onClick: () => setModalToOpen('add-answer') },
					{ label: t('runDetails:ignore'), onClick: () => setModalToOpen('ignore') }
				]}
			/>
		</Layer>
	);
};
export default DeltaResultTable;
