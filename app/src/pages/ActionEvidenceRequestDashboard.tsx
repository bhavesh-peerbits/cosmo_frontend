import { Tab, TabList, TabPanel, TabPanels } from '@carbon/react';
import EvidenceRequestActionTableView from '@components/EvidenceRequest/EvidenceRequestActionTableView';
import EvidenceRequestActionTileView from '@components/EvidenceRequest/EvidenceRequestActionTileView';
import PageHeader from '@components/PageHeader';
import StickyTabs from '@components/StickyTabs';
import useEvidenceRequestAction from '@hooks/evidence-request/useEvidenceRequestAction';

const ActionEvidenceRequestDashboard = () => {
	const { filters } = useEvidenceRequestAction();
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
						{filters.isTile ? (
							<EvidenceRequestActionTileView />
						) : (
							<EvidenceRequestActionTableView view='ActionPending' />
						)}
					</TabPanel>
					<TabPanel>
						{filters.isTile ? (
							<EvidenceRequestActionTileView />
						) : (
							<EvidenceRequestActionTableView view='Closed' />
						)}
					</TabPanel>
				</TabPanels>
			</StickyTabs>
		</PageHeader>
	);
};

export default ActionEvidenceRequestDashboard;
