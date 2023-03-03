import { FCReturn, ReactDivAttr, RenderIcon } from '../../../typings/shared';

interface TableBatchActionProps extends ReactDivAttr {
	/**
	 * Specify if the button is an icon-only button
	 */
	hasIconOnly?: boolean;

	/**
	 * If specifying the `renderIcon` prop, provide a description for that icon that can
	 * be read by screen readers
	 */
	iconDescription?: string;
	/**
	 * Optional function to render your own icon in the underlying button
	 */
	renderIcon?: RenderIcon;
}

declare const TableBatchAction: FCReturn<TableBatchActionProps>;

export default TableBatchAction;
