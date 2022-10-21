import { Tab, TabList, TabPanel, TabPanels } from '@carbon/react';
import EvidenceRequestActionTableView from '@components/EvidenceRequest/EvidenceRequestActionTableView';
import PageHeader from '@components/PageHeader';
import StickyTabs from '@components/StickyTabs';

const ActionEvidenceRequestDashboard = () => {
	return (
		<PageHeader pageTitle='Evidence Requests'>
			<StickyTabs>
				<TabList
					contained
					aria-label='List of tabs'
					className='sticky z-10 bg-background'
				>
					<Tab className='max-w-none'>Action Pending</Tab>
					<Tab className='max-w-none'>Closed</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<EvidenceRequestActionTableView view='ActionPending' />
					</TabPanel>
					<TabPanel>
						<EvidenceRequestActionTableView view='Closed' />
					</TabPanel>
				</TabPanels>
			</StickyTabs>
		</PageHeader>
	);
};

export default ActionEvidenceRequestDashboard;
