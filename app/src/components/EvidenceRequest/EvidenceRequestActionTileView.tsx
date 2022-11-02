import useEvidenceRequestAction from '@hooks/evidence-request/useEvidenceRequestAction';
import {
	Layer,
	Search,
	Select,
	SelectItem,
	ContentSwitcher,
	Switch
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { Grid as GridIcon, HorizontalView } from '@carbon/react/icons';
import Fade from '@components/Fade';
import Centered from '@components/Centered';
import NoDataMessage from '@components/NoDataMessage';
import EvidenceRequestActionTileContainer from './EvidenceRequestActionTileContainer';

const SearchBar = () => {
	const { filters, setFilters } = useEvidenceRequestAction();
	const { t } = useTranslation('evidenceRequest');

	return (
		<Layer className='w-full'>
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

const EvidenceRequestActionTileView = () => {
	const { requests, filters, setFilters } = useEvidenceRequestAction();
	const { t } = useTranslation('evidenceRequest');

	return (
		<Fade>
			<div className='flex flex-col space-y-5'>
				<div className='flex w-full space-x-5 md:justify-end'>
					<div className='flex w-full items-center space-x-5'>
						<div className='flex w-full items-end space-x-5'>
							<SearchBar />
							<Layer>
								<Select
									size='lg'
									id='workflow-types'
									hideLabel
									onChange={e =>
										setFilters(old => ({
											...old,
											action:
												e.currentTarget?.value === 'All'
													? undefined
													: e.currentTarget?.value
										}))
									}
								>
									<SelectItem text='All' value='All' key='All' />
									<SelectItem
										text='Approve'
										value='APPROVAL'
										key='Approve'
										selected={filters.action === 'APPROVAL'}
									/>
									<SelectItem
										text='Upload'
										value='UPLOAD'
										key='Upload'
										selected={filters.action === 'UPLOAD'}
									/>
								</Select>
							</Layer>
						</div>
						<ContentSwitcher
							onChange={() => setFilters({ isTile: false })}
							className='w-auto'
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
				<div className=''>
					{requests.length === 0 ? (
						<Fade>
							<Centered>
								<NoDataMessage title={t('no-requests')} />
							</Centered>
						</Fade>
					) : (
						<EvidenceRequestActionTileContainer />
					)}
				</div>
			</div>
		</Fade>
	);
};

export default EvidenceRequestActionTileView;
