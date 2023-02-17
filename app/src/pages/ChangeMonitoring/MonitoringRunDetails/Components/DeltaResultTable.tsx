import CosmoTable from '@components/table/CosmoTable';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { MisuseOutline, CheckmarkOutline, Csv, TrashCan } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { Layer } from '@carbon/react';
import FileLink from '@model/common/FileLink';
import MultiTagFileLinkCell from '@components/table/Cell/MultiTagFileLinkCell';
import useGetCsvAnswer from '@api/change-monitoring/useGetCsvAnswer';
import useDeleteAnswer from '@api/change-monitoring/useDeleteAnswer';
import DateCell from '@components/table/Cell/DateCell';
import UploadCsvAnswersModal from '../Modals/UploadCsvAnswersModal';
import AddAnswerToDeltaFileModal, {
	DeltaTableRowType
} from '../Modals/AddAnswerDeltaFileModal';

type DeltaResultTableProps = {
	data?: DeltaTableRowType[];
	monitoringName: string;
	runNumber: number;
	filesAnswers?: FileLink[];
	canEdit?: boolean;
};

const DeltaResultTable = ({
	data,
	monitoringName,
	runNumber,
	filesAnswers,
	canEdit
}: DeltaResultTableProps) => {
	const { t } = useTranslation(['changeMonitoring', 'table', 'runDetails']);
	const [modalToOpen, setModalToOpen] = useState<{
		modal: string;
		rows: DeltaTableRowType[];
	}>({ modal: '', rows: [] });
	const [isUploadOpen, setIsUploadOpen] = useState(false);

	const { mutate } = useDeleteAnswer();
	const removeAnswer = (row: DeltaTableRowType) => {
		return mutate({
			deltaId: row.deltaId,
			deltaFileId: row.deltaFile.id
		});
	};

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
				id: 'type',
				accessorFn: row => row.deltaFile.deltaType,
				header: t('runDetails:type'),
				meta: { filter: { type: 'checkbox' } }
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
				accessorFn: row => row.deltaFile.lastModify && new Date(row.deltaFile.lastModify),
				cell: DateCell,
				header: t('runDetails:date-time')
			},
			{
				id: 'answered-by',
				accessorFn: row => row.givenBy,
				header: t('runDetails:answered-by')
			},
			{
				id: 'answered-at',
				accessorFn: row => row.givenAt && new Date(row.givenAt),
				cell: DateCell,
				header: t('runDetails:answer-date'),
				meta: { initialVisible: false }
			},
			{
				id: 'answer-ticket',
				accessorFn: row => row.answerValue,
				cell: info =>
					info.getValue() && info.getValue() !== 'NONE' ? info.getValue() : '-',
				header: t('runDetails:ticket-code')
			},
			{
				id: 'answer-files',
				accessorFn: row => (row.answerFile?.length ? row.answerFile : row.answerValue),
				cell: info =>
					info.row.original.answerFile?.length ? MultiTagFileLinkCell(info) : '-',
				header: 'Files',
				meta: {
					filter: { enabled: false },
					exportableFn: info =>
						(info as DeltaTableRowType).answerFile
							? (info as DeltaTableRowType).answerFile
									?.map(file => file.name)
									.join(',') || ''
							: '-'
				}
			},
			{
				id: 'status',
				accessorFn: row =>
					row.justificationStatus ? t(`runDetails:${row.justificationStatus}`) : '',
				header: t('runDetails:answer-status'),
				meta: {
					filter: { type: 'checkbox' }
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
		},
		{
			id: 'delete',
			label: t('runDetails:remove-answer'),
			icon: TrashCan,
			onClick: (rows: DeltaTableRowType[]) => {
				rows.forEach(row => removeAnswer(row));
			}
		}
	];

	const downloadTemplateAnswer = () => {
		const uniqueDeltaIds = [...new Set(data?.map(el => el.deltaId))];
		uniqueDeltaIds.forEach(id =>
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useGetCsvAnswer({
				deltaFilesIds: data?.map(el => el.deltaFile.id) || [],
				deltaId: id
			}).then(({ data: resultData, headers }) => {
				const fileName =
					headers['content-disposition']
						?.split('filename=')?.[1]
						?.replace(/^"/, '')
						?.replace(/"$/, '') || `${monitoringName}-RUN${runNumber}-answers.csv`;
				const fileBlob = new Blob([resultData as unknown as BlobPart]);
				const dataUrl = URL.createObjectURL(fileBlob);
				const link = document.createElement('a');
				link.download = fileName;
				link.href = dataUrl;
				link.click();
			})
		);
	};

	return (
		<Layer level={2}>
			<UploadCsvAnswersModal
				isOpen={isUploadOpen}
				setIsOpen={setIsUploadOpen}
				monitoringName={monitoringName}
				runNumber={runNumber}
				deltaIds={data?.map(d => d.deltaId) || []}
			/>
			<AddAnswerToDeltaFileModal
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
				noDataMessage={t('runDetails:no-data-delta')}
				noDataMessageSubtitle={t('runDetails:no-delta-subtitle')}
				isColumnOrderingEnabled
				toolbar={{
					searchBar: true,
					toolbarBatchActions: canEdit ? toolbarBatchActions : [],
					toolbarTableMenus: canEdit
						? [
								{
									icon: Csv,
									id: 'csv-menus',
									tableToolbarActions: [
										{
											id: 'download-template',
											label: 'Download template',
											onClick: () => {
												downloadTemplateAnswer();
											}
										},
										{
											id: 'upload-answers',
											label: t('runDetails:upload-answers'),
											onClick: () => {
												setIsUploadOpen(true);
											}
										}
									]
								}
						  ]
						: []
				}}
				exportFileName={({ all }) =>
					all
						? `${monitoringName}-run-${runNumber}-all`
						: `${monitoringName}-run-${runNumber}-selection`
				}
				data={data || []}
				isSelectable
				inlineActions={
					canEdit
						? [
								{
									label: t('runDetails:confirm'),
									onClick: row =>
										setModalToOpen({ modal: 'add-answer', rows: [row.original] })
								},
								{
									label: t('runDetails:ignore'),
									onClick: row =>
										setModalToOpen({ modal: 'ignore', rows: [row.original] })
								},
								{
									label: t('runDetails:remove-answer'),
									onClick: row => removeAnswer(row.original)
								}
						  ]
						: undefined
				}
			/>
		</Layer>
	);
};
export default DeltaResultTable;
