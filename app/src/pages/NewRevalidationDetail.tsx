import PageHeader from '@components/PageHeader';
import { Email, TrashCan, Upload } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import SendRevalidationModal from '@components/Modals/SendRevalidationModal';
import DeleteCampaignModal from '@components/Modals/DeleteCampaignModal';
import { Grid, Button, Tile } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import TableOfContents from '@components/TableOfContents';
import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import UploadFileModal from '@components/Modals/UploadFileModal';
import UploadResultsTile from '@components/UserRevalidation/UploadResultsTile';
import { useParams } from 'react-router-dom';
import useGetCampaign from '@api/user-revalidation/useGetCampaign';
import NoDataMessage from '@components/NoDataMessage';
import useGetCampaignApplications from '@api/user-revalidation/useGetCampaignApplications';
import CampaignApplication from '@model/CampaignApplication';

const UploadResults = () => {
	const { campaignId = '' } = useParams<'campaignId'>();
	const { data = new Map<string, CampaignApplication>() } =
		useGetCampaignApplications(campaignId);

	// TODO remove this when the API is fixed
	data.set('1', {
		campaign: {
			id: '1'
		},
		status: 'WIP',
		id: '1',
		application: {
			id: '2',
			name: 'Test Application'
		}
	} as CampaignApplication);

	return (
		<>
			{[...data.values()].map(a => (
				<div className='pb-7' key={a.id}>
					<Tile className='bg-background'>
						<UploadResultsTile application={a.application} />
					</Tile>
				</div>
			))}
		</>
	);
};

const NewRevalidationDetail = () => {
	const { t } = useTranslation(['userRevalidation', 'modals']);
	const { campaignId = '' } = useParams<'campaignId'>();
	const { data } = useGetCampaign(campaignId);

	const [isSendModalOpen, setIsSendModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const buttonRef = useRef<HTMLDivElement>(null);
	const { breadcrumbSize } = useBreadcrumbSize();

	if (!data) {
		return null;
	}

	return (
		<PageHeader
			pageTitle={data.name}
			intermediateRoutes={[{ name: 'New Revalidation', to: '/new-revalidation' }]}
			actions={[
				{
					name: t('userRevalidation:send-revalidation'),
					icon: Email,
					kind: 'primary',
					onClick: () => {
						setIsSendModalOpen(true);
					},
					disabled: data.applicationsCount === 0
				},
				{
					name: t('modals:delete'),
					icon: TrashCan,
					kind: 'danger',
					onClick: () => {
						setIsDeleteModalOpen(true);
					}
				}
			]}
		>
			<div className='pl-5'>
				<SendRevalidationModal isOpen={isSendModalOpen} setIsOpen={setIsSendModalOpen} />
				<DeleteCampaignModal
					campaign={data}
					isOpen={isDeleteModalOpen}
					setIsOpen={setIsDeleteModalOpen}
				/>
				<UploadFileModal isOpen={isUploadModalOpen} setIsOpen={setIsUploadModalOpen} />
				<TableOfContents
					stickyOffset={buttonRef.current?.getBoundingClientRect()?.height || 0}
					tocStickyOffset={breadcrumbSize * 2}
				>
					<Grid fullWidth className='h-full'>
						<FullWidthColumn className='pt-4'>
							<div className='space-y-4'>
								<div
									className='flex w-full flex-wrap items-center md:space-x-4'
									ref={buttonRef}
								>
									<Button
										size='md'
										kind='tertiary'
										renderIcon={Upload}
										className='md:max-w-auto w-full max-w-full md:w-auto'
										onClick={() => {
											setIsUploadModalOpen(true);
										}}
									>
										Upload file
									</Button>
								</div>
								{
									// TODO change to 1 when we are ready to show the upload results tile
									data.applicationsCount < 0 ? (
										<NoDataMessage
											className='mt-10 p-5'
											title={`${t('userRevalidation:no-upload')}`}
											subtitle={`${t('userRevalidation:click-to-upload')}.`}
										/>
									) : (
										<UploadResults />
									)
								}
							</div>
						</FullWidthColumn>
					</Grid>
				</TableOfContents>
			</div>
		</PageHeader>
	);
};
export default NewRevalidationDetail;
