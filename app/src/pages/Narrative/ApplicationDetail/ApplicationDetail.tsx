import ApplicationInfo from '@pages/Narrative/ApplicationDetail/Components/ApplicationInfo';
import { Tab, TabList, TabPanel, TabPanels } from '@carbon/react';
import PageHeader from '@components/PageHeader';
import { CloudDownload, Email } from '@carbon/react/icons';
import { useState } from 'react';
import ProcedureInfo from '@pages/Narrative/ApplicationDetail/Containers/ProcedureInfo';
import ApplicationChangesContainer from '@pages/Narrative/ApplicationDetail/Containers/ApplicationChangesContainer';
import ApplicationReviewModal from '@pages/Narrative/ApplicationDetail/Modals/ApplicationReviewModal';
import { useParams } from 'react-router-dom';
import StickyTabs from '@components/StickyTabs';
import useGetApp from '@api/management/useGetApp';
import { useTranslation } from 'react-i18next';
import ApplicationInstances from '@pages/Narrative/ApplicationDetail/Containers/ApplicationInstances';
import GenerateModal from './Modals/GenerateModal';
import DeleteAppModal from './Modals/DeleteAppModal';

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
				}
				// {
				// 	name: t('delete'),
				// 	icon: TrashCan,
				// 	onClick: () => {
				// 		setIsDeleteModalOpen(true);
				// 	}
				// } // TODO Delete comments when endpoint will be fixed
			]}
		>
			<>
				<StickyTabs>
					<TabList
						className='sticky z-[1000] bg-background'
						contained
						aria-label='List of tabs'
					>
						<Tab>{t('application-info')}</Tab>
						<Tab>{t('procedure-info')}</Tab>
						<Tab>{t('instances')}</Tab>
						<Tab>{t('changes')}</Tab>
					</TabList>
					<TabPanels>
						<TabPanel className='pl-container-1 pr-0'>
							<ApplicationInfo application={data} />
						</TabPanel>
						<TabPanel className='pl-container-1 pr-0'>
							<ProcedureInfo />
						</TabPanel>
						<TabPanel className='pl-container-1 pr-0'>
							<ApplicationInstances application={data} />
						</TabPanel>
						<TabPanel className='p-0 px-3'>
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
