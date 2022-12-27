import PageHeader from '@components/PageHeader';
import { CloseOutline, Collaborate, Group } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';

const StartedMonitoringDetails = () => {
	const { t } = useTranslation('evidenceRequest');
	return (
		<PageHeader
			pageTitle='Monitoring Name'
			actions={[
				{ name: t('collaborators'), onClick: () => {}, icon: Collaborate },
				{ name: 'Focal Point', onClick: () => {}, icon: Group },
				{ name: t('close'), onClick: () => {}, icon: CloseOutline }
			]}
		>
			<div>content</div>
		</PageHeader>
	);
};
export default StartedMonitoringDetails;
