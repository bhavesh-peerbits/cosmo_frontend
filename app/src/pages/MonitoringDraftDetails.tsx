import PageHeader from '@components/PageHeader';
import { useTranslation } from 'react-i18next';
import { Group, Send, Report } from '@carbon/react/icons';

const MonitoringDraftDetails = () => {
	const { t } = useTranslation(['evidenceRequest', 'changeMonitoring', 'modals']);
	return (
		<PageHeader
			pageTitle='title'
			actions={[
				{ name: t('evidenceRequest:collaborators'), onClick: () => {}, icon: Group },
				{ name: t('changeMonitoring:start-monitoring'), onClick: () => {}, icon: Send },
				{
					name: t('changeMonitoring:show-recap'),
					onClick: () => {},
					icon: Report,
					kind: 'secondary'
				}
			]}
		>
			<div>content</div>
		</PageHeader>
	);
};
export default MonitoringDraftDetails;
