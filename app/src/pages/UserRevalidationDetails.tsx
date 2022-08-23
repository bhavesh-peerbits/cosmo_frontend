import {
	ActionableNotification,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	ToastNotification
} from '@carbon/react';
import PageHeader from '@components/PageHeader';
import StickyTabs from '@components/StickyTabs';
import RevalidationUsersContainer from '@components/reviewCampaign/RevalidationUsersContainer';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserRevalidationDetails = () => {
	const { t } = useTranslation(['userSelect', 'management', 'userRevalidation']);
	const [isCampaignCompleted, setIsCampaignCompleted] = useState<boolean>();
	const navigate = useNavigate();
	return (
		<>
			<div className='absolute  flex w-full place-content-end pt-3 pr-3'>
				<div className='z-[12] flex flex-col items-stretch justify-items-stretch space-y-3'>
					{isCampaignCompleted && (
						<>
							<ToastNotification
								kind='success'
								lowContrast
								title={`${t('userRevalidation:revalidation-completed')}`}
								subtitle={`${t('userRevalidation:revalidation-completed-toast', {
									date: new Date().toLocaleDateString()
								})}.`} // TODO change date with due date
							/>
							<div className='flex justify-end'>
								<ActionableNotification
									kind='info'
									lowContrast
									title={t('userRevalidation:campaigns-left', { number: 'N' })} // TODO change number with real campaigns number
									subtitle={`${t('userRevalidation:campaign-left-toast', {
										number: 'N',
										application: 'App Name'
									})}.`}
									actionButtonLabel='Dashboard'
									onActionButtonClick={() => navigate('/user-revalidation')}
								/>
							</div>
						</>
					)}
				</div>
			</div>

			<PageHeader
				pageTitle='Campaign Name (TYPE)'
				intermediateRoutes={[{ name: 'User Revalidation', to: '/user-revalidation' }]}
			>
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
							<RevalidationUsersContainer
								setIsCampaignCompleted={setIsCampaignCompleted}
							/>
						</TabPanel>
						<TabPanel>info</TabPanel>
					</TabPanels>
				</StickyTabs>
			</PageHeader>
		</>
	);
};
export default UserRevalidationDetails;
