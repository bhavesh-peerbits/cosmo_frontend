import { Tab, TabList, TabPanel, TabPanels } from '@carbon/react';
import EvidenceRequestsTableView from '@components/EvidenceRequest/EvidenceRequestsTableView';
import PageHeader from '@components/PageHeader';
import StickyTabs from '@components/StickyTabs';

const StartedEvidenceRequestDashboard = () => {
	return (
		<PageHeader pageTitle='Evidence Requests'>
			<StickyTabs>
				<TabList
					contained
					aria-label='List of tabs'
					className='sticky z-10 bg-background'
				>
					<Tab className='w-[200px]'>On Going</Tab>
					<Tab className='w-[200px]'>Closed</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<EvidenceRequestsTableView view='OnGoing' />
					</TabPanel>
					<TabPanel>
						<EvidenceRequestsTableView view='Closed' />
					</TabPanel>
				</TabPanels>
			</StickyTabs>
		</PageHeader>
	);
};

export default StartedEvidenceRequestDashboard;
