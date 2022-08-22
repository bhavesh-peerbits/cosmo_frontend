import { Tab, TabList, TabPanel, TabPanels } from '@carbon/react';
import PageHeader from '@components/PageHeader';
import StickyTabs from '@components/StickyTabs';
import RevalidationUsersContainer from '@components/reviewCampaign/RevalidationUsersContainer';
import { useTranslation } from 'react-i18next';

const UserRevalidationDetails = () => {
	const { t } = useTranslation(['userSelect', 'management']);
	return (
		<PageHeader pageTitle='Campaign Name (TYPE)'>
			<StickyTabs>
				<TabList
					className='sticky z-10 bg-background'
					contained
					aria-label='List of tabs'
				>
					<Tab>{t('userSelect:users')}</Tab>
					<Tab>{t('management:application-info')}</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<RevalidationUsersContainer />
					</TabPanel>
					<TabPanel>info</TabPanel>
				</TabPanels>
			</StickyTabs>
		</PageHeader>
	);
};
export default UserRevalidationDetails;
