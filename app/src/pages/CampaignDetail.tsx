import PageHeader from '@components/PageHeader';
import { UserFollow, Download } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { TabList, Tab, TabPanels, TabPanel } from '@carbon/react';
import StickyTabs from '@components/StickyTabs';
import { useState } from 'react';
import CloseCampaignModal from '@components/Modals/CloseCampaignModal';
import useGetUsers from '@api/user/useGetUsers';
import MultiAddSelect from '@components/MultiAddSelect';

const CampaignDetail = () => {
	const { t } = useTranslation('userRevalidation');
	const { t: tSelect } = useTranslation('userSelect');
	const { t: tModals } = useTranslation('modals');
	const { data: users = [] } = useGetUsers();
	const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
	const [isCollaboratorsOpen, setIsCollaboratorsOpen] = useState(false);
	return (
		<PageHeader
			pageTitle='Campaign Name'
			intermediateRoutes={[
				{ name: 'Revalidations Ongoing', to: '/revalidations-ongoing' }
			]}
			actions={[
				{
					name: t('collaborators'),
					icon: UserFollow,
					onClick: () => {
						setIsCollaboratorsOpen(true);
					}
				},
				{
					name: 'Download',
					icon: Download,
					onClick: () => {}
				},
				{
					name: t('close-campaign'),
					onClick: () => {
						setIsCloseModalOpen(true);
					}
				}
			]}
		>
			<>
				<StickyTabs>
					<TabList
						className='sticky z-10 bg-background'
						contained
						aria-label='List of tabs'
					>
						<Tab>Application 1</Tab>
						<Tab>Application 2</Tab>
						<Tab>Application 3</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<div>ciao</div>
						</TabPanel>
						<TabPanel>
							<div>ciao</div>
						</TabPanel>
						<TabPanel>
							<div>ciao3</div>
						</TabPanel>
					</TabPanels>
				</StickyTabs>
				<CloseCampaignModal isOpen={isCloseModalOpen} setIsOpen={setIsCloseModalOpen} />
				<MultiAddSelect
					items={{
						entries: users.map(u => ({
							id: u.id,
							title: u.displayName,
							tagInfo: u.principalRole,
							subtitle: u.email || tSelect('no-email'),
							role: u.principalRole,
							avatar: {
								imageDescription: u.username,
								initials: u.displayName
							}
						}))
					}}
					title={tSelect('select-user')}
					description={tSelect('select-users')}
					open={isCollaboratorsOpen}
					onSubmitButtonText={tModals('save')}
					onSubmit={() => setIsCollaboratorsOpen(false)}
					onCloseButtonText={tModals('cancel')}
					onClose={() => setIsCollaboratorsOpen(false)}
					globalSearchLabel={tSelect('username-email')}
					globalSearchPlaceholder={tSelect('find-user')}
					globalFilters={[
						{
							id: 'role',
							label: tSelect('role')
						}
					]}
					globalFiltersIconDescription={tSelect('filters')}
					globalFiltersPlaceholderText={tSelect('choose-option')}
					globalFiltersPrimaryButtonText={tSelect('apply')}
					globalFiltersSecondaryButtonText={tSelect('reset')}
					clearFiltersText={tSelect('clear-filters')}
					influencerItemTitle={tSelect('name')}
					influencerItemSubtitle='email'
					noResultsTitle={tSelect('no-results')}
					noResultsDescription={tSelect('different-keywords')}
					// TODO Add selected items
				/>
			</>
		</PageHeader>
	);
};
export default CampaignDetail;
