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

const ApplicationsTable = () => {
	type Row = {
		[key: string]: string;
		id: string;
	};
	const rows: Row[] = [
		{
			id: 'Application-1',
			name: 'Application Name 1',
			owner: 'Owner',
			code: '12345',
			other: 'Test'
		},
		{
			id: 'Application-2',
			name: 'Application Name 2',
			owner: 'Owner',
			code: '12345',
			other: 'Test'
		},
		{
			id: 'Application-3',
			name: 'Application Name 3',
			owner: 'Owner',
			code: '12345',
			other: 'Test'
		},
		{
			id: 'Application-4',
			name: 'Application Name 4',
			owner: 'Owner',
			code: '12345',
			other: 'Test'
		},
		{
			id: 'Application-5',
			name: 'Application Name 5',
			owner: 'Owner',
			code: '12345',
			other: 'Test'
		},
		{
			id: 'Application-6',
			name: 'Application Name 6',
			owner: 'Owner',
			code: '12345',
			other: 'Test'
		},
		{
			id: 'Application-7',
			name: 'Application Name 7',
			owner: 'Owner',
			code: '12345',
			other: 'Test'
		},
		{
			id: 'Application-8',
			name: 'Application Name 8',
			owner: 'Owner',
			code: '12345',
			other: 'Test'
		},
		{
			id: 'Application-9',
			name: 'Application Name 9',
			owner: 'Owner',
			code: '12345',
			other: 'Test'
		},
		{
			id: 'Application-10',
			name: 'Application Name 10',
			owner: 'Owner',
			code: '12345',
			other: 'Test'
		},
		{
			id: 'Application-11',
			name: 'Application Name 11',
			owner: 'Owner',
			code: '12345',
			other: 'Test'
		},
		{
			id: 'Application-12',
			name: 'Application Name 12',
			owner: 'Owner',
			code: '12345',
			other: 'Test'
		}
	];
	const headers = [
		{ key: 'ApplicationName', header: 'Application Name' },
		{ key: 'Owner', header: 'Owner' },
		{ key: 'Code', header: 'Code' },
		{ key: 'Other', header: 'Other' }
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
		return isSelectAll ? setCheckedList(rows.map(row => row.id)) : setCheckedList([]);
	};

	return (
		<DataTable rows={rows} headers={headers}>
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
							<TableToolbarSearch placeholder='Search application' persistent />
						</TableToolbarContent>
					</TableToolbar>

					<Layer level={1}>
						<Table>
							<TableHead>
								<TableRow>
									<TableSelectAll
										ariaLabel='SelectAll'
										checked={checkedList.length === rows.length}
										indeterminate={
											checkedList.length > 0 && checkedList.length !== rows.length
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
								{rows.map(row => (
									<TableRow key={row.id}>
										<TableSelectRow
											ariaLabel={row.id}
											id={row.id}
											checked={checkedList.includes(row.id)}
											name={row.id}
											onSelect={() => handleSelect(row.id)}
										/>
										{Object.keys(row)
											.filter(key => key !== 'id')
											.map(key => {
												return <TableCell key={key}>{row[key]}</TableCell>;
											})}
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
