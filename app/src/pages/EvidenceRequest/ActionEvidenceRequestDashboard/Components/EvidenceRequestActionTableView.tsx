/* eslint-disable no-nested-ternary */
import {
	Tooltip,
	ContentSwitcher,
	Switch,
	Select,
	SelectItem,
	Layer
} from '@carbon/react';
import Fade from '@components/Fade';
import useEvidenceRequestAction from '@hooks/evidence-request/useEvidenceRequestAction';
import EvidenceRequest from '@model/EvidenceRequest';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Information, Grid as GridIcon, HorizontalView } from '@carbon/react/icons';
import { useCallback, useMemo } from 'react';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import CosmoTable from '@components/table/CosmoTable';
import DateCell from '@components/table/Cell/DateCell';

interface EvidenceRequestActionTableViewProps {
	view: string;
}

const EvidenceRequestActionTableView = ({
	view
}: EvidenceRequestActionTableViewProps) => {
	const { requests, setFilters } = useEvidenceRequestAction();
	const { t } = useTranslation('evidenceRequest');

	const tooltipCell = useCallback(
		({ getValue }: CellContext<EvidenceRequest, unknown>) => {
			const info = getValue() as {
				title: string | undefined;
				current: number | undefined;
				tot: number | undefined;
			};
			return (
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
			);
		},
		[]
	);

	const CellLinkComponent = useCallback(
		({ getValue, row }: CellContext<EvidenceRequest, unknown>) =>
			row.original.id ? (
				<Link to={`/evidence-request-action/${row.original.id}`}>
					{getValue() as string}
				</Link>
			) : (
				<span>{getValue() as string}</span>
			),
		[]
	);

	const columns = useMemo<ColumnDef<EvidenceRequest>[]>(() => {
		const ArrayCol: ColumnDef<EvidenceRequest>[] = [
			{
				accessorKey: `name${view}`,
				header: t('request-name'),
				accessorFn: row => row.name,
				cell: CellLinkComponent
			},
			{
				accessorKey: `app${view}`,
				accessorFn: row => row.application?.name,
				header: t('application')
			},
			{
				accessorKey: `startDate${view}`,
				accessorFn: row => row.startDate,
				cell: DateCell,
				header: t('start-date')
			},
			{
				accessorKey: `dueDate${view}`,
				accessorFn: row => row.dueDate,
				cell: DateCell,
				header: t('due-date')
			},
			{
				accessorKey: `creator${view}`,
				accessorFn: row => row.creator?.displayName,
				header: t('creator')
			}
		];
		if (view === 'ActionPending') {
			ArrayCol.splice(2, 0, {
				accessorKey: `step_progress${view}`,
				header: t('step-progress'),
				accessorFn: row => row.currentStep,
				cell: info =>
					info.row.original?.steps.length
						? `${info.getValue()}/${info.row.original?.steps.length}`
						: `${t('current-step')}: ${info.getValue()}`
			});

			ArrayCol.splice(2, 0, {
				accessorKey: `action${view}`,
				header: t('action'),
				accessorFn: row => {
					const steps = [...row.steps];
					steps.sort((a, b) => a.stepOrder - b.stepOrder);
					return steps[row.currentStep - 1].type === 'APPROVAL'
						? t('approve').toUpperCase()
						: t('upload').toUpperCase();
				},
				enableGrouping: false,
				meta: { filter: { type: 'checkbox' } }
			});
		}

		if (view === 'Closed') {
			ArrayCol.splice(
				3,
				0,

				{
					accessorKey: `status${view}`,
					header: t('status'),
					accessorFn: row => ({
						title: `${row.status}`,
						current: row.currentStep,
						tot: row.steps.length
					}),
					cell: tooltipCell
				}
			);
			ArrayCol.splice(3, 0, {
				id: `completionDate${view}`,
				header: t('completion-date'),
				accessorFn: row => row.completionDate?.toLocaleDateString()
			});
		}
		return ArrayCol;
	}, [CellLinkComponent, t, tooltipCell, view]);

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
			<Layer className='p-3'>
				<CosmoTable
					tableId={view}
					data={requests}
					columns={columns}
					toolbar={{
						searchBar: true,
						toolbarBatchActions: [],
						toolbarTableMenus: []
					}}
					isColumnOrderingEnabled
				/>
			</Layer>
		</Fade>
	);
};

export default EvidenceRequestActionTableView;
