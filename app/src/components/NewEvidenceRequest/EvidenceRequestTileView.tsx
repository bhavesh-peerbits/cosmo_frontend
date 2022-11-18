import { Column, Grid, Layer, Search } from '@carbon/react';
import Fade from '@components/Fade';
import Centered from '@components/Centered';
import NoDataMessage from '@components/NoDataMessage';
import { useTranslation } from 'react-i18next';
import useEvidenceRequestDrafts from '@hooks/evidenceRequestDraft/useEvidenceRequestDrafts';
import EvidenceRequestTileContainer from './EvidenceRequestTileContainer';

const SearchBar = () => {
	const { t } = useTranslation('evidenceRequest');
	const { filters, setFilters } = useEvidenceRequestDrafts();
	return (
		<Layer className='ml-5 w-full'>
			<Search
				size='lg'
				labelText=''
				placeholder={t('request-search-placeholder')}
				value={filters.query ?? ''}
				onChange={e => setFilters(old => ({ ...old, q: e.currentTarget?.value }))}
			/>
		</Layer>
	);
};

const EvidenceRequestTileView = () => {
	const { t } = useTranslation('evidenceRequest');
	const { drafts } = useEvidenceRequestDrafts();

	return (
		<Grid fullWidth narrow className='h-full'>
			<Column sm={4} md={8} lg={16}>
				<div className='flex flex-col space-y-5'>
					<div className='flex w-full items-center space-x-5'>
						<SearchBar />
						<p className='lg:whitespace-nowrap'>{`${drafts.length} ${t('requests')}`}</p>
					</div>
					<div>
						{drafts.length === 0 ? (
							<Fade>
								<Centered>
									<NoDataMessage title={t('no-requests')} />
								</Centered>
							</Fade>
						) : (
							<EvidenceRequestTileContainer requests={drafts} />
						)}
					</div>
				</div>
			</Column>
		</Grid>
	);
};

export default EvidenceRequestTileView;
