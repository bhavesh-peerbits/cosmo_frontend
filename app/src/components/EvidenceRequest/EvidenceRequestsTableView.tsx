import { Column, Grid, TableToolbarSearch, Tooltip } from '@carbon/react';
import Fade from '@components/Fade';
import { HeaderFunction } from '@components/table/CosmoTable';
import GroupableCosmoTable from '@components/table/GroupableCosmoTable';
import useEvidenceRequests from '@hooks/evidence-request/useEvidenceRequests';
import EvidenceRequest from '@model/EvidenceRequest';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Information } from '@carbon/react/icons';
import { useCallback } from 'react';
import EvidenceRequestFilters from './EvidenceRequestFilters';

interface EvidenceRequestsTableViewProps {
	view: string;
}

const EvidenceRequestsTableView = ({ view }: EvidenceRequestsTableViewProps) => {
	const { requests } = useEvidenceRequests();
	const { t } = useTranslation('evidenceRequest');
	const { filters, setFilters } = useEvidenceRequests();

	const tooltipCell = useCallback(
		(info: {
			title: string | undefined;
			current: number | undefined;
			tot: number | undefined;
		}) => (
			<div className='flex items-center space-x-2'>
				<span>{info.title}</span>
				<span>
					<Tooltip
						description={`${info.current}/${info.tot}`}
						align='top'
						className='mt-2'
					>
						<button type='button'>
							<Information />
						</button>
					</Tooltip>
				</span>
			</div>
		),
		[]
	);

	const CellLinkComponent = useCallback(
		(info: { id: string | undefined; code: string | undefined }) =>
			info.id ? (
				<Link to={`/started-evidence-request/${info.id}`}>{info.code}</Link>
			) : (
				<span>{info.code}</span>
			),
		[]
	);

	const columns: HeaderFunction<EvidenceRequest> = useCallback(
		table => {
			const ArrayCol = [
				table.createDataColumn(row => row.code, {
					id: `code${view}`,
					header: t('code'),
					cell: info =>
						CellLinkComponent({
							id: info.row.original?.id,
							code: info.getValue()
						})
				}),
				table.createDataColumn(row => row.application?.codeName, {
					id: `app${view}`,
					header: t('application')
				}),

				table.createDataColumn(row => row.startDate?.toLocaleDateString(), {
					id: `startDate${view}`,
					header: t('start-date')
				}),
				table.createDataColumn(row => row.dueDate?.toLocaleDateString(), {
					id: `dueDate${view}`,
					header: t('due-date')
				}),

				table.createDataColumn(row => row.creator?.displayName, {
					id: `creator${view}`,
					header: t('creator')
				})
			];
			if (view === 'OnGoing') {
				ArrayCol.splice(
					3,
					0,
					table.createDataColumn(row => row.currentStep, {
						id: `step_progress${view}`,
						header: t('step-progress'),
						cell: info =>
							info.row.original?.steps.length
								? `${info.getValue()}/${info.row.original?.steps.length} - ${
										info.row.original.steps.find(
											step => step.stepOrder === info.getValue()
										)?.type
								  }`
								: `${t('current-step')}: ${info.getValue()}`
					})
				);
			}
			if (view === 'Closed') {
				ArrayCol.splice(
					3,
					0,
					table.createDataColumn(
						row => ({
							title: `${row.status}`,
							current: row.currentStep,
							tot: row.steps.length
						}),
						{
							id: `status${view}`,
							header: t('status'),
							cell: info =>
								tooltipCell({
									title: info.getValue().title,
									current: info.getValue().current,
									tot: info.getValue().tot
								})
						}
					)
				);
				ArrayCol.splice(
					3,
					0,
					table.createDataColumn(row => row.completionDate?.toLocaleDateString(), {
						id: `completionDate${view}`,
						header: t('completion-date')
					})
				);
			}
			return ArrayCol;
		},
		[CellLinkComponent, t, tooltipCell, view]
	);

	const toolbarContent = (
		<TableToolbarSearch
			size='lg'
			persistent
			placeholder={t('search-placeholder')}
			id='search'
			value={filters.query ?? ''}
			onChange={e => setFilters({ q: e.currentTarget?.value })}
		/>
	);

	return (
		<Fade>
			<Grid fullWidth narrow className='h-full'>
				<Column sm={4} md={8} lg={4}>
					<div className='pl-5 md:ml-0'>
						<EvidenceRequestFilters view={view} />
					</div>
				</Column>
				<Column sm={4} md={8} lg={12}>
					<GroupableCosmoTable
						tableId={view}
						data={
							view === 'OnGoing'
								? requests.filter(req => req.status === 'IN_PROGRESS')
								: requests.filter(
										req => req.status !== 'DRAFT' && req.status !== 'IN_PROGRESS'
								  )
						}
						createHeaders={columns}
						toolbar={{ toolbarContent }}
					/>
				</Column>
			</Grid>
		</Fade>
	);
};

export default EvidenceRequestsTableView;
