import { TableToolbarSearch } from '@carbon/react';
import CosmoTable, { HeaderFunction } from '@components/table/CosmoTable';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Answer from '@model/Answer';
import isAfter from 'date-fns/isAfter';

interface RevalidatorsTableProp {
	answers: Answer[];
	dueDate: Date | undefined;
}

const RevalidatorsTable = ({ answers, dueDate }: RevalidatorsTableProp) => {
	const { t } = useTranslation(['table', 'userRevalidation', 'userAdmin']);
	const columns: HeaderFunction<Answer> = useCallback(
		table => [
			table.createDataColumn(row => row.revalidationUser, {
				id: 'name',
				header: t('userRevalidation:users-to-revalidate'),
				sortUndefined: 1,
				cell: info => info.getValue()?.username || '-'
			}),
			table.createDataColumn(row => row.revalidationUser, {
				id: 'email',
				header: 'Email',
				cell: info => info.getValue()?.email || '-'
			}),
			table.createDataColumn(row => row.answerType, {
				id: 'status',
				header: t('userRevalidation:status'),
				cell: info => {
					if (info.getValue()) {
						return 'Completed';
					}
					if (dueDate && isAfter(new Date(), dueDate)) {
						return 'Due date exceeded';
					}
					return 'Incomplete';
				}
			})
		],
		[dueDate, t]
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
			data={answers}
			createHeaders={columns}
			toolbar={{ toolbarContent }}
			noDataMessage={t('table:no-data')}
		/>
	);
};
export default RevalidatorsTable;
