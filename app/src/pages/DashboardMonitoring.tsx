import PageHeader from '@components/PageHeader';
import StickyTabs from '@components/StickyTabs';
import { TabList, Tab, TabPanels, TabPanel } from '@carbon/react';
import DashboardMonitoringContent from '@components/DashboardMonitoring/DashboardMonitoringContent';
import { useTranslation } from 'react-i18next';

const DashboardMonitoring = () => {
	const { t } = useTranslation('dashboardMonitoring');
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
					<TabPanel>
						<DashboardMonitoringContent view='all' />
					</TabPanel>
					<TabPanel>
						<DashboardMonitoringContent view='pending' />
					</TabPanel>
					<TabPanel>
						<DashboardMonitoringContent view='ongoing' />
					</TabPanel>
					<TabPanel>
						<DashboardMonitoringContent view='completed' />
					</TabPanel>
				</TabPanels>
			</StickyTabs>
		</PageHeader>
	);
};
export default DashboardMonitoring;
