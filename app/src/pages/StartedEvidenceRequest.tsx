import useGetEvidenceRequestById from '@api/evidence-request/useGetEvidenceRequestById';
import PageHeader from '@components/PageHeader';
import { Tab, TabList, TabPanel, TabPanels, Grid, Column } from '@carbon/react';
import StickyTabs from '@components/StickyTabs';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserFollow, Exit, EventSchedule } from '@carbon/react/icons';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import MultiAddSelect from '@components/MultiAddSelect';
import CloseEvidenceRequestModal from '@components/Modals/CloseEvidenceRequestModal';
import ReminderEvidenceRequestModal from '@components/Modals/ReminderEvidenceRequestModal';
import EvidenceRequestDetails from '@components/EvidenceRequest/EvidenceRequestDetails';
import EvidenceRequestInfo from '@components/EvidenceRequest/EvidenceRequestInfo';
import EvidenceStepInfo from '@components/EvidenceRequest/EvidenceStepInfo';

const StartedEvidenceRequest = () => {
	const { requestId = '' } = useParams<'requestId'>();
	const { data } = useGetEvidenceRequestById(requestId);
	const { t } = useTranslation(['evidenceRequest', 'userSelect', 'modals']);
	const [isCollaboratorsOpen, setIsCollaboratorsOpen] = useState(false);
	const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
	const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
	const queryClient = useQueryClient();

	if (!data) {
		return null;
	}
	return (
		<PageHeader
			pageTitle={data.code}
			intermediateRoutes={[{ name: 'Evidence Request', to: '/started-evidence-request' }]}
			actions={[
				{
					name: t('evidenceRequest:reminder'),
					icon: EventSchedule,
					onClick: () => {
						setIsReminderModalOpen(true);
					}
				},
				{
					name: t('evidenceRequest:collaborators'),
					icon: UserFollow,
					onClick: () => {
						setIsCollaboratorsOpen(true);
					}
				},
				{
					name: t('evidenceRequest:close-request'),
					icon: Exit,
					onClick: () => {
						queryClient.invalidateQueries(['evidence-request', requestId]);
						setIsCloseModalOpen(true);
					}
				}
			]}
		>
			<>
				<StickyTabs>
					<TabList
						contained
						aria-label='List of tabs'
						className='sticky z-10 bg-background'
					>
						<Tab className='max-w-none'>Request Info</Tab>
						<Tab className='max-w-none'>Steps</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Grid fullWidth narrow className='h-full'>
								<Column sm={4} md={3} lg={3}>
									<div className='pl-5 md:ml-0'>
										<EvidenceRequestDetails request={data} />
									</div>
								</Column>
								<Column sm={4} md={5} lg={13}>
									<EvidenceRequestInfo
										stepRequest={data.steps.filter(step => step.type === 'REQUEST')[0]}
										currentStep={data.currentStep}
									/>
								</Column>
							</Grid>
						</TabPanel>
						<TabPanel>
							<EvidenceStepInfo
								steps={data.steps}
								currentStep={data.currentStep}
								owner={data.creator}
							/>
						</TabPanel>
					</TabPanels>
				</StickyTabs>
				<ReminderEvidenceRequestModal
					isOpen={isReminderModalOpen}
					setIsOpen={setIsReminderModalOpen}
					evidenceRequest={data}
				/>
				<CloseEvidenceRequestModal
					isOpen={isCloseModalOpen}
					setIsOpen={setIsCloseModalOpen}
				/>
				<MultiAddSelect
					selectedItems={{
						entries: []
					}}
					items={{
						entries: []
					}}
					title={t('userSelect:select-user')}
					description={t('userSelect:select-users')}
					open={isCollaboratorsOpen}
					onSubmitButtonText={t('modals:save')}
					onSubmit={() => {}}
					onCloseButtonText={t('modals:cancel')}
					onClose={() => setIsCollaboratorsOpen(false)}
					globalSearchLabel={t('userSelect:username-email')}
					globalSearchPlaceholder={t('userSelect:find-user')}
					globalFilters={[
						{
							id: 'role',
							label: t('userSelect:role')
						}
					]}
					globalFiltersIconDescription={t('userSelect:filters')}
					globalFiltersPlaceholderText={t('userSelect:choose-option')}
					globalFiltersPrimaryButtonText={t('userSelect:apply')}
					globalFiltersSecondaryButtonText={t('userSelect:reset')}
					clearFiltersText={t('userSelect:clear-filters')}
					influencerItemTitle={t('userSelect:name')}
					influencerItemSubtitle='email'
					noResultsTitle={t('userSelect:no-results')}
					noResultsDescription={t('userSelect:different-keywords')}
				/>
			</>
		</PageHeader>
	);
};

export default StartedEvidenceRequest;
