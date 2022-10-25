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
		<Layer className='ml-5 mt-2 w-full'>
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
			<div className='flex flex-col space-y-7'>
				<div className='flex w-full items-center justify-between space-y-5 space-x-5 md:w-auto md:justify-end'>
					<div className='flex w-full justify-end gap-5'>
						<SearchBar />
						<div className='w-[10rem]'>
							<Select
								id='workflow-types'
								labelText=''
								className=''
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
						</div>
						<ContentSwitcher
							onChange={() => setFilters({ isTile: true })}
							className='mt-3 w-auto'
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
				<div>
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
