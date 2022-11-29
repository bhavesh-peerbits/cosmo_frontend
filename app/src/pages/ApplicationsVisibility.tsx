import { TabList, TabPanels, Tab, TabPanel } from '@carbon/react';
import AppsVisibilityTable from '@components/AdminPanel/AppsVisibilityTable';
import UserAppsVisibilityTable from '@components/AdminPanel/UserAppVisitbilityTable';
import PageHeader from '@components/PageHeader';
import StickyTabs from '@components/StickyTabs';
import { useTranslation } from 'react-i18next';

const ApplicationsVisibility = () => {
	const { t } = useTranslation('userAdmin');

	return (
		<PageHeader
			pageTitle={t('app-visibility')}
			intermediateRoutes={[{ name: 'Admin Panel', to: '/admin' }]}
		>
			<StickyTabs>
				<TabList
					contained
					aria-label='List of tabs'
					className='sticky z-10 bg-background'
				>
					<Tab className='max-w-none'>Users</Tab>
					<Tab className='max-w-none'>Applications</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<UserAppsVisibilityTable />
					</TabPanel>
					<TabPanel>
						<AppsVisibilityTable />
					</TabPanel>
				</TabPanels>
			</StickyTabs>
		</PageHeader>
	);
};
export default ApplicationsVisibility;
