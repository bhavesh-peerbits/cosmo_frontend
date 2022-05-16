import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TableProps extends Omit<ReactDivAttr, 'size'> {
	/**
	 * Pass in the children that will be rendered within the Table
	 */
	children?: ReactNode;

	className?: string;

	/**
	 * `false` If true, will apply sorting styles
	 */
	isSortable?: boolean;

	/**
	 * Specify whether the overflow menu (if it exists) should be shown always, or only on hover
	 */
	overflowMenuOnHover?: boolean;

	/**
	 *  Change the row height of table. Currently supports `xs`, `sm`, `md`, `lg`, and `xl`.
	 */
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	/**
	 * `false` If true, will keep the header sticky (only data rows will scroll)
	 */
	stickyHeader?: boolean;

	/**
	 * `false` If true, will use a width of 'auto' instead of 100%
	 */
	useStaticWidth?: boolean;

	/**
	 * `true` to add useZebraStyles striping.
	 */
	useZebraStyles?: boolean;
}

declare const Table: FCReturn<TableProps>;

export default Table;
