import { ChangeEvent } from 'react';
import { FCReturn, ReactInputAttr } from '../../../typings/shared';

interface TableSelectAllProps extends ReactInputAttr {
	/**
	 * Specify the aria label for the underlying input control
	 */
	ariaLabel: string;

	/**
	 * Specify whether all items are selected, or not
	 */
	checked?: boolean;

	/**
	 * The CSS class names of the cell that wraps the underlying input control
	 */
	className?: string;

	/**
	 * Specify whether the checkbox input should be disabled
	 */
	disabled?: boolean;

	/**
	 * Provide an `id` for the underlying input control
	 */
	id: string;

	/**
	 * Specify whether the selection only has a subset of all items
	 */
	indeterminate?: boolean;

	/**
	 * Provide a `name` for the underlying input control
	 */
	name: string;

	/**
	 * Provide a handler to listen to when a user initiates a selection request
	 */
	onSelect: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined;
}

declare const TableSelectAll: FCReturn<TableSelectAllProps>;

export default TableSelectAll;
