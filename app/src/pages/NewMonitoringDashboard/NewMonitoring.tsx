import { Add } from '@carbon/react/icons';
import { Column, Grid, Layer, Search } from '@carbon/react';
import PageHeader from '@components/PageHeader';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import useGetAllMonitoringDrafts from '@api/change-monitoring/useGetAllMonitoringDrafts';
import Centered from '@components/Centered';
import NoDataMessage from '@components/NoDataMessage';
import MonitoringDraft from '@model/MonitoringDraft';
import NewMonitoringModal from './Modals/NewMonitoringModal';
import MonitoringDraftTileContainer from './Containers/MonitoringDraftTileContainer';

type SearchBarProps = {
	setQuery: Dispatch<SetStateAction<string>>;
	query?: string;
};
const SearchBar = ({ setQuery, query }: SearchBarProps) => {
	const { t } = useTranslation('changeMonitoring');
	return (
		<Layer className='w-full'>
			<Search
				size='lg'
				labelText=''
				placeholder={t('monitoring-search-placeholder')}
				onChange={e => setQuery(e.currentTarget?.value)}
				value={query}
				onClear={() => setQuery('')}
			/>
		</Layer>
	);
};
const NewMonitoring = () => {
	const { t } = useTranslation('changeMonitoring');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const { data = new Map() } = useGetAllMonitoringDrafts();
	const drafts = useMemo(() => ([...data.values()] as MonitoringDraft[]) || [], [data]);

	return (
		<PageHeader
			pageTitle='New Monitoring'
			actions={[
				{
					name: t('new-monitoring'),
					icon: Add,
					onClick: () => {
						setIsModalOpen(true);
					}
				}
			]}
		>
			<Grid fullWidth className='h-full p-container-1'>
				<NewMonitoringModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
				<Column sm={4} md={8} lg={16}>
					<div className='flex flex-col space-y-5'>
						<div className='flex w-full items-center space-x-5'>
							<SearchBar setQuery={setSearchQuery} />
							<p className='space-x-2 lg:whitespace-nowrap'>
								<span>
									{
										drafts.filter(draft =>
											draft.name.toLowerCase().includes(searchQuery.toLowerCase())
										).length
									}
								</span>
								<span>{t('drafts')}</span>
							</p>
						</div>
						<div>
							{drafts.filter(draft =>
								draft.name.toLowerCase().includes(searchQuery.toLowerCase())
							).length === 0 ? (
								<Centered>
									<NoDataMessage title={t('no-drafts')} />
								</Centered>
							) : (
								<MonitoringDraftTileContainer
									drafts={drafts.filter(draft =>
										draft.name.toLowerCase().includes(searchQuery.toLowerCase())
									)}
								/>
							)}
						</div>
					</div>
				</Column>
			</Grid>
		</PageHeader>
	);
};
export default NewMonitoring;
