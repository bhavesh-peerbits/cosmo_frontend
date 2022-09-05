import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import { Group } from '@carbon/react/icons';
import RevalidationUsersContainer from '@components/reviewCampaign/RevalidationUsersContainer';
import { useTranslation } from 'react-i18next';
import CampaignApplication from '@model/CampaignApplication';

interface UserRevalidationTabContentProps {
	review: CampaignApplication;
}

const UserRevalidationTabContent = ({ review }: UserRevalidationTabContentProps) => {
	const { t } = useTranslation(['userSelect', 'management', 'userRevalidation']);

	return (
		<div className='h-fit'>
			<div className='mb-8 mt-3'>
				<h2 className='flex h-full flex-wrap text-productive-heading-4'>
					Answers Review
				</h2>
				<p className='mt-2 w-1/2 text-text-secondary text-caption-2'>
					Review all your answers and the relative application associated to them.
				</p>
			</div>
			<Tabs>
				<TabList contained aria-label='List of tabs'>
					<Tab>
						<div className='flex items-center space-x-3'>
							<Group size={20} />
							<span>{t('userSelect:users')}</span>
						</div>
					</Tab>
					{/* <Tab> */}
					{/*	<div className='flex items-center space-x-3'> */}
					{/*		<InformationSquare size={20} /> */}
					{/*		<span>{t('management:application-info')}</span> */}
					{/*	</div> */}
					{/* </Tab> */}
				</TabList>
				<TabPanels>
					<TabPanel className='bg-layer-1'>
						<RevalidationUsersContainer key={review.id} review={review} />
					</TabPanel>
					{/* <TabPanel>info</TabPanel> */}
				</TabPanels>
			</Tabs>
		</div>
	);
};
export default UserRevalidationTabContent;
