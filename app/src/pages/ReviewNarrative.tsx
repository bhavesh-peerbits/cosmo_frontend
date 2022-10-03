import { Grid, Column, Search, Layer } from '@carbon/react';
import Centered from '@components/Centered';
import Fade from '@components/Fade';
import NoDataMessage from '@components/NoDataMessage';
import PageHeader from '@components/PageHeader';
import ReviewsFilters from '@components/ReviewNarrative/ReviewsFilters';
import ReviewsTileContainer from '@components/ReviewNarrative/ReviewsTileContainer';
import useAppsInReview from '@hooks/review/useAppsInReview';
import { useTranslation } from 'react-i18next';

const SearchBar = () => {
	const { filters, setFilters } = useAppsInReview();
	const { t } = useTranslation('reviewNarrative');

	return (
		<Layer className='w-full' level={1}>
			<Search
				size='lg'
				labelText={t('search-placeholder')}
				placeholder={t('search-placeholder')}
				value={filters.query ?? ''}
				onChange={e => setFilters(old => ({ ...old, q: e.currentTarget?.value }))}
			/>
		</Layer>
	);
};
const ReviewNarrative = () => {
	const { apps } = useAppsInReview();
	const { t } = useTranslation('reviewNarrative');
	return (
		<PageHeader pageTitle='Review Narrative'>
			<div className='h-full p-container-1'>
				<Fade>
					<Grid fullWidth narrow className='h-full'>
						<Column sm={4} md={2} lg={3}>
							<div className='pl-5 md:ml-0'>
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
										<div className='whitespace-nowrap'>{`${apps.length} ${t(
											'applications-to-review'
										)}`}</div>
									</div>
								</div>
								<div>
									{apps.length === 0 ? (
										<Fade>
											<Centered>
												<div className='flex flex-col'>
													<NoDataMessage title={t('no-applications-review')} />
												</div>
											</Centered>
										</Fade>
									) : (
										<ReviewsTileContainer />
									)}
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
