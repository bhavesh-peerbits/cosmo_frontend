import PageHeader from '@components/PageHeader';
import { useLocation, useParams } from 'react-router-dom';
import { CloseOutline, Information } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Grid, Column } from '@carbon/react';
import MonitoringSummaryDetails from '@pages/MonitoringDetails/Components/MonitoringSummaryDetails';
import InfoRunModal from '@pages/MonitoringDetails/Modals/InfoRunModal';
import useGetMonitoringById from '@api/change-monitoring/useGetMonitoringById';
import useGetRunById from '@api/change-monitoring/useGetRunById';
import Monitoring from '@model/Monitoring';
import Run from '@model/Run';
import { UseQueryResult } from '@tanstack/react-query';
import RunDetailsStepContainer from './Containers/RunDetailsStepContainer';
import CloseRunModal from './Modals/CloseRunModal';

type MonitoringRunDetailsProps = {
	getMonitoringFn?: (monitoringId: string) => UseQueryResult<Monitoring, unknown>;
	getRunFn?: (runId: string) => UseQueryResult<Run, unknown>;
};

const MonitoringRunDetails = ({
	getMonitoringFn = useGetMonitoringById,
	getRunFn = useGetRunById
}: MonitoringRunDetailsProps) => {
	const { monitoringId = '', runId = '' } = useParams();
	const { t } = useTranslation('runDetails');
	const { data: monitoring } = getMonitoringFn(monitoringId);
	const { data: run } = getRunFn(runId);
	const [isCloseOpen, setIsCloseOpen] = useState(false);
	const [isInfoOpen, setIsInfoOpen] = useState(false);
	const location = useLocation();
	const isInbox = location.pathname.includes('change-monitoring');

	if (!monitoring || !run) return null;

	return (
		<PageHeader
			pageTitle={`${monitoring.name} - RUN ${run?.orderNumber}`}
			intermediateRoutes={[
				{ name: 'Change Monitoring Dashboard', to: '/monitoring-dashboard' },
				{ name: monitoring.name, to: `/monitoring-dashboard/${monitoringId}` }
			]}
			actions={
				!isInbox
					? [
							{
								name: t('close-run'),
								onClick: () => {
									setIsCloseOpen(true);
								},
								kind: 'danger',
								icon: CloseOutline
							}
					  ]
					: [
							{
								name: 'Info',
								onClick: () => {
									setIsInfoOpen(true);
								},
								kind: 'tertiary',
								icon: Information
							}
					  ]
			}
		>
			<Grid className='p-container-1'>
				<CloseRunModal
					id={runId}
					setIsOpen={setIsCloseOpen}
					isOpen={isCloseOpen}
					monitoringName={monitoring.name}
					runNumber={run.orderNumber}
				/>
				<InfoRunModal id={runId} isOpen={isInfoOpen} setIsOpen={setIsInfoOpen} />
				<Column sm={4} md={2} lg={3}>
					<MonitoringSummaryDetails monitoring={monitoring} />
				</Column>
				<Column sm={4} md={6} lg={13}>
					<RunDetailsStepContainer run={run} monitoring={monitoring} />
				</Column>
			</Grid>
		</PageHeader>
	);
};
export default MonitoringRunDetails;
