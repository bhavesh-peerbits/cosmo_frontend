import { TabList, Tab, TabPanels, TabPanel } from '@carbon/react';
import PageHeader from '@components/PageHeader';
import StickyTabs from '@components/StickyTabs';
import RevalidationTabContent from '@components/UserRevalidation/RevalidationTabContent';

const RevalidationsOngoing = () => {
	return (
		<PageHeader pageTitle='Revalidations Ongoing'>
			<StickyTabs>
				<TabList
					contained
					aria-label='List of tabs'
					className='sticky z-10 bg-background'
				>
					<Tab className='max-w-none'>All</Tab>
					<Tab className='max-w-none'>Ongoing</Tab>
					<Tab className='max-w-none'>Closed</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<RevalidationTabContent />
					</TabPanel>
					<TabPanel>
						<RevalidationTabContent />
					</TabPanel>
					<TabPanel>
						<RevalidationTabContent />
					</TabPanel>
				</TabPanels>
			</StickyTabs>
		</PageHeader>
	);
};
export default RevalidationsOngoing;
