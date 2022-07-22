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

const NewRevalidationDetail = () => {
	const { t } = useTranslation('newRevalidation');
	const { t: tModals } = useTranslation('modals');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [actionSelected, setActionSelected] = useState('');
	const buttonRef = useRef<HTMLDivElement>(null);
	const { breadcrumbSize } = useBreadcrumbSize();

	const modalToOpen = () => {
		switch (actionSelected) {
			case 'Send':
				return <SendRevalidationModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />;
			case 'Delete':
				return <DeleteCampaignModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />;
			default:
				return <UploadFileModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />;
		}
	};
	return (
		<PageHeader
			pageTitle='Campagna'
			intermediateRoutes={[{ name: 'New Revalidation', to: '/new-revalidation' }]}
			actions={[
				{
					name: t('send-revalidation'),
					icon: Email,
					kind: 'primary',
					onClick: () => {
						setIsModalOpen(true);
						setActionSelected('Send');
					}
				},
				{
					name: tModals('delete'),
					icon: TrashCan,
					kind: 'danger',
					onClick: () => {
						setIsModalOpen(true);
						setActionSelected('Delete');
					}
				}
			]}
		>
			<div className='pl-5'>
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
											setIsModalOpen(true);
											setActionSelected('Upload');
										}}
									>
										Upload file
									</Button>
								</div>
								<div className=' pb-7'>
									{/* <NoDataMessage
									className='mt-10 p-5'
									title={`${t('no-upload')}`}
									subtitle={`${t('click-to-upload')}.`}
								/> */}
									<Tile className='bg-background'>
										<UploadResultsTile />
									</Tile>
								</div>
								{isModalOpen && modalToOpen()}
							</div>
						</FullWidthColumn>
					</Grid>
				</TableOfContents>
			</div>
		</PageHeader>
	);
};
export default NewRevalidationDetail;
