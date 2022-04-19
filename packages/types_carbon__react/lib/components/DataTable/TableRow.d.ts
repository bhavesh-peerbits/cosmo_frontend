import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TableRowProps extends ReactDivAttr {
	/**
	 * Specify an optional className to be applied to the container node
	 */
	className?: string;

	/**
	 * Specify if the row is selected
	 */
	isSelected?: boolean;
}

declare const TableRow: FCReturn<TableRowProps>;

export default TableRow;
