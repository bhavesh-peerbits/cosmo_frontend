import PageHeader from '@components/PageHeader';
import StickyTabs from '@components/StickyTabs';
import { TabList, TabPanel, TabPanels, Tab } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import ChangeMonitoringInboxContent from './Containers/ChangeMonitoringInboxContent';

const ChangeMonitoringInbox = () => {
	const { t } = useTranslation('monitoringDashboard');
	return (
		<PageHeader pageTitle='Change Monitoring'>
			<StickyTabs>
				<TabList
					contained
					aria-label='List of tabs'
					className='sticky z-10 bg-background'
				>
					<Tab className='max-w-none'>{t('all')}</Tab>
					<Tab className='max-w-none'>{t('pending')}</Tab>
					<Tab className='max-w-none'>{t('completed')}</Tab>
				</TabList>
				<TabPanels>
					<TabPanel className='p-container-1'>
						<ChangeMonitoringInboxContent />
					</TabPanel>
					<TabPanel className='p-container-1'>
						<ChangeMonitoringInboxContent />
					</TabPanel>
					<TabPanel className='p-container-1'>
						<ChangeMonitoringInboxContent />
					</TabPanel>
				</TabPanels>
			</StickyTabs>
		</PageHeader>
	);
};
export default ChangeMonitoringInbox;
