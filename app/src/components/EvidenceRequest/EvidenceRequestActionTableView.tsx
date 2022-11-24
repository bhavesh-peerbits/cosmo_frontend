import {
	TableToolbarSearch,
	Tooltip,
	ContentSwitcher,
	Switch,
	Select,
	SelectItem,
	Layer
} from '@carbon/react';
import Fade from '@components/Fade';
import { HeaderFunction } from '@components/table/CosmoTable';
import GroupableCosmoTable from '@components/table/GroupableCosmoTable';
import useEvidenceRequestAction from '@hooks/evidence-request/useEvidenceRequestAction';
import EvidenceRequest from '@model/EvidenceRequest';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Information, Grid as GridIcon, HorizontalView } from '@carbon/react/icons';
import { useCallback } from 'react';

interface EvidenceRequestActionTableViewProps {
	view: string;
}

const EvidenceRequestActionTableView = ({
	view
}: EvidenceRequestActionTableViewProps) => {
	const { requests, filters, setFilters } = useEvidenceRequestAction();
	const { t } = useTranslation('evidenceRequest');

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
				<Link to={`/evidence-request-action/${info.id}`}>{info.code}</Link>
			) : (
				<span>{info.code}</span>
			),
		[]
	);

	const columns: HeaderFunction<EvidenceRequest> = useCallback(
		table => {
			const ArrayCol = [
				table.createDataColumn(row => row.name, {
					id: `name${view}`,
					header: t('request-name'),
					cell: info =>
						info &&
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
			if (view === 'ActionPending') {
				ArrayCol.splice(
					2,
					0,
					table.createDataColumn(row => row.currentStep, {
						id: `step_progress${view}`,
						header: t('step-progress'),
						cell: info =>
							info.row.original?.steps.length
								? `${info.getValue()}/${info.row.original?.steps.length}`
								: `${t('current-step')}: ${info.getValue()}`
					})
				);

				ArrayCol.splice(
					2,
					0,
					table.createDataColumn(
						row => ({ currentStep: row.currentStep, steps: row.steps }),
						{
							id: `action${view}`,
							header: t('action'),
							enableGrouping: false,
							cell: info => {
								const steps = [...info.getValue().steps];
								steps.sort((a, b) => a.stepOrder - b.stepOrder);
								return steps[+info.getValue().currentStep - 1].type === 'APPROVAL'
									? t('approve').toUpperCase()
									: t('upload').toUpperCase();
							}
						}
					)
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
			<div className='flex justify-end p-3'>
				<div className='flex items-center space-x-5'>
					<div className='flex items-center justify-end space-x-5'>
						<Layer>
							<Select
								id='workflow-types'
								hideLabel
								size='lg'
								onChange={e =>
									setFilters(old => ({
										...old,
										action:
											e.currentTarget?.value === 'All'
												? undefined
												: e.currentTarget?.value
									}))
								}
							>
								<SelectItem text='All' value='All' key='All' />
								<SelectItem text='Approve' value='APPROVAL' key='Approve' />
								<SelectItem text='Upload' value='UPLOAD' key='Upload' />
							</Select>
						</Layer>

						<ContentSwitcher
							selectedIndex={1}
							onChange={() => setFilters({ isTable: false })}
							className='w-auto'
						>
							<Switch name='first'>
								<GridIcon />
							</Switch>
							<Switch name='second'>
								<HorizontalView />
							</Switch>
						</ContentSwitcher>
					</div>
				</div>
			</div>
			<div className='p-3'>
				<GroupableCosmoTable
					tableId={view}
					data={requests}
					createHeaders={columns}
					toolbar={{ toolbarContent }}
				/>
			</div>
		</Fade>
	);
};

export default EvidenceRequestActionTableView;
