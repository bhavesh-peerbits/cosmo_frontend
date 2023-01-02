/* eslint-disable @typescript-eslint/no-unused-vars */
import User from '@model/User';
import { FilterFn, RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
	import { RankingInfo } from '@tanstack/match-sorter-utils';

	interface ColumnMeta<TData extends RowData, TValue> {
		disableExport?: boolean;
		exportableFn?: (info: TValue) => string;
		exportLabel?: () => string;
		initialVisible?: false;
		modalInfo?: ModalInfoAll | ModalInfoSelect | ModalInfoDate | ModalInfoUser;
	}

	interface ModalInfoBase {
		modelKeyName: string;
		halfWidth?: boolean;
	}

	interface ModalInfoSelect extends ModalInfoBase {
		type: 'select';
		selectContent: string[];
	}

	interface ModalInfoUser extends ModalInfoBase {
		type: 'user' | 'users';
		roleOfUsers: string;
		validation?: {
			required?: boolean;
		};
	}

	interface ModalInfoDate extends ModalInfoBase {
		type: 'date';
		validation?: {
			maxDate?: Date;
			minDate?: Date;
		};
	}

	interface ModalInfoAll extends ModalInfoBase {
		type: 'number' | 'string';
		validation?: Validation;
	}

	interface Validation {
		min?: number;
		max?: number;
		maxLength?: number;
		minLength?: number;
		pattern?: string;
		required?: boolean;
		disabled?: boolean;
	}

	interface FilterFns<T> {
		fuzzy: FilterFn<T>;
	}

	interface FilterMeta {
		itemRank: RankingInfo;
	}
}
