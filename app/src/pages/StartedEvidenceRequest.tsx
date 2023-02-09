import useGetEvidenceRequestById from '@api/evidence-request/useGetEvidenceRequestById';
import PageHeader from '@components/PageHeader';
import { Tab, TabList, TabPanel, TabPanels, Grid, Column } from '@carbon/react';
import StickyTabs from '@components/StickyTabs';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Collaborate, Exit, EventSchedule } from '@carbon/react/icons';
import { useCallback, useState } from 'react';
import MultiAddSelect from '@components/MultiAddSelect';
import CloseEvidenceRequestModal from '@components/Modals/CloseEvidenceRequestModal';
import ReminderEvidenceRequestModal from '@components/Modals/ReminderEvidenceRequestModal';
import EvidenceRequestDetails from '@pages/ActionEvidenceRequest/Components/EvidenceRequestDetails';
import EvidenceRequestInfo from '@pages/ActionEvidenceRequest/Components/EvidenceRequestInfo';
import EvidenceStepInfo from '@components/EvidenceRequest/EvidenceStepInfo';
import { UserRoleEnum } from '@model/UserRole';
import User, { fromUserApi } from '@model/User';
import useAddCollaboratorsToEvidence from '@api/evidence-request/useAddCollaboratorsToEvidence';
import useGetUsersByRoles from '@api/user/useGetUsersByRoles';
import EvidenceRequestStepRequestForm from '@components/EvidenceRequest/EvidenceRequestStepRequestForm';

const StartedEvidenceRequest = () => {
	const { requestId = '' } = useParams<'requestId'>();
	const { data } = useGetEvidenceRequestById(requestId);
	const { t } = useTranslation(['evidenceRequest', 'userSelect', 'modals']);
	const [isCollaboratorsOpen, setIsCollaboratorsOpen] = useState(false);
	const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
	const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
	const { mutateAsync: mutateCollaborators } = useAddCollaboratorsToEvidence();
	const { data: possibleCollaborators } = useGetUsersByRoles(
		UserRoleEnum.RequestAnalyst,
		UserRoleEnum.RequestAdmin
	);
	const path = `${new Date().getFullYear()}/${data?.application.codeName}/${
		data?.workflowName
	}/${data?.code}/`.replaceAll(' ', '');

	const handleAddCollaborators = useCallback(
		(selection: string[]) => {
			return mutateCollaborators({
				id: +`${data?.id}`,
				userIds: selection
			}).then(() => setIsCollaboratorsOpen(false));
		},
		[data?.id, mutateCollaborators]
	);
	const userMapper = (u: User) => ({
		id: u.id,
		title: u.displayName,
		tagInfo: u.principalRole,
		subtitle: u.email || t('userSelect:no-email'),
		role: u.principalRole,
		avatar: {
			imageDescription: u.username,
			initials: u.displayName
		}
	});

	if (!data) {
		return null;
	}
	return (
		<PageHeader
			pageTitle={`${data.code} - ${data.name}`}
			intermediateRoutes={[{ name: 'Evidence Request', to: '/started-evidence-request' }]}
			actions={[
				{
					name: t('evidenceRequest:reminder'),
					icon: EventSchedule,
					disabled: data.status !== 'DRAFT' && data.status !== 'IN_PROGRESS',
					onClick: () => {
						setIsReminderModalOpen(true);
					}
				},
				{
					name: t('evidenceRequest:collaborators'),
					icon: Collaborate,
					disabled: data.status !== 'DRAFT' && data.status !== 'IN_PROGRESS',
					onClick: () => {
						setIsCollaboratorsOpen(true);
					}
				},
				{
					name: t('evidenceRequest:close-request'),
					icon: Exit,
					onClick: () => {
						setIsCloseModalOpen(true);
					},
					disabled: data.status !== 'IN_PROGRESS'
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
							<Grid fullWidth narrow className='h-full space-y-5 py-3 md:space-y-0'>
								<Column sm={4} md={3} lg={3}>
									<div className='pl-6 md:ml-0'>
										<EvidenceRequestDetails request={data} />
									</div>
								</Column>
								<Column sm={4} md={5} lg={13} className='pl-5 pr-3'>
									{`${data.currentStep}` !== '1' ? (
										<EvidenceRequestInfo
											stepRequest={data.steps.filter(step => step.type === 'REQUEST')[0]}
											currentStep={data.currentStep}
											status={data.status}
											path={path}
										/>
									) : (
										<EvidenceRequestStepRequestForm
											erId={data.id}
											path={path}
											step={data.steps.filter(step => step.type === 'REQUEST')[0]}
										/>
									)}
								</Column>
							</Grid>
						</TabPanel>
						<TabPanel>
							<Grid fullWidth narrow className='h-full space-y-5 py-3 md:space-y-0'>
								<Column sm={4} md={3} lg={3}>
									<div className='pl-6 md:ml-0'>
										<EvidenceRequestDetails request={data} />
									</div>
								</Column>
								<Column sm={4} md={5} lg={13} className='pl-5 pr-3'>
									<EvidenceStepInfo
										steps={data.steps}
										currentStep={data.currentStep}
										owner={data.creator}
										stepBeforeReturn={data.stepBeforeReturn}
									/>
								</Column>
							</Grid>
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
					stepReq={data.steps.filter(step => step.type === 'REQUEST')[0]}
					erId={+data.id}
				/>
				<MultiAddSelect
					selectedItems={{
						entries: data.contributors.map(userMapper)
					}}
					items={{
						entries: possibleCollaborators
							? possibleCollaborators
									.filter(user => data.creator.id !== user.id)
									.map(us => userMapper(fromUserApi(us)))
							: []
					}}
					title={t('userSelect:select-user')}
					description={t('userSelect:select-users')}
					open={isCollaboratorsOpen}
					onSubmitButtonText={t('modals:save')}
					onSubmit={selection => handleAddCollaborators(selection)}
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
