import { TableToolbarSearch } from '@carbon/react';
import CosmoTable, { HeaderFunction } from '@components/table/CosmoTable';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Answer from '@model/Answer';

interface AnswerTableProp {
	answers: Answer[];
}

const AnswerTable = ({ answers }: AnswerTableProp) => {
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
			table.createDataColumn(row => row.delegated, {
				id: 'delegates',
				header: t('userRevalidation:delegates'),
				cell: info =>
					info
						.getValue()
						?.map(v => v.username)
						?.join(',') || '-'
			}),
			table.createDataColumn(row => row.userToRevalidate, {
				id: 'userId',
				header: 'UserId to Revalidate'
			}),
			// table.createDataColumn(row => row., { //TODO risk
			//   id: 'userId',
			//   header: 'UserId to Revalidate',
			// })
			table.createDataColumn(row => row.userDetails, {
				id: 'userDetails',
				header: 'User Details'
			}),
			table.createDataColumn(row => row.answerType, {
				id: 'answer',
				header: 'Answer',
				cell: info => info.getValue()
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
			data={answers}
			createHeaders={columns}
			toolbar={{ toolbarContent }}
			noDataMessage={t('table:no-data')}
		/>
	);
};
export default AnswerTable;
