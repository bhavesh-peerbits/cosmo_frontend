import useManagementApps from '@hooks/management/useManagementApps';
import { useTranslation } from 'react-i18next';
import Application from '@model/Application';
import { CloudDownload, Email, TrashCan } from '@carbon/react/icons';
import { TableToolbarSearch } from '@carbon/react';
import CosmoTable, { CellProperties, HeaderFunction } from '@components/table/CosmoTable';
import IconResolver from '@components/IconResolver';
import { formatDate } from '@i18n';
import { useCallback, useState } from 'react';
import MultipleReviewModal from '@components/Modals/MultipleReviewModal';
import MultipleDeleteModal from '@components/Modals/MultipleDeleteModal';
import MultipleGenerateModal from '@components/Modals/MultipleGenerateModal';

const ApplicationIconCell = ({ row, getValue }: CellProperties<Application, string>) => {
	return (
		<div className='flex items-center space-x-3'>
			<div>
				<IconResolver icon={row.original?.icon} />
			</div>
			<p>{getValue() || '-'}</p>
		</div>
	);
};

const ApplicationsTable = () => {
	const { t } = useTranslation('management');
	const { apps } = useManagementApps();
	const { filters, setFilters } = useManagementApps();

	const [rowSelected, setRowSelected] = useState<Application[]>([]);
	const [actionSelected, setActionSelected] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const columns: HeaderFunction<Application> = useCallback(
		table => [
			table.createDataColumn(row => row.name, {
				id: 'name',
				header: () => t('application-name'),
				cell: ApplicationIconCell
			}),
			table.createDataColumn(row => row.codeName, {
				id: 'code',
				header: t('code')
			}),
			table.createDataColumn(row => row.description || '-', {
				id: 'description',
				sortUndefined: 1,
				header: () => t('description')
			}),
			table.createDataColumn(row => row.owner, {
				id: 'owner',
				header: () => t('owner'),
				cell: info => info.getValue()?.name || '-'
			}),
			table.createDataColumn(row => row.lastReview, {
				id: 'lastReview',
				header: () => t('last-review'),
				sortUndefined: 1,
				cell: info => {
					const value = info.getValue();
					return (value && formatDate(value)) || '-';
				}
			}),
			table.createDataColumn(row => row.lastModify, {
				id: 'lastModify',
				header: () => t('last-modify'),
				cell: info => {
					const value = info.getValue();
					return (value && formatDate(value)) || '-';
				}
			})
		],
		[t]
	);

	const toolbarBatchActions = [
		{
			id: 'email',
			icon: Email,
			onClick: (selected: Application[]) => {
				setRowSelected(selected);
				setActionSelected('Review');
				setIsModalOpen(true);
			},
			label: t('email')
		},
		{
			id: 'cloud',
			icon: CloudDownload,
			onClick: (selected: Application[]) => {
				setRowSelected(selected);
				setActionSelected('Generate');
				setIsModalOpen(true);
			},
			label: t('download')
		},
		{
			id: 'trash',
			icon: TrashCan,
			onClick: (selected: Application[]) => {
				setRowSelected(selected);
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
						applications={rowSelected}
					/>
				);
			case 'Generate':
				return (
					<MultipleGenerateModal
						isOpen={isModalOpen}
						setIsOpen={setIsModalOpen}
						applications={rowSelected}
					/>
				);
			default:
				return (
					<MultipleDeleteModal
						isOpen={isModalOpen}
						setIsOpen={setIsModalOpen}
						applications={rowSelected}
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
