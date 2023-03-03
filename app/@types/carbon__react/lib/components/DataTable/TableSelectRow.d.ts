import { ChangeEvent } from 'react';
import { FCReturn, ReactInputAttr } from '../../../typings/shared';

interface TableSelectRowProps extends ReactInputAttr {
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
	 * Specify whether the control is disabled
	 */
	disabled?: boolean;

	/**
	 * Provide an `id` for the underlying input control
	 */
	id: string;

	/**
	 * Provide a `name` for the underlying input control
	 */
	name: string;

	/**
	 * Provide an optional hook that is called each time the input is updated
	 */
	onChange?: () => void;

	/**
	 * Provide a handler to listen to when a user initiates a selection request
	 */
	onSelect: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined;

	/**
	 * Specify whether the control should be a radio button or inline checkbox
	 */
	radio?: boolean;
}

declare const TableSelectRow: FCReturn<TableSelectRowProps>;

export default TableSelectRow;
