import PageHeader from '@components/PageHeader';
import StickyTabs from '@components/StickyTabs';
import { TabList, Tab, TabPanels, TabPanel } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import MonitoringDashboardContent from './Containers/MonitoringDashboardContent';

const MonitoringDashboard = () => {
	const { t } = useTranslation('monitoringDashboard');
	return (
		<PageHeader pageTitle='Change Monitoring Dashboard'>
			<StickyTabs>
				<TabList
					contained
					aria-label='List of tabs'
					className='sticky z-10 bg-background'
				>
					<Tab className='max-w-none'>{t('all')}</Tab>
					<Tab className='max-w-none'>{t('pending')}</Tab>
					<Tab className='max-w-none'>{t('ongoing')}</Tab>
					<Tab className='max-w-none'>{t('completed')}</Tab>
				</TabList>
				<TabPanels>
					<TabPanel className='p-container-1'>
						<MonitoringDashboardContent />
					</TabPanel>
					<TabPanel className='p-container-1'>
						<MonitoringDashboardContent />
					</TabPanel>
					<TabPanel className='p-container-1'>
						<MonitoringDashboardContent />
					</TabPanel>
					<TabPanel className='p-container-1'>
						<MonitoringDashboardContent />
					</TabPanel>
				</TabPanels>
			</StickyTabs>
		</PageHeader>
	);
};
export default MonitoringDashboard;
