import { TableToolbarSearch } from '@carbon/react';
import CosmoTable, { HeaderFunction } from '@components/table/CosmoTable';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type Revalidator = {
	name: string;
	email: string;
	status: string;
};
const RevalidatorsTable = () => {
	const { t } = useTranslation('userRevalidation');
	const { t: tAdmin } = useTranslation('userAdmin');
	const revalidators = [
		{
			name: 'Name',
			email: 'email@email.com',
			status: 'Due Date Exceeded'
		},
		{
			name: 'Name',
			email: 'email@email.com',
			status: 'Due Date Exceeded'
		}
	];

	const columns: HeaderFunction<Revalidator> = useCallback(
		table => [
			table.createDataColumn(row => row.name, {
				id: 'name',
				header: t('campaign-name'),
				sortUndefined: 1
			}),
			table.createDataColumn(row => row.email, {
				id: 'email',
				header: 'Email'
			}),
			table.createDataColumn(row => row.status, {
				id: 'status',
				header: t('status')
			})
		],
		[t]
	);

	const toolbarContent = (
		<TableToolbarSearch
			size='lg'
			persistent
			placeholder={tAdmin('search-placeholder')}
			id='search'
		/>
	);
	return (
		<CosmoTable
			level={2}
			data={revalidators}
			createHeaders={columns}
			toolbar={{ toolbarContent }}
		/>
	);
};
export default RevalidatorsTable;
