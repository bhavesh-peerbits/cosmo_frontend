import { Column, Grid, Layer, Search } from '@carbon/react';
import Fade from '@components/Fade';
import Centered from '@components/Centered';
import NoDataMessage from '@components/NoDataMessage';
import { useTranslation } from 'react-i18next';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import EvidenceRequestTileContainer from './EvidenceRequestTileContainer';

const SearchBar = () => {
	const { t } = useTranslation('evidenceRequest');
	return (
		<Layer className='ml-5 w-full'>
			<Search size='lg' labelText='' placeholder={t('request-search-placeholder')} />
		</Layer>
	);
};

const EvidenceRequestTileView = () => {
	const { t } = useTranslation('evidenceRequest');

	const requests: EvidenceRequestDraft[] = [
		{
			name: 'long long long Name',
			type: 'TYPE1',
			workflowType: 'wftype'
		}
	];

	return (
		<Grid fullWidth narrow className='h-full'>
			<Column sm={4} md={8} lg={16}>
				<div className='flex flex-col space-y-7'>
					<div className='flex w-full items-center space-x-5'>
						<SearchBar />
						<p className='lg:whitespace-nowrap'>{`${requests.length} ${t(
							'requests'
						)}`}</p>
					</div>
					<div>
						{requests.length === 0 ? (
							<Fade>
								<Centered>
									<NoDataMessage title={t('no-requests')} />
								</Centered>
							</Fade>
						) : (
							<EvidenceRequestTileContainer requests={requests} />
						)}
					</div>
				</div>
			</Column>
		</Grid>
	);
};

export default EvidenceRequestTileView;
