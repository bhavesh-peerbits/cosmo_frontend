import PageHeader from '@components/PageHeader';
import { useLocation, useParams } from 'react-router-dom';
import { CloseOutline, Information } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Grid, Column } from '@carbon/react';
import MonitoringSummaryDetails from '@pages/MonitoringDetails/Components/MonitoringSummaryDetails';
import InfoRunModal from '@pages/MonitoringDetails/Modals/InfoRunModal';
import CloseRunModal from './Modals/CloseRunModal';
import RunDetailsStepContainer from './Containers/RunDetailsStepContainer';

const MonitoringRunDetails = () => {
	const { monitoringId = '', runId = '' } = useParams();
	const { t } = useTranslation('runDetails');

	const [isCloseOpen, setIsCloseOpen] = useState(false);
	const [isInfoOpen, setIsInfoOpen] = useState(false);
	const location = useLocation();
	const isInbox = location.pathname.includes('change-monitoring');

	// TODO Change monitoring name in breadcrumb

	return (
		<PageHeader
			pageTitle='MONITORING NAME - RUN NUMBER'
			intermediateRoutes={
				isInbox
					? [
							{ name: 'Change Monitoring', to: '/change-monitoring' },
							{ name: 'Monitoring Name', to: `/monitoring-dashboard/${monitoringId}` }
					  ]
					: [
							{ name: 'Change Monitoring Dashboard', to: '/monitoring-dashboard' },
							{ name: 'Monitoring Name', to: `/monitoring-dashboard/${monitoringId}` }
					  ]
			}
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
				<CloseRunModal id={runId} setIsOpen={setIsCloseOpen} isOpen={isCloseOpen} />
				<InfoRunModal id={runId} setIsOpen={setIsInfoOpen} isOpen={isInfoOpen} />
				<Column sm={4} md={2} lg={3}>
					<MonitoringSummaryDetails />
				</Column>
				<Column sm={4} md={6} lg={13}>
					<RunDetailsStepContainer />
				</Column>
			</Grid>
		</PageHeader>
	);
};
export default MonitoringRunDetails;
