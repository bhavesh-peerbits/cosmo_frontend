import CosmoTable from '@components/table/CosmoTable';
import useEvidenceRequests from '@hooks/evidence-request/useEvidenceRequests';
import EvidenceRequest from '@model/EvidenceRequest/EvidenceRequest';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { Layer } from '@carbon/react';
import CellLink from '@components/table/Cell/CellLink';
import { ColumnDef } from '@tanstack/react-table';
import TooltipCell from '@components/table/Cell/TooltipCell';
import DateCell from '@components/table/Cell/DateCell';

interface EvidenceRequestsTableViewProps {
	view: string;
}

const EvidenceRequestsTableView = ({ view }: EvidenceRequestsTableViewProps) => {
	const { requests } = useEvidenceRequests();
	const { t } = useTranslation('evidenceRequest');

	const columns = useMemo<ColumnDef<EvidenceRequest>[]>(() => {
		const ArrayCol: ColumnDef<EvidenceRequest>[] = [
			{
				id: `name${view}`,
				accessorFn: row => row.name,
				header: t('request-name'),
				cell: info => CellLink({ info, preUrl: '/started-evidence-request' })
			},
			{
				id: `applicationname${view}`,
				accessorFn: row => row.application?.name,
				header: t('application')
			},

			{
				id: `startDate${view}`,
				accessorFn: row => row.startDate,
				cell: DateCell,
				header: t('start-date')
			},
			{
				id: `dueDate${view}`,
				accessorFn: row => row.dueDate,
				cell: DateCell,
				header: t('due-date')
			},

			{
				id: `creator${view}`,
				accessorFn: row => row.creator?.displayName,
				header: t('creator')
			}
		];
		if (view === 'OnGoing') {
			ArrayCol.splice(3, 0, {
				id: `step_progress${view}`,
				accessorFn: row => row.currentStep,
				header: t('step-progress'),
				cell: info =>
					info.row.original?.steps.length
						? `${info.getValue()}/${info.row.original?.steps.length} - ${
								info.row.original.steps.find(step => step.stepOrder === info.getValue())
									?.type
						  }`
						: `${t('current-step')}: ${info.getValue()}`
			});
		}
		if (view === 'Closed') {
			ArrayCol.splice(3, 0, {
				id: `status${view}`,
				header: t('status'),
				accessorFn: row => `${row.status}`,
				cell: info =>
					TooltipCell({
						info,
						description: `${info.row.original.currentStep}/${info.row.original.steps.length}`
					})
			});
			ArrayCol.splice(3, 0, {
				id: `completionDate${view}`,
				accessorFn: row => row.completionDate,
				header: t('completion-date'),
				cell: DateCell
			});
		}
		return ArrayCol;
	}, [t, view]);

	return (
		<Layer>
			<CosmoTable
				tableId={view}
				isColumnOrderingEnabled
				data={
					view === 'OnGoing'
						? requests.filter(req => req.status === 'IN_PROGRESS')
						: requests.filter(
								req => req.status !== 'DRAFT' && req.status !== 'IN_PROGRESS'
						  )
				}
				columns={columns}
				toolbar={{
					searchBar: true,
					toolbarBatchActions: [],
					toolbarTableMenus: []
				}}
			/>
		</Layer>
	);
};

export default EvidenceRequestsTableView;
