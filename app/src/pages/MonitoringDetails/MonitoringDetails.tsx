import PageHeader from '@components/PageHeader';
import { CloseOutline, Collaborate, Group } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CloseMonitoringModal from './Modals/CloseMonitoringModal';
import EditFocalPointModal from './Modals/EditFocalPointModal';

const MonitoringDetails = () => {
	const { t } = useTranslation('evidenceRequest');
	const { monitoringId = '' } = useParams();
	const [modalToOpen, setModalToOpen] = useState<string>();
	return (
		<PageHeader
			pageTitle='Monitoring Name'
			actions={[
				{ name: t('collaborators'), onClick: () => {}, icon: Collaborate },
				{
					name: 'Focal Point',
					onClick: () => {
						setModalToOpen('focalPoint');
					},
					icon: Group
				},
				{
					name: t('close'),
					onClick: () => {
						setModalToOpen('close');
					},
					icon: CloseOutline
				}
			]}
		>
			<>
				<CloseMonitoringModal
					isOpen={modalToOpen === 'close'}
					setIsOpen={setModalToOpen}
					id={monitoringId}
				/>
				<EditFocalPointModal
					isOpen={modalToOpen === 'focalPoint'}
					setIsOpen={setModalToOpen}
				/>
			</>
		</PageHeader>
	);
};
export default MonitoringDetails;
