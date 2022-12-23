import { Column, Grid } from '@carbon/react';
import Fade from '@components/Fade';
import CosmoTable from '@components/table/CosmoTable';
import useEvidenceRequests from '@hooks/evidence-request/useEvidenceRequests';
import EvidenceRequest from '@model/EvidenceRequest';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import CellLink from '@components/table/Cell/CellLink';
import { ColumnDef } from '@tanstack/react-table';
import TooltipCell from '@components/table/Cell/TooltipCell';
import DateCell from '@components/table/Cell/DateCell';
import EvidenceRequestFilters from './EvidenceRequestFilters';

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
				accessorFn: row => ({ name: row.name, id: row.id }),
				header: t('request-name'),
				cell: CellLink
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
				accessorFn: row => ({
					content: `${row.status}`,
					description: `${row.currentStep}/${row.steps.length}`
				}),
				cell: TooltipCell
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
		<Fade>
			<Grid fullWidth narrow className='p-3'>
				<Column sm={4} md={8} lg={4}>
					<div className='pl-5 md:ml-0'>
						<EvidenceRequestFilters view={view} />
					</div>
				</Column>
				<Column sm={4} md={8} lg={12}>
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
				</Column>
			</Grid>
		</Fade>
	);
};

export default EvidenceRequestsTableView;
