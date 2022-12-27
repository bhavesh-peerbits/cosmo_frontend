import PageHeader from '@components/PageHeader';
import { CloseOutline, Collaborate, Group } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CloseMonitoringModal from './Modals/CloseMonitoringModal';

const MonitoringDetails = () => {
	const { t } = useTranslation('evidenceRequest');
	const { monitoringId = '' } = useParams();
	const [modalOpen, setModalOpen] = useState<string>();
	return (
		<PageHeader
			pageTitle='Monitoring Name'
			actions={[
				{ name: t('collaborators'), onClick: () => {}, icon: Collaborate },
				{ name: 'Focal Point', onClick: () => {}, icon: Group },
				{
					name: t('close'),
					onClick: () => {
						setModalOpen('close');
					},
					icon: CloseOutline
				}
			]}
		>
			<CloseMonitoringModal
				isOpen={!!modalOpen}
				setIsOpen={setModalOpen}
				id={monitoringId}
			/>
		</PageHeader>
	);
};
export default MonitoringDetails;
