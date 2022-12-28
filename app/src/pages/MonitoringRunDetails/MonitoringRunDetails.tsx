import PageHeader from '@components/PageHeader';
import { useParams } from 'react-router-dom';
import { CloseOutline } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import CloseRunModal from './Modals/CloseRunModal';

const MonitoringRunDetails = () => {
	const { monitoringId = '', runId = '' } = useParams();
	const { t } = useTranslation('runDetails');

	const [isCloseOpen, setIsCloseOpen] = useState(false);

	// TODO Change monitoring name in breadcrumb

	return (
		<PageHeader
			pageTitle='MONITORING NAME - RUN NUMBER'
			intermediateRoutes={[
				{ name: 'Change Monitoring Dashboard', to: '/monitoring-dashboard' },
				{ name: 'Monitoring Name', to: `/monitoring-dashboard/${monitoringId}` }
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
			<CloseRunModal id={runId} setIsOpen={setIsCloseOpen} isOpen={isCloseOpen} />
		</PageHeader>
	);
};
export default MonitoringRunDetails;
