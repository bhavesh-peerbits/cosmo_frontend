import useManagementApps from '@hooks/management/useManagementApps';
import { useTranslation } from 'react-i18next';
import Application from '@model/Application';
import { Layer } from '@carbon/react';
import { CloudDownload, Email } from '@carbon/react/icons';
import CosmoTable from '@components/table/CosmoTable';
import { useMemo, useState } from 'react';
import MultipleReviewModal from '@pages/Narrative/Menagement/Modals/MultipleReviewModal';
import MultipleDeleteModal from '@pages/Narrative/Menagement/Modals/MultipleDeleteModal';
import MultipleGenerateModal from '@pages/Narrative/Menagement/Modals/MultipleGenerateModal';
import { ColumnDef } from '@tanstack/react-table';
import StringDashCell from '@components/table/Cell/StringDashCell';
import DateCell from '@components/table/Cell/DateCell';
import IconCell from '@components/table/Cell/IconCell';

const ApplicationsTable = () => {
	const { t } = useTranslation('management');
	const { apps } = useManagementApps();

	const [rowSelected, setRowSelected] = useState<Application[]>([]);
	const [actionSelected, setActionSelected] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const columns = useMemo<ColumnDef<Application>[]>(
		() => [
			{
				id: 'name',
				header: t('application-name'),
				accessorFn: row => row.name,
				cell: IconCell
			},
			{
				id: 'code',
				accessorFn: row => row.codeName,
				header: t('code')
			},
			{
				id: 'owner',
				accessorFn: row => row.owner.displayName,
				header: t('owner'),
				cell: StringDashCell
			},
			{
				id: 'lastReview',
				accessorFn: row => row.lastReview,
				header: t('last-review'),
				sortUndefined: 1,
				cell: DateCell
			},
			{
				id: 'lastModify',
				accessorFn: row => row.lastModify,
				header: t('last-modify'),
				cell: DateCell
			}
		],
		[t]
	);

	const toolbarBatchActions = [
		{
			id: 'email',
			icon: Email,
			onClick: (selectionElements: Application[]) => {
				setRowSelected(selectionElements);
				setActionSelected('Review');
				setIsModalOpen(true);
			},
			label: t('review')
		},
		{
			id: 'cloud',
			icon: CloudDownload,
			onClick: (selectionElements: Application[]) => {
				setRowSelected(selectionElements);
				setActionSelected('Generate');
				setIsModalOpen(true);
			},
			label: 'Narrative'
		}
	];

	const modalToOpen = () => {
		switch (actionSelected) {
			case 'Review':
				return (
					<MultipleReviewModal
						type='application'
						isOpen={isModalOpen}
						setIsOpen={setIsModalOpen}
						items={rowSelected}
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
		<Layer>
			{isModalOpen && modalToOpen()}
			<CosmoTable
				tableId='applications'
				data={apps}
				columns={columns}
				isColumnOrderingEnabled
				noDataMessage={t('no-applications')}
				toolbar={{
					searchBar: true,
					toolbarBatchActions,
					toolbarTableMenus: []
				}}
				isSelectable
				exportFileName={({ all }) =>
					all ? 'applications-all' : 'applications-selection'
				}
			/>
		</Layer>
	);
};

export default ApplicationsTable;
