import PageHeader from '@components/PageHeader';
import { useParams } from 'react-router-dom';
import { CloseOutline } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Grid, Column } from '@carbon/react';
import MonitoringSummaryDetails from '@pages/MonitoringDetails/Components/MonitoringSummaryDetails';
import useGetMonitoringById from '@api/change-monitoring/useGetMonitoringById';
import CloseRunModal from './Modals/CloseRunModal';
import RunDetailsStepContainer from './Containers/RunDetailsStepContainer';

const MonitoringRunDetails = () => {
	const { monitoringId = '', runId = '' } = useParams();
	const { t } = useTranslation('runDetails');
	const { data: monitoring } = useGetMonitoringById(monitoringId);
	const run = monitoring?.runs.find(r => r.id === runId);
	const [isCloseOpen, setIsCloseOpen] = useState(false);

	// TODO Change monitoring name in breadcrumb

	if (!monitoring || !run) return null;

	return (
		<PageHeader
			pageTitle={`${monitoring.name} - RUN ${run?.orderNumber}`}
			intermediateRoutes={[
				{ name: 'Change Monitoring Dashboard', to: '/monitoring-dashboard' },
				{ name: monitoring.name, to: `/monitoring-dashboard/${monitoringId}` }
			]}
			actions={[
				{
					name: t('close-run'),
					onClick: () => {
						setIsCloseOpen(true);
					},
					kind: 'danger',
					icon: CloseOutline
				}
			]}
		>
			<Grid className='p-container-1'>
				<CloseRunModal
					id={runId}
					setIsOpen={setIsCloseOpen}
					isOpen={isCloseOpen}
					monitoringName={monitoring.name}
					runNumber={run.orderNumber}
				/>
				<Column sm={4} md={2} lg={3}>
					<MonitoringSummaryDetails monitoring={monitoring} />
				</Column>
				<Column sm={4} md={6} lg={13}>
					<RunDetailsStepContainer />
				</Column>
			</Grid>
		</PageHeader>
	);
};
export default MonitoringRunDetails;
