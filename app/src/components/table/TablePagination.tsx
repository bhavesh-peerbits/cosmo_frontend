import { Pagination } from '@carbon/react';
import usePaginationStore from '@hooks/pagination/usePaginationStore';
import { useTranslation } from 'react-i18next';

interface TablePaginationProp {
	tableId: string;
	dataLength: number;
}

const TablePagination = ({ tableId, dataLength }: TablePaginationProp) => {
	const { t } = useTranslation('table');
	const { pagination, status, setPagination } = usePaginationStore(tableId);

	return (
		<Pagination
			backwardText={t('previous-page')}
			forwardText={t('next-page')}
			itemsPerPageText={t('items-per-page')}
			itemRangeText={(min, max, total) => t('item-range', { min, max, total })}
			pageRangeText={(current, total) =>
				t(total > 1 ? 'page-range-plural' : 'page-range', { current, total })
			}
			page={pagination.pageIndex + 1}
			onChange={({ page, pageSize }) => {
				setPagination({
					pageSize,
					pageIndex: page - 1
				});
			}}
			disabled={status?.isLoading}
			pagesUnknown={status?.isLoading}
			pageSize={pagination.pageSize}
			pageSizes={[10, 20, 50, 100]}
			size='md'
			totalItems={dataLength}
		/>
	);
};

export default TablePagination;
