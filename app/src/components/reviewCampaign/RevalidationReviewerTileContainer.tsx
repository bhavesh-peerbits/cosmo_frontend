import { Grid, Column, Layer, Search } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import useRevalidationReview from '@hooks/user-revalidation-review/useRevalidationReview';
import RevalidationReviewerTile from './RevalidationReviewerTile';

const SearchBar = () => {
	const { filters, setFilters } = useRevalidationReview();
	const { t } = useTranslation('userRevalidation');
	return (
		<Layer className='ml-5 w-full'>
			<Search
				size='lg'
				labelText=''
				placeholder={t('search-placeholder')}
				value={filters.query ?? ''}
				onChange={e =>
					setFilters(old => ({ ...old, q: e.currentTarget?.value || undefined }))
				}
			/>
		</Layer>
	);
};
const RevalidationReviewerTileContainer = () => {
	const { t } = useTranslation('userRevalidation');
	const { revalidations } = useRevalidationReview();

	return (
		<div className='flex flex-col space-y-7'>
			<div className='flex w-full flex-wrap justify-between space-x-5 space-y-5 md:flex-nowrap md:space-y-0'>
				<SearchBar />
				<div className='flex w-full items-center justify-between space-x-5 md:w-auto md:justify-end'>
					<div className='whitespace-nowrap'>
						{`${revalidations.length}  ${
							revalidations.length === 1 ? t('application') : t('applications')
						}`}
					</div>
				</div>
			</div>
			<div>
				<Grid fullWidth narrow className='p-container-1'>
					<Column sm={4} md={6} lg={16} xlg={15} max={16}>
						<Grid fullWidth className='h-full space-y-5'>
							{revalidations.map(revalidation => (
								<FullWidthColumn key={revalidation.id}>
									<RevalidationReviewerTile revalidation={revalidation} />
								</FullWidthColumn>
							))}
						</Grid>
					</Column>
				</Grid>
			</div>
		</div>
	);
};
export default RevalidationReviewerTileContainer;
