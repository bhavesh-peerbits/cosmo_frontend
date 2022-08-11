import PageHeader from '@components/PageHeader';
import { Add } from '@carbon/react/icons';
import CreateProcedureModal from '@components/Modals/CreateProcedureModal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProceduresTileContainer from '@components/AdminPanel/ProceduresTileContainer';
import { Grid, Layer, Search } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import useAdminProcedures from '@hooks/admin-panel/useAdminProcedures';
import Centered from '@components/Centered';
import Fade from '@components/Fade';
import NoDataMessage from '@components/NoDataMessage';

const SearchBar = () => {
	const { filters, setFilters } = useAdminProcedures();
	const { t } = useTranslation('narrativeAdmin');
	return (
		<Layer className='ml-5 w-full'>
			<Search
				size='lg'
				labelText='search'
				placeholder={t('search-procedure')}
				value={filters.query ?? ''}
				onChange={e => setFilters(old => ({ ...old, q: e.currentTarget?.value }))}
			/>
		</Layer>
	);
};

const Procedures = () => {
	const [isNewProcModalOpen, setIsNewProcModalOpen] = useState(false);
	const { t } = useTranslation('narrativeAdmin');
	const { procedures } = useAdminProcedures();

	return (
		<PageHeader
			pageTitle={t('procedures')}
			intermediateRoutes={[{ name: 'Admin Panel', to: '/admin' }]}
			actions={[
				{
					name: t('add-procedure'),
					icon: Add,
					onClick: () => {
						setIsNewProcModalOpen(true);
					}
				}
			]}
		>
			<Grid fullWidth narrow className='p-container-1'>
				<CreateProcedureModal
					isOpen={isNewProcModalOpen}
					setIsOpen={setIsNewProcModalOpen}
				/>
				<FullWidthColumn className='pb-7'>
					<div className='flex w-full flex-wrap justify-between space-x-5 space-y-5 md:flex-nowrap md:space-y-0'>
						<SearchBar />
						<div className='flex w-full items-center justify-between space-x-5 md:w-auto md:justify-end'>
							<div className='whitespace-nowrap'>
								{`${procedures.length} ${
									procedures.length === 1 ? t('procedure') : t('procedures')
								}`}
							</div>
						</div>
					</div>
				</FullWidthColumn>
				<FullWidthColumn>
					{procedures.length === 0 ? (
						<Fade>
							<Centered>
								<NoDataMessage title={t('no-procedures')} />
							</Centered>
						</Fade>
					) : (
						<ProceduresTileContainer />
					)}
				</FullWidthColumn>
			</Grid>
		</PageHeader>
	);
};
export default Procedures;
