import PageHeader from '@components/PageHeader';
import { useTranslation } from 'react-i18next';
import { Group, Send, Report } from '@carbon/react/icons';
import { useState } from 'react';
import MonitoringDraftRecapModal from '@components/Modals/MonitoringDraftRecapModal';

const MonitoringDraftDetails = () => {
	const { t } = useTranslation(['evidenceRequest', 'changeMonitoring', 'modals']);
	const [isRecapOpen, setIsRecapOpen] = useState({ open: false, shouldStart: false });
	return (
		<PageHeader
			pageTitle='title'
			intermediateRoutes={[{ name: 'New Monitoring', to: '/new-monitoring' }]}
			actions={[
				{ name: t('evidenceRequest:collaborators'), onClick: () => {}, icon: Group },
				{
					name: t('changeMonitoring:start-monitoring'),
					onClick: () => {
						setIsRecapOpen({ open: true, shouldStart: true });
					},
					icon: Send
				},
				{
					name: t('changeMonitoring:show-recap'),
					onClick: () => {
						setIsRecapOpen({ open: true, shouldStart: false });
					},
					icon: Report,
					kind: 'secondary'
				}
			]}
		>
			<div>
				<MonitoringDraftRecapModal isOpen={isRecapOpen} setIsOpen={setIsRecapOpen} />
			</div>
		</PageHeader>
	);
};
export default MonitoringDraftDetails;
