import CosmoTable from '@components/table/CosmoTable';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import DateCell from '@components/table/Cell/DateCell';
import { Layer } from '@carbon/react';
import Templates from '@model/Administration/DocumentTemplates';

type DocumentTemplatesTableProps = {
	documentTemplates: Templates[];
};
const DocumentTemplatesTable = ({ documentTemplates }: DocumentTemplatesTableProps) => {
	const { t } = useTranslation(['documentationAdmin']);

	const columns = useMemo<ColumnDef<Templates>[]>(() => {
		const ArrayCol: ColumnDef<Templates>[] = [
			{
				id: 'template-name',
				accessorFn: row => row.name,
				header: t('documentationAdmin:name'),
				sortUndefined: 1
			},
			{
				id: 'type',
				accessorFn: row => row.type,
				header: t('documentationAdmin:type'),
				meta: { filter: { type: 'multiselect' } }
			},
			{
				id: 'allowChanges',
				accessorFn: row => row.allowChanges,
				header: t('documentationAdmin:changes'),
				meta: { filter: { type: 'radio' } }
			},
			{
				id: 'approvalSteps',
				accessorFn: row => row.approvalSteps,
				header: t('documentationAdmin:approval-steps')
			},
			{
				id: 'totalChapters',
				accessorFn: row => row.totalChapters,
				header: t('documentationAdmin:chapters')
			},
			{
				id: 'createdOn',
				accessorFn: row => row.createdOn,
				header: t('documentationAdmin:created-on'),
				cell: DateCell
			},
			{
				id: 'totalUsage',
				accessorFn: row => row.usages,
				header: t('documentationAdmin:total-usage')
			}
		];
		return ArrayCol;
	}, [t]);

	return (
		<Layer>
			<CosmoTable
				tableId='document-templates-table'
				columns={columns}
				isColumnOrderingEnabled
				toolbar={{
					searchBar: true,
					toolbarBatchActions: [],
					toolbarTableMenus: []
				}}
				exportFileName={({ all }) =>
					all ? 'documentTemplates-all' : 'documentTemplates-selection'
				}
				data={documentTemplates}
				isSelectable
				noDataMessage={t('documentationAdmin:no-templates')}
				noDataMessageSubtitle={t('documentationAdmin:no-templates-subtitle')}
			/>
		</Layer>
	);
};
export default DocumentTemplatesTable;
