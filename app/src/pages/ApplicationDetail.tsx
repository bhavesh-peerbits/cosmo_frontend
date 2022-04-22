import ApplicationInfo from '@components/ApplicationInfo';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import PageHeader from '@components/PageHeader';
import { CloudDownload, Email, TrashCan } from '@carbon/react/icons';

const ApplicationDetail = () => {
	return (
		<PageHeader
			pageTitle='ApplicationName'
			intermediateRoutes={[{ name: 'Management', to: '/management' }]}
			actions={[
				{
					name: 'Application Review',
					icon: Email,
					onClick: () => {}
				},
				{
					name: 'Generate',
					icon: CloudDownload,
					onClick: () => {}
				},
				{
					name: 'Delete',
					icon: TrashCan,
					onClick: () => {}
				}
			]}
		>
			<div className='h-full'>
				<Tabs>
					<TabList contained aria-label='List of tabs'>
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
		</PageHeader>
	);
};
export default ApplicationDetail;
