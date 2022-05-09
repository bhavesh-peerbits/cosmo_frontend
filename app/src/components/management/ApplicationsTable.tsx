import useManagementApps from '@hooks/management/useManagementApps';
import { useTranslation } from 'react-i18next';
import Application from '@model/Application';
import { CloudDownload, Email, TrashCan } from '@carbon/react/icons';
import { TableToolbarSearch } from '@carbon/react';
import CosmoTable, { CellProperties, HeaderFunction } from '@components/table/CosmoTable';
import IconResolver from '@components/IconResolver';
import { formatDate } from '@i18n';
import { useState } from 'react';
import MultipleReviewModal from '@components/Modals/MultipleReviewModal';
import MultipleDeleteModal from '@components/Modals/MultipleDeleteModal';
import MultipleGenerateModal from '@components/Modals/MultipleGenerateModal';

const ApplicationIconCell = ({ row, value }: CellProperties<Application, string>) => {
	return (
		<div className='flex items-center space-x-3'>
			<div>
				<IconResolver icon={row.original?.icon} />
			</div>
			<p>{value}</p>
		</div>
	);
};

const ApplicationsTable = () => {
	const { t } = useTranslation('management');
	const { apps } = useManagementApps();
	const { filters, setFilters } = useManagementApps();

	const [actionSelected, setActionSelected] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const columns: HeaderFunction<Application> = table => [
		table.createDataColumn(row => row.name, {
			id: 'name',
			header: t('application-name'),
			cell: ApplicationIconCell
		}),
		table.createDataColumn(row => row.description, {
			id: 'description',
			sortUndefined: 1,
			header: t('description')
		}),
		table.createDataColumn(row => row.owner, {
			id: 'owner',
			header: t('owner'),
			cell: info => info.value.name
		}),
		// table.createDataColumn(row => row.code, {
		// 	id: 'code',
		// 	header: t('code')
		// }),
		table.createDataColumn(row => row.lastReview, {
			id: 'lastReview',
			header: t('last-review'),
			sortUndefined: 1,
			cell: info => info.value && formatDate(info.value)
		}),
		table.createDataColumn(row => row.lastModify, {
			id: 'lastModify',
			header: t('last-modify'),
			cell: info => info.value && formatDate(info.value)
		})
	];

	const toolbarBatchActions = [
		{
			id: 'email',
			icon: Email,
			onClick: () => {
				setActionSelected('Review');
				setIsModalOpen(true);
			},
			label: t('email')
		},
		{
			id: 'cloud',
			icon: CloudDownload,
			onClick: () => {
				setActionSelected('Generate');
				setIsModalOpen(true);
			},
			label: t('download')
		},
		{
			id: 'trash',
			icon: TrashCan,
			onClick: () => {
				setActionSelected('Delete');
				setIsModalOpen(true);
			},
			label: t('delete')
		}
	];

	const toolbarContent = (
		<TableToolbarSearch
			size='lg'
			placeholder={t('search-placeholder')}
			persistent
			id='search'
			value={filters.query ?? ''}
			onChange={e => setFilters({ q: e.currentTarget?.value })}
		/>
	);

	const modalToOpen = () => {
		switch (actionSelected) {
			case 'Review':
				return (
					<MultipleReviewModal
						type='application'
						isOpen={isModalOpen}
						setIsOpen={setIsModalOpen}
					/>
				);
			case 'Generate':
				return <MultipleGenerateModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />;
			default:
				return (
					<MultipleDeleteModal
						isOpen={isModalOpen}
						setIsOpen={setIsModalOpen}
						totalSelected={2}
					/>
				);
		}
	};

	return (
		<div>
			{isModalOpen && modalToOpen()}

			<CosmoTable
				data={apps}
				createHeaders={columns}
				noDataMessage={t('no-applications')}
				toolbar={{ toolbarContent, toolbarBatchActions }}
				isSelectable
			/>
		</div>
	);
};

export default ApplicationsTable;
