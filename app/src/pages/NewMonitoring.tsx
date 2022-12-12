import { Add } from '@carbon/react/icons';
import { Column, Grid, Layer, Search } from '@carbon/react';
import MonitoringDraftTileContainer from '@components/NewMonitoring/MonitoringDraftTileContainer';
import PageHeader from '@components/PageHeader';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import NewMonitoringModal from '@components/Modals/NewMonitoringModal';

const SearchBar = () => {
	const { t } = useTranslation('changeMonitoring');

	return (
		<Layer className='w-full'>
			<Search size='lg' labelText='' placeholder={t('monitoring-search-placeholder')} />
		</Layer>
	);
};
const NewMonitoring = () => {
	const { t } = useTranslation('changeMonitoring');
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<PageHeader
			pageTitle='New Monitoring'
			actions={[
				{
					name: t('new-monitoring'),
					icon: Add,
					onClick: () => {
						setIsModalOpen(true);
					}
				}
			]}
		>
			<Grid fullWidth className='h-full p-container-1'>
				<NewMonitoringModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
				<Column sm={4} md={8} lg={16}>
					<div className='flex flex-col space-y-5'>
						<div className='flex w-full items-center space-x-5'>
							<SearchBar />
							<p className='lg:whitespace-nowrap'>5 {t('drafts')}</p>
							{/* // TODO fix when be is ready */}
						</div>
						<div>
							{/* {drafts.length === 0 ? (
								<Fade>
									<Centered>
										<NoDataMessage title={t('no-drafts')} />
									</Centered>
								</Fade>
							) : (
								<MonitoringDraftTileContainer />
							)} */}
							{/* // TODO to implement when BE is ready */}
							<MonitoringDraftTileContainer />
						</div>
					</div>
				</Column>
			</Grid>
		</PageHeader>
	);
};
export default NewMonitoring;
