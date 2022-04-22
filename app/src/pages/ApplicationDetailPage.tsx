import ApplicationInfo from '@components/ApplicationInfo';
import ApplicationHeader from '@components/ApplicationHeader';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';

const ApplicationDetailPage = () => {
	return (
		<div className='h-full'>
			<ApplicationHeader />
			<div className='h-full'>
				<Tabs>
					<TabList contained ariaLabel='List of tabs'>
						<Tab>Application Info</Tab>
						<Tab>Procedure Info</Tab>
						<Tab>Application Changes</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<ApplicationInfo />
						</TabPanel>
						<TabPanel>
							<div>Changes</div>
						</TabPanel>
						<TabPanel>
							<div>TEST</div>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</div>
		</div>
	);
};
export default ApplicationDetailPage;
