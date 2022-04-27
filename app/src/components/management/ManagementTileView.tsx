import { Column, ContentSwitcher, Grid, Layer, Search, Switch, Tag } from '@carbon/react';
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

	const closeFilter = (filterToRemove: string) => {
		setFilters(old => ({
			categories: old.categories?.filter((f: string) => f !== filterToRemove) || []
		}));
	};

	return (
		<Fade>
			<Grid fullWidth narrow className='h-full'>
				<Column sm={4} md={2} lg={3}>
					<ApplicationsFilters />
				</Column>
				<Column sm={4} md={6} lg={13}>
					<div className='flex flex-col space-y-7'>
						<div className='flex w-full flex-wrap justify-between space-x-5 space-y-5 md:flex-nowrap md:space-y-0'>
							<Layer className='w-full'>
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
						{filters.categories.length > 0 && (
							<Fade>
								<div className='flex items-center space-x-5'>
									<h2>{t('filters')}</h2>
									<div className='flex flex-wrap'>
										{filters.categories.map(filter => (
											<Tag
												key={filter}
												onClose={() => closeFilter(filter)}
												type='cyan'
												filter
											>
												{filter}
											</Tag>
										))}
									</div>
								</div>
							</Fade>
						)}
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
