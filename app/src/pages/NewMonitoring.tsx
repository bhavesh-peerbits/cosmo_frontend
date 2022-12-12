import { Add } from '@carbon/react/icons';
import PageHeader from '@components/PageHeader';
import { useTranslation } from 'react-i18next';

const NewMonitoring = () => {
	const { t } = useTranslation('changeMonitoring');
	return (
		<PageHeader
			pageTitle='New Monitoring'
			actions={[{ name: t('new-monitoring'), icon: Add, onClick: () => {} }]}
		>
			<div>content</div>
		</PageHeader>
	);
};
export default NewMonitoring;
