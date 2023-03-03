import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TableExpandedRowProps extends ReactDivAttr {
	/**
	 * Pass in the contents for your TableExpandedRow
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the container node
	 */
	className?: string;

	/**
	 * The width of the expanded row's internal cell
	 */
	colSpan: number;
}

declare const TableExpandedRow: FCReturn<TableExpandedRowProps>;

export default TableExpandedRow;
