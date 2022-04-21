import { Column, ContentSwitcher, Grid, Layer, Search, Switch, Tag } from '@carbon/react';
import { Grid as GridIcon, HorizontalView } from '@carbon/react/icons';
import { useState } from 'react';
import ApplicationsFilters from './ApplicationsFilters';
import ApplicationsTable from './ApplicationsTable';
import ApplicationsTileContainer from './ApplicationsTileContainer';

type Filter = {
	id: string;
	category: string;
};

const ManagementContainer = () => {
	const [isTileView, setIsTileView] = useState(true);
	const [checkedFilters, setCheckedFilters] = useState<Filter[]>([]);

	const handleSelectFilter = (filter: Filter) => {
		return checkedFilters.some(e => e.id === filter.id)
			? setCheckedFilters(checkedFilters.filter(e => e.id !== filter.id))
			: setCheckedFilters(old => [...old, filter]);
	};

	const closeFilter = (filterToRemove: Filter) => {
		setCheckedFilters(checkedFilters.filter(filter => filter !== filterToRemove));
	};

	return (
		<div className='h-full'>
			{isTileView ? (
				<Grid fullWidth narrow className='h-full'>
					<Column sm={4} md={2} lg={3}>
						<ApplicationsFilters
							checkedFilters={checkedFilters}
							handleSelect={handleSelectFilter}
						/>
					</Column>
					<Column sm={4} md={6} lg={13}>
						<div className='flex flex-col space-y-7'>
							<div className='flex w-full flex-wrap justify-between space-x-5 space-y-5 md:flex-nowrap md:space-y-0'>
								<Layer className='w-full'>
									<Search
										size='lg'
										labelText='Search application name'
										placeholder='Search by application name'
									/>
								</Layer>
								<div className='flex w-full items-center justify-between space-x-5 md:w-auto md:justify-end'>
									<div className='whitespace-nowrap'> 16 Applications </div>
									<div>
										<ContentSwitcher onChange={() => setIsTileView(!isTileView)}>
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
							{checkedFilters.length > 0 && (
								<div className='flex items-center space-x-5'>
									<h2>Filters: </h2>
									<div className='flex flex-wrap'>
										{checkedFilters.map(filter => (
											<Tag
												onClose={() => {
													closeFilter(filter);
												}}
												type='cyan'
												filter
											>
												{filter.category}
											</Tag>
										))}
									</div>
								</div>
							)}
							<div>
								<ApplicationsTileContainer />
							</div>
						</div>
					</Column>
				</Grid>
			) : (
				<Grid fullWidth narrow className='h-full'>
					<Column sm={4} md={8} lg={16}>
						<div className='flex flex-col space-y-7'>
							<div className='flex w-full justify-end'>
								<div className='ml-5 flex w-full items-center justify-between space-x-5 md:justify-end'>
									<div className='whitespace-nowrap'> 16 Applications </div>

									<div>
										<ContentSwitcher
											selectedIndex={1}
											onChange={() => setIsTileView(!isTileView)}
										>
											<Switch name='first' text={<GridIcon />} />
											<Switch name='second' text={<HorizontalView />} />
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
			)}
		</div>
	);
};
export default ManagementContainer;
