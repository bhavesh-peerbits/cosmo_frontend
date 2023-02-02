/* eslint-disable @typescript-eslint/no-unused-vars */
import User from '@model/User';
import { AccessorFn, ColumnDefTemplate, FilterFn, RowData } from '@tanstack/react-table';
import {
	FieldPath,
	FieldPathValue,
	FieldValues,
	Path,
	RegisterOptions
} from 'react-hook-form';
import { SingleUserSelectProps } from '@components/SingleUserSelect';

declare module '@tanstack/react-table' {
	import { RankingInfo } from '@tanstack/match-sorter-utils';

	interface ColumnMeta<
		TData extends RowData,
		TValue,
		FormValues extends Record<string, any>
	> {
		disableExport?: boolean;
		exportableFn?: (info: TValue) => string;
		exportLabel?: () => string;
		initialVisible?: false;
		modalInfo?: ModalInfo<FormValues>;

		filter?:
			| {
					enabled: false;
			  }
			| {
					enabled?: true;
					type?: 'checkbox' | 'radio' | 'dropdown' | 'multiselect';
					label?: string;
			  };
	}

	export type ModalInfo<FormValues> =
		| ModalInfoBase<FormValues>
		| SelectModalInfo<FormValues>
		| DateModalInfo<FormValues>
		| UserModalInfo<FormValues>;

	type ModalInfoBase<FormValues extends Record<string, any>> = {
		id: FieldPath<FormValues>;
		validation: RegisterOptions<FormValues, ModalInfoBase<FormValues>['id']>;
		label?: string;
		type?: 'string' | 'number';

		placeholder?: string;
		fieldOrder?: number;
		fullWidth?: boolean;
	};

	interface DateModalInfo<FormValues> extends ModalInfoBase<FormValues> {
		type: 'date';
		validation: RegisterOptions<FormValues, ModalInfo<FormValues>['id']> & {
			maxDate?: Date;
			minDate?: Date;
		};
	}

	interface SelectModalInfo<FormValues> extends ModalInfoBase<FormValues> {
		type: 'select';
		values:
			| string[]
			| {
					id: string;
					label: string;
			  }[];
	}

	interface UserModalInfo<FormValues> extends ModalInfoBase<FormValues> {
		type: 'user' | 'users';
		userFn?: SingleUserSelectProps<never, never>['getUserFn'];
		excludedUsers?: SingleUserSelectProps<never, never>['excludedUsers'];
	}

	interface FilterFns<T> {
		fuzzy: FilterFn<T>;
	}

	interface FilterMeta {
		itemRank: RankingInfo;
	}
}
