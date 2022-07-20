import PageHeader from '@components/PageHeader';
import { Add, Download } from '@carbon/react/icons';
import NewRevalidationTileContainer from '@components/UserRevalidation/NewRevalidationTileContainer';
import { Grid, Column, Layer, Search } from '@carbon/react';
import Fade from '@components/Fade';
import { useTranslation } from 'react-i18next';
import DownloadTemplateModal from '@components/Modals/DownloadTemplateModal';
import { useState } from 'react';

const SearchBar = () => {
	const { t } = useTranslation('userRevalidation');
	return (
		<Layer className='ml-5 w-full'>
			<Search size='lg' labelText='' placeholder={t('search-placeholder')} />
		</Layer>
	);
};

const NewRevalidation = () => {
	const { t } = useTranslation('userRevalidation');
	const [isDownloadOpen, setIsDownloadOpen] = useState(false);
	const campaigns = [
		{
			id: 'id1',
			type: 'SUID',
			layer: 'OS'
		}
	];
	return (
		<PageHeader
			pageTitle='New Revalidation'
			actions={[
				{
					name: 'Download template',
					icon: Download,
					onClick: () => {
						setIsDownloadOpen(true);
					}
				},
				{
					name: t('new-campaign'),
					icon: Add,
					onClick: () => {}
				}
			]}
		>
			<Fade>
				<Grid fullWidth narrow className='h-full p-container-1'>
					<Column sm={4} md={2} lg={3}>
						<div className='pl-5 md:ml-0'>Filters</div>
					</Column>
					<Column sm={4} md={6} lg={13}>
						<div className='flex flex-col space-y-7'>
							<div className='flex w-full flex-wrap justify-between space-x-5 space-y-5 md:flex-nowrap md:space-y-0'>
								<SearchBar />
								<div className='flex w-full items-center justify-between space-x-5 md:w-auto md:justify-end'>
									<div className='whitespace-nowrap'>
										{`${campaigns.length}  ${
											campaigns.length === 1 ? t('campaign') : t('campaigns')
										}`}
									</div>
									{/* // TODO fix text for single or multiple campaigns */}
								</div>
							</div>
							<div>
								{/* {false ? (
									<Fade>
										<Centered>
											<NoDataMessage title='No Data' />
										</Centered>
									</Fade>
								) : (
									<NewRevalidationTileContainer />
								)} */}
								<DownloadTemplateModal
									isOpen={isDownloadOpen}
									setIsOpen={setIsDownloadOpen}
								/>
								<NewRevalidationTileContainer />
							</div>
						</div>
					</Column>
				</Grid>
			</Fade>
		</PageHeader>
	);
};
export default NewRevalidation;
