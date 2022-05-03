import ApplicationInfo from '@components/application-info/ApplicationInfo';
import { Tab, TabList, TabPanel, TabPanels } from '@carbon/react';
import PageHeader from '@components/PageHeader';
import { CloudDownload, Email, TrashCan } from '@carbon/react/icons';
import { useState } from 'react';
import ProcedureInfo from '@components/ProcedureInfo';
import ApplicationChangesContainer from '@components/ApplicationChangesContainer';
import ApplicationReviewModal from '@components/ApplicationReviewModal';
import GenerateModal from '@components/GenerateModal';
import DeleteModal from '@components/DeleteModal';
import { Navigate, useParams } from 'react-router-dom';
import StickyTabs from '@components/StickyTabs';
import useGetApps from '@api/management/useGetApps';

const ApplicationDetail = () => {
	const { appId } = useParams<'appId'>();
	const { data = [] } = useGetApps();

	const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const application = data.find(app => app.id === appId);
	if (!application) {
		return <Navigate to='/404' replace />;
	}

	return (
		<PageHeader
			pageTitle='ApplicationName'
			intermediateRoutes={[{ name: 'Management', to: '/management' }]}
			actions={[
				{
					name: 'Application Review',
					icon: Email,
					onClick: () => {
						setIsReviewModalOpen(true);
					}
				},
				{
					name: 'Generate',
					icon: CloudDownload,
					onClick: () => {
						setIsGenerateModalOpen(true);
					}
				},
				{
					name: 'Delete',
					icon: TrashCan,
					onClick: () => {
						setIsDeleteModalOpen(true);
					}
				}
			]}
		>
			<>
				<StickyTabs>
					<TabList
						className='sticky z-[9] bg-background'
						contained
						aria-label='List of tabs'
					>
						<Tab>Application Info</Tab>
						<Tab>Procedure Info</Tab>
						<Tab>Changes</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<ApplicationInfo />
						</TabPanel>
						<TabPanel>
							<ProcedureInfo />
						</TabPanel>
						<TabPanel>
							<ApplicationChangesContainer />
						</TabPanel>
					</TabPanels>
				</StickyTabs>

				<ApplicationReviewModal
					isOpen={isReviewModalOpen}
					setIsOpen={setIsReviewModalOpen}
				/>
				<GenerateModal isOpen={isGenerateModalOpen} setIsOpen={setIsGenerateModalOpen} />
				<DeleteModal
					isOpen={isDeleteModalOpen}
					setIsOpen={setIsDeleteModalOpen}
					itemToDelete='ApplicationName'
				/>
			</>
		</PageHeader>
	);
};
export default ApplicationDetail;
