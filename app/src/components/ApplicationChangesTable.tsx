import { formatDate } from '@i18n';
import { t } from 'i18next';
import CosmoTable, { HeaderFunction } from './table/CosmoTable';

const ApplicationChangesTable = () => {
	interface ApplicationChange {
		id: string;
		object_modified: string;
		field_modified: string;
		user: string;
		change: string;
		modify_date: string;
	}
	type Row = {
		[key: string]: string;
		id: string;
	};

	const data: ApplicationChange[] = [
		{
			id: 'change-1',
			object_modified: 'Procedure Name 1',
			field_modified: 'Field1',
			change: 'New Value',
			user: 'Name Surname',
			modify_date: '03/01/2022'
		},
		{
			id: 'change-2',
			object_modified: 'Procedure Name 2',
			field_modified: 'Field2',
			change: 'New Value',
			user: 'Name Surname',
			modify_date: '03/01/2022'
		},
		{
			id: 'change-3',
			object_modified: 'Procedure Name 3',
			field_modified: 'Field3',
			change: 'New Value',
			user: 'Name Surname',
			modify_date: '03/01/2022'
		}
	];
	const columns: HeaderFunction<ApplicationChange> = table => [
		table.createDataColumn(row => row.object_modified, {
			id: 'objec-modified',
			header: 'Object Modified',
			sortUndefined: 1
		}),
		table.createDataColumn(row => row.field_modified, {
			id: 'field-modified',
			header: 'Field Modified'
		}),
		table.createDataColumn(row => row.change, {
			id: 'change',
			header: 'Change'
		}),
		table.createDataColumn(row => row.user, {
			id: 'user',
			header: 'User'
		}),
		table.createDataColumn(row => row.modify_date, {
			id: 'modify-date',
			header: 'Modify Date'
		})
	];

	return <CosmoTable data={data} createHeaders={columns} noDataMessage={'No data'} />;
};
export default ApplicationChangesTable;
