import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TableContainerProps extends Omit<ReactDivAttr, 'title'> {
	children?: ReactNode;
	className?: string;
	/**
	 * Optional description text for the Table
	 */
	description?: ReactNode;

	/**
	 * Specify whether the table should have a sticky header
	 */
	stickyHeader?: boolean;

	/**
	 * Provide a title for the Table
	 */
	title?: ReactNode;

	/**
	 * If true, will use a width of 'fit-content' to match the inner table width
	 */
	useStaticWidth?: boolean;
}

declare const TableContainer: FCReturn<TableContainerProps>;

export default TableContainer;
