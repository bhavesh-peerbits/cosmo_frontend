import PageHeader from '@components/PageHeader';
import { Email, TrashCan, Upload } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import SendRevalidationModal from '@components/Modals/SendRevalidationModal';
import DeleteCampaignModal from '@components/Modals/DeleteCampaignModal';
import NoDataMessage from '@components/NoDataMessage';
import { Grid, Button } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import TableOfContents from '@components/TableOfContents';
import useBreadcrumbSize from '@hooks/useBreadcrumbSize';

const NewRevalidationDetail = () => {
	const { t } = useTranslation('userRevalidation');
	const { t: tModals } = useTranslation('modals');
	const [isSendModalOpen, setIsSendModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const buttonRef = useRef<HTMLDivElement>(null);
	const { breadcrumbSize } = useBreadcrumbSize();
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
						setIsSendModalOpen(true);
					}
				},
				{
					name: tModals('delete'),
					icon: TrashCan,
					kind: 'danger',
					onClick: () => {
						setIsDeleteModalOpen(true);
					}
				}
			]}
		>
			<>
				<SendRevalidationModal isOpen={isSendModalOpen} setIsOpen={setIsSendModalOpen} />
				<DeleteCampaignModal
					isOpen={isDeleteModalOpen}
					setIsOpen={setIsDeleteModalOpen}
				/>
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
									>
										Upload file
									</Button>
								</div>
								<div className='space-y-7'>
									<NoDataMessage
										className='mt-10 p-5'
										title={t('no-upload')}
										subtitle={t('click-to-upload')}
									/>
								</div>
							</div>
						</FullWidthColumn>
					</Grid>
				</TableOfContents>
			</>
		</PageHeader>
	);
};
export default NewRevalidationDetail;
