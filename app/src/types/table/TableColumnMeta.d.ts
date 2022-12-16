/* eslint-disable @typescript-eslint/no-unused-vars */
import { FilterFn, RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
	import { RankingInfo } from '@tanstack/match-sorter-utils';

	interface ColumnMeta<TData extends RowData, TValue> {
		disableExport?: boolean;
		exportableFn?: (info: TValue) => string;
		exportLabel?: () => string;
		initialVisible?: false;
	}

	interface FilterFns<T> {
		fuzzy: FilterFn<T>;
	}

	interface FilterMeta {
		itemRank: RankingInfo;
	}
}
