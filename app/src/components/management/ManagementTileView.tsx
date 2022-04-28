import { Column, ContentSwitcher, Grid, Layer, Search, Switch } from '@carbon/react';
import Fade from '@components/Fade';
import ApplicationsFilters from '@components/management/ApplicationsFilters';
import { Grid as GridIcon, HorizontalView } from '@carbon/react/icons';
import Centered from '@components/Centered';
import ApplicationsTileContainer from '@components/management/ApplicationsTileContainer';
import useManagementApps from '@hooks/management/useManagementApps';
import { useTranslation } from 'react-i18next';

const ManagementTileView = () => {
	const { t } = useTranslation('management');
	const { filters, setFilters, apps } = useManagementApps();

	return (
		<Fade>
			<Grid fullWidth narrow className='h-full'>
				<Column sm={4} md={2} lg={3}>
					<div className='ml-5 md:ml-0'>
						<ApplicationsFilters />
					</div>
				</Column>
				<Column sm={4} md={6} lg={13}>
					<div className='flex flex-col space-y-7'>
						<div className='flex w-full flex-wrap justify-between space-x-5 space-y-5 md:flex-nowrap md:space-y-0'>
							<Layer className='ml-5 w-full'>
								<Search
									size='lg'
									labelText={t('search-placeholder')}
									placeholder={t('search-placeholder')}
									value={filters.query ?? ''}
									onChange={e =>
										setFilters(old => ({ ...old, q: e.currentTarget?.value }))
									}
								/>
							</Layer>
							<div className='flex w-full items-center justify-between space-x-5 md:w-auto md:justify-end'>
								<div className='whitespace-nowrap'>
									{`${apps.length} ${t('applications')}`}
								</div>
								<div>
									<ContentSwitcher onChange={() => setFilters({ isTile: false })}>
										<Switch name='first'>
											<GridIcon />
										</Switch>
										<Switch name='second'>
											<HorizontalView />
										</Switch>
									</ContentSwitcher>
								</div>
							</div>
						</div>
						<div>
							{apps.length === 0 ? (
								<Fade>
									<Centered>
										<p className='pt-5 text-productive-heading-3'>
											{t('no-applications')}
										</p>
									</Centered>
								</Fade>
							) : (
								<ApplicationsTileContainer />
							)}
						</div>
					</div>
				</Column>
			</Grid>
		</Fade>
	);
};

export default ManagementTileView;
