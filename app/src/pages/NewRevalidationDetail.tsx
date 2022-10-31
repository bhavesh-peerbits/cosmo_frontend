import PageHeader from '@components/PageHeader';
import { Email, TrashCan, Upload, Download } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { LegacyRef, useRef, useState } from 'react';
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
import Papa from 'papaparse';
import useGetCampaignTemplate from '@api/user-revalidation/useGetCampaignTemplate';
import { downloadFileViaBlob } from '@components/util/fileUtil';

interface RevalidationContentProps {
	buttonRef: LegacyRef<HTMLDivElement>;
	openModal: (open: boolean) => void;
	isEmpty: boolean;
}

const UploadResults = () => {
	const { campaignId = '' } = useParams<'campaignId'>();
	const { data = new Map<string, CampaignApplication>() } =
		useGetCampaignApplications(campaignId);

	return (
		<>
			{[...data.values()].map(a => (
				<div className='pb-7' key={a.id}>
					<Tile className='bg-background'>
						<UploadResultsTile campaignApplication={a} />
					</Tile>
				</div>
			))}
		</>
	);
};

const RevalidationContent = ({
	buttonRef,
	openModal,
	isEmpty
}: RevalidationContentProps) => {
	const { t } = useTranslation('userRevalidation');

	return (
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
								openModal(true);
							}}
						>
							Upload file
						</Button>
					</div>
					{isEmpty ? (
						<NoDataMessage
							className='mt-10 p-5'
							title={`${t('no-upload')}`}
							subtitle={`${t('click-to-upload')}.`}
						/>
					) : (
						<UploadResults />
					)}
				</div>
			</FullWidthColumn>
		</Grid>
	);
};

const NewRevalidationDetail = () => {
	const { t } = useTranslation(['userRevalidation', 'modals']);
	const { campaignId = '' } = useParams<'campaignId'>();
	const { data: campaign } = useGetCampaign(campaignId);
	const { mutate } = useGetCampaignTemplate();

	const [isSendModalOpen, setIsSendModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const buttonRef = useRef<HTMLDivElement>(null);
	const { breadcrumbSize } = useBreadcrumbSize();

	if (!campaign) {
		return null;
	}

	const downloadTemplate = () => {
		mutate(
			{ type: campaign?.type },
			{
				onSuccess: data => {
					const delimiter = ',';
					const csvString = Papa.unparse([data.fields], {
						delimiter,
						quotes: value => typeof value === 'string'
					});
					const fileBlob = new Blob([csvString], { type: 'text/csv' });
					downloadFileViaBlob(fileBlob, `${campaign?.type}-template`, 'csv');
				}
			}
		);
	};

	if (!campaign) {
		return null;
	}

	return (
		<PageHeader
			pageTitle={`${campaign.name} (${campaign.type})`}
			intermediateRoutes={[{ name: 'New Revalidation', to: '/new-revalidation' }]}
			actions={[
				{
					name: 'Download template',
					icon: Download,
					kind: 'tertiary',
					onClick: () => {
						downloadTemplate();
					}
				},
				{
					name: t('userRevalidation:send-revalidation'),
					icon: Email,
					kind: 'primary',
					onClick: () => {
						setIsSendModalOpen(true);
					},
					disabled: campaign.applicationsCount === 0
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
				<SendRevalidationModal
					campaign={campaign}
					isOpen={isSendModalOpen}
					setIsOpen={setIsSendModalOpen}
				/>
				<DeleteCampaignModal
					campaign={campaign}
					isOpen={isDeleteModalOpen}
					setIsOpen={setIsDeleteModalOpen}
				/>
				<UploadFileModal
					isOpen={isUploadModalOpen}
					setIsOpen={setIsUploadModalOpen}
					campaignType={campaign.type}
					campaignId={campaignId}
					isEmpty={campaign.applicationsCount < 1}
				/>

				{campaign.applicationsCount > 0 ? (
					<TableOfContents
						stickyOffset={buttonRef.current?.getBoundingClientRect()?.height || 0}
						tocStickyOffset={breadcrumbSize * 2}
					>
						<RevalidationContent
							buttonRef={buttonRef}
							openModal={setIsUploadModalOpen}
							isEmpty={campaign.applicationsCount < 1}
						/>
					</TableOfContents>
				) : (
					<RevalidationContent
						buttonRef={buttonRef}
						openModal={setIsUploadModalOpen}
						isEmpty={campaign.applicationsCount < 1}
					/>
				)}
			</div>
		</PageHeader>
	);
};
export default NewRevalidationDetail;
