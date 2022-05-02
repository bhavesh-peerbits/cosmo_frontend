import {
	DataTable,
	TableContainer,
	Layer,
	Table,
	TableHead,
	TableRow,
	TableHeader,
	TableBody,
	TableCell
} from '@carbon/react';

const ApplicationChangesTable = () => {
	type Row = {
		[key: string]: string;
		id: string;
	};

	const rows: Row[] = [
		{
			id: 'change-1',
			procedure: 'Procedure Name 1',
			field: 'Field',
			value: 'New Value',
			date: 'mm/dd/yyyy',
			changedBy: 'Name Surname'
		},
		{
			id: 'change-2',
			procedure: 'Procedure Name 2',
			field: 'Field',
			value: 'New Value',
			date: 'mm/dd/yyyy',
			changedBy: 'Name Surname'
		},
		{
			id: 'change-3',
			procedure: 'Procedure Name 3',
			field: 'Field',
			value: 'New Value',
			date: 'mm/dd/yyyy',
			changedBy: 'Name Surname'
		},
		{
			id: 'change-4',
			procedure: 'Procedure Name 4',
			field: 'Field',
			value: 'New Value',
			date: 'mm/dd/yyyy',
			changedBy: 'Name Surname'
		},
		{
			id: 'change-5',
			procedure: 'Procedure Name 5',
			field: 'Field5',
			value: 'New Value',
			date: 'mm/dd/yyyy',
			changedBy: 'Name Surname'
		},
		{
			id: 'change-6',
			procedure: 'Procedure Name 6',
			field: 'Field6',
			value: 'New Value',
			date: 'mm/dd/yyyy',
			changedBy: 'Name Surname'
		}
	];
	const headers = [
		{ key: 'procedure', header: 'Procedure' },
		{ key: 'field', header: 'Field' },
		{ key: 'value', header: 'Value' },
		{ key: 'date', header: 'Date' },
		{ key: 'changedBy', header: 'Changed By' }
	];

	return (
		<DataTable rows={rows} headers={headers} isSortable>
			{() => (
				<TableContainer>
					<Layer level={1}>
						<Table isSortable>
							<TableHead>
								<TableRow>
									{headers.map(header => (
										<TableHeader scope='' key={header.key} isSortable>
											{header.header}
										</TableHeader>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map(row => (
									<TableRow key={row.id}>
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
export default ApplicationChangesTable;
