import {
	ActionableNotification,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	ToastNotification
} from '@carbon/react';
import { Group, InformationSquare } from '@carbon/react/icons';
import RevalidationUsersContainer from '@components/reviewCampaign/RevalidationUsersContainer';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignApplication from '@model/CampaignApplication';

interface UserRevalidationTabContentProps {
	review: CampaignApplication;
}

const UserRevalidationTabContent = ({ review }: UserRevalidationTabContentProps) => {
	const { t } = useTranslation(['userSelect', 'management', 'userRevalidation']);
	const [isCampaignCompleted, setIsCampaignCompleted] = useState<boolean>();
	const navigate = useNavigate();

	return (
		<>
			<div className='absolute top-0 flex w-full place-content-end pt-3 pr-3'>
				<div className='z-[12] flex flex-col items-stretch justify-items-stretch space-y-3'>
					{isCampaignCompleted && (
						<>
							<ToastNotification
								kind='success'
								lowContrast
								title={`${t('userRevalidation:revalidation-completed')}`}
								subtitle={`${t('userRevalidation:revalidation-completed-toast', {
									date: review.campaign.dueDate
								})}.`}
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
						<Tab>
							<div className='flex items-center space-x-3'>
								<InformationSquare size={20} />
								<span>{t('management:application-info')}</span>
							</div>
						</Tab>
					</TabList>
					<TabPanels>
						<TabPanel className='bg-layer-1'>
							<RevalidationUsersContainer
								key={review.id}
								review={review}
								setIsCampaignCompleted={setIsCampaignCompleted}
							/>
						</TabPanel>
						<TabPanel>info</TabPanel>
					</TabPanels>
				</Tabs>
			</div>
		</>
	);
};
export default UserRevalidationTabContent;
