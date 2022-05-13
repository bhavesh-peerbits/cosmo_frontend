import { Grid, Column, Search, Layer } from '@carbon/react';
import Fade from '@components/Fade';
import PageHeader from '@components/PageHeader';
import ReviewsFilters from '@components/ReviewNarrative/ReviewsFilters';
import ReviewsTileContainer from '@components/ReviewNarrative/ReviewsTileContainer';
import useReviewApps from '@hooks/review/useReviewApps';

const SearchBar = () => {
	const { filters, setFilters } = useReviewApps();

	return (
		<Layer className=' w-full'>
			<Search
				size='lg'
				labelText='placeholder'
				placeholder='placeholder'
				value={filters.query ?? ''}
				onChange={e => setFilters(old => ({ ...old, q: e.currentTarget?.value }))}
				light
			/>
		</Layer>
	);
};
const ReviewNarrative = () => {
	const { apps } = useReviewApps();
	return (
		<PageHeader pageTitle='Review'>
			<div className='h-full p-container-1'>
				<Fade>
					<Grid fullWidth narrow className='h-full'>
						<Column sm={4} md={2} lg={3}>
							<div className='ml-5 md:ml-0'>
								<ReviewsFilters />
							</div>
						</Column>
						<Column sm={4} md={6} lg={13}>
							<div className='flex flex-col space-y-7'>
								<div className='flex w-full flex-wrap justify-between space-x-5 space-y-5 md:flex-nowrap md:space-y-0'>
									<Layer className='ml-5 w-full'>
										<SearchBar />
									</Layer>
									<div className='flex w-full items-center justify-between space-x-5 md:w-auto md:justify-end'>
										<div className='whitespace-nowrap'>{`${apps.length} Applications to Review `}</div>
									</div>
								</div>
								<div>
									<ReviewsTileContainer />
								</div>
							</div>
						</Column>
					</Grid>
				</Fade>
			</div>
		</PageHeader>
	);
};
export default ReviewNarrative;
