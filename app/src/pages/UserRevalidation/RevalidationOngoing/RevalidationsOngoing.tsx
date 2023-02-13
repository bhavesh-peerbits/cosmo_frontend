import { TabList, Tab, TabPanels, TabPanel } from '@carbon/react';
import PageHeader from '@components/PageHeader';
import StickyTabs from '@components/StickyTabs';
import RevalidationTabContent from '@pages/UserRevalidation/RevalidationOngoing/Containers/RevalidationTabContent';
import { useTranslation } from 'react-i18next';

const RevalidationsOngoing = () => {
	const { t } = useTranslation('userRevalidation');
	return (
		<PageHeader pageTitle='User Revalidation Dashboard'>
			<StickyTabs>
				<TabList
					contained
					aria-label='List of tabs'
					className='sticky z-10 bg-background'
				>
					<Tab className='max-w-none'>{t('all')}</Tab>
					<Tab className='max-w-none'>{t('ongoing')}</Tab>
					<Tab className='max-w-none'>{t('closed')}</Tab>
				</TabList>
				<TabPanels>
					<TabPanel className='p-0'>
						<RevalidationTabContent />
					</TabPanel>
					<TabPanel className='p-0'>
						<RevalidationTabContent />
					</TabPanel>
					<TabPanel className='p-0'>
						<RevalidationTabContent />
					</TabPanel>
				</TabPanels>
			</StickyTabs>
		</PageHeader>
	);
};
export default RevalidationsOngoing;
