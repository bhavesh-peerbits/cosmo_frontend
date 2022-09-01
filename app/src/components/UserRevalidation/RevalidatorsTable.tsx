import { TableToolbarSearch } from '@carbon/react';
import CosmoTable, { HeaderFunction } from '@components/table/CosmoTable';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import User from '@model/User';

interface RevalidatorsTableProp {
	revalidators: User[];
}

const RevalidatorsTable = ({ revalidators }: RevalidatorsTableProp) => {
	const { t } = useTranslation(['table', 'userRevalidation', 'userAdmin']);

	const columns: HeaderFunction<User> = useCallback(
		table => [
			table.createDataColumn(row => row.name, {
				id: 'name',
				header: t('userRevalidation:campaign-name'),
				sortUndefined: 1
			}),
			table.createDataColumn(row => row.email, {
				id: 'email',
				header: 'Email'
			}),
			table.createDataColumn(row => row.inactive, {
				id: 'status',
				header: t('userRevalidation:status')
			})
		],
		[t]
	);

	const toolbarContent = (
		<TableToolbarSearch
			size='lg'
			persistent
			placeholder={t('userAdmin:search-placeholder')}
			id='search'
		/>
	);
	return (
		<CosmoTable
			level={2}
			data={revalidators}
			createHeaders={columns}
			toolbar={{ toolbarContent }}
			noDataMessage={t('table:no-data')}
		/>
	);
};
export default RevalidatorsTable;
