import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TableToolbarProps extends ReactDivAttr {
	/**
	 * Required props for the accessibility label of the TableToolbar
	 */
	ariaLabel?: string;

	/**
	 * Pass in the children that will be rendered inside the TableToolbar
	 */
	children?: ReactNode;

	/**
	 * `lg` Change the row height of table
	 */
	size?: 'sm' | 'lg';
}

declare const TableToolbar: FCReturn<TableToolbarProps>;

export default TableToolbar;
