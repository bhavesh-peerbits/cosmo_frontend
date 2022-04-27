import {
	DataTable,
	Layer,
	Table,
	TableBatchAction,
	TableBatchActions,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableHeader,
	TableRow,
	TableSelectAll,
	TableSelectRow,
	TableToolbar,
	TableToolbarContent,
	TableToolbarSearch
} from '@carbon/react';
import { CloudDownload, Email, TrashCan } from '@carbon/react/icons';
import { useState } from 'react';
import useManagementApps from '@hooks/management/useManagementApps';
import { useTranslation } from 'react-i18next';

const ApplicationsTable = () => {
	const { t } = useTranslation('management');
	const { filters, setFilters, apps } = useManagementApps();

	const headers = [
		{ key: 'name', header: t('application-name') },
		{ key: 'owner', header: t('owner') },
		{ key: 'code', header: t('code') },
		{ key: 'other', header: 'Other' }
	];

	const [isSelectAll, setIsSelectAll] = useState(false);
	const [checkedList, setCheckedList] = useState<string[]>([]);

	const handleSelect = (id: string) => {
		return checkedList.includes(id)
			? setCheckedList(checkedList.filter(item => item !== id))
			: setCheckedList(old => [...old, id]);
	};

	const handleSelectAll = () => {
		setIsSelectAll(!isSelectAll);
		return isSelectAll ? setCheckedList(apps.map(row => row.id)) : setCheckedList([]);
	};

	return (
		<DataTable rows={apps} headers={headers}>
			{() => (
				<TableContainer>
					<TableToolbar>
						<TableBatchActions
							onCancel={() => setCheckedList([])}
							totalSelected={checkedList.length}
							shouldShowBatchActions={checkedList.length > 0}
						>
							<TableBatchAction renderIcon={Email}>Review</TableBatchAction>
							<TableBatchAction renderIcon={CloudDownload}>Generate</TableBatchAction>
							<TableBatchAction renderIcon={TrashCan}>Remove</TableBatchAction>
						</TableBatchActions>
						<TableToolbarContent>
							<TableToolbarSearch
								size='lg'
								placeholder={t('search-placeholder')}
								persistent
								value={filters.query ?? ''}
								onChange={e => setFilters({ q: e.currentTarget?.value })}
							/>
						</TableToolbarContent>
					</TableToolbar>

					<Layer level={1}>
						<Table>
							<TableHead>
								<TableRow>
									<TableSelectAll
										ariaLabel='SelectAll'
										checked={checkedList.length === apps.length}
										indeterminate={
											checkedList.length > 0 && checkedList.length !== apps.length
										}
										id='SelectAll'
										name='SelectAll'
										onSelect={() => handleSelectAll()}
									/>
									{headers.map(header => (
										<TableHeader key={header.key} scope='' isSortable>
											{header.header}
										</TableHeader>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{apps.map(row => (
									<TableRow key={row.id}>
										<TableSelectRow
											ariaLabel={row.id}
											id={row.id}
											checked={checkedList.includes(row.id)}
											name={row.id}
											onSelect={() => {
												handleSelect(row.id);
											}}
										/>
										{Object.entries(row)
											.filter(([key]) => key !== 'id' && key !== 'icon')
											.map(([key, value]) => (
												<TableCell key={key}>{value}</TableCell>
											))}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Layer>
				</TableContainer>
			)}
		</DataTable>
	);
};
export default ApplicationsTable;
