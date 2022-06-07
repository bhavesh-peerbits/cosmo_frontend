import ApplicationInfo from '@components/application-info/ApplicationInfo';
import { Tab, TabList, TabPanel, TabPanels } from '@carbon/react';
import PageHeader from '@components/PageHeader';
import { CloudDownload, Email, TrashCan } from '@carbon/react/icons';
import { useState } from 'react';
import ProcedureInfo from '@components/procedure-info/ProcedureInfo';
import ApplicationChangesContainer from '@components/application-changes/ApplicationChangesContainer';
import ApplicationReviewModal from '@components/Modals/ApplicationReviewModal';
import GenerateModal from '@components/Modals/GenerateModal';
import { useParams } from 'react-router-dom';
import StickyTabs from '@components/StickyTabs';
import useGetApp from '@api/management/useGetApp';
import DeleteAppModal from '@components/Modals/DeleteAppModal';
import { useTranslation } from 'react-i18next';

const ApplicationDetail = () => {
	const { t } = useTranslation('management');
	const { appId = '' } = useParams<'appId'>();
	const { data } = useGetApp(appId);

	const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	if (!data) {
		return null;
	}

	return (
		<PageHeader
			pageTitle={data.name}
			intermediateRoutes={[{ name: 'Management', to: '/management' }]}
			actions={[
				{
					name: t('application-review'),
					icon: Email,
					onClick: () => {
						setIsReviewModalOpen(true);
					}
				},
				{
					name: 'Narrative',
					icon: CloudDownload,
					onClick: () => {
						setIsGenerateModalOpen(true);
					}
				},
				{
					name: t('delete'),
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
						className='sticky z-10 bg-background'
						contained
						aria-label='List of tabs'
					>
						<Tab>{t('application-info')}</Tab>
						<Tab>{t('procedure-info')}</Tab>
						<Tab>{t('changes')}</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<ApplicationInfo application={data} />
						</TabPanel>
						<TabPanel>
							<ProcedureInfo />
						</TabPanel>
						<TabPanel>
							<ApplicationChangesContainer appId={appId} />
						</TabPanel>
					</TabPanels>
				</StickyTabs>

				<ApplicationReviewModal
					appId={appId}
					owner={data.owner}
					isOpen={isReviewModalOpen}
					setIsOpen={setIsReviewModalOpen}
				/>
				<GenerateModal
					isOpen={isGenerateModalOpen}
					setIsOpen={setIsGenerateModalOpen}
					application={data}
				/>
				<DeleteAppModal
					isOpen={isDeleteModalOpen}
					setIsOpen={setIsDeleteModalOpen}
					id={data.id}
				/>
			</>
		</PageHeader>
	);
};
export default ApplicationDetail;
