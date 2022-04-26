import { Column, ContentSwitcher, Grid, Layer, Search, Switch, Tag } from '@carbon/react';
import { Grid as GridIcon, HorizontalView } from '@carbon/react/icons';
import useManagementApps from '@hooks/management/useManagementApps';
import Fade from '@components/Fade';
import ApplicationsFilters from './ApplicationsFilters';
import ApplicationsTable from './ApplicationsTable';
import ApplicationsTileContainer from './ApplicationsTileContainer';

const ManagementContainer = () => {
	const { filters, setFilters, apps } = useManagementApps();

	const closeFilter = (filterToRemove: string) => {
		setFilters(old => ({
			categories: old.categories?.filter((f: string) => f !== filterToRemove) || []
		}));
	};

	return (
		<div className='h-full'>
			{filters.isTile !== false ? (
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
											labelText='Search application name'
											placeholder='Search by application name'
											value={filters.query ?? ''}
											onChange={e =>
												setFilters(old => ({ ...old, q: e.currentTarget?.value }))
											}
										/>
									</Layer>
									<div className='flex w-full items-center justify-between space-x-5 md:w-auto md:justify-end'>
										<div className='whitespace-nowrap'> {apps.length} Applications </div>
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
											<h2>Filters: </h2>
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
									<ApplicationsTileContainer />
								</div>
							</div>
						</Column>
					</Grid>
				</Fade>
			) : (
				<div className='h-full'>
					<Fade>
						<Grid fullWidth narrow className='h-full'>
							<Column sm={4} md={8} lg={16}>
								<div className='flex flex-col space-y-7'>
									<div className='flex w-full justify-end'>
										<div className='ml-5 flex w-full items-center justify-between space-x-5 md:justify-end'>
											<div className='whitespace-nowrap'>{apps.length} Applications</div>

											<div>
												<ContentSwitcher
													selectedIndex={1}
													onChange={() => setFilters({ isTile: undefined })}
												>
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
										<ApplicationsTable />
									</div>
								</div>
							</Column>
						</Grid>
					</Fade>
				</div>
			)}
		</div>
	);
};
export default ManagementContainer;
