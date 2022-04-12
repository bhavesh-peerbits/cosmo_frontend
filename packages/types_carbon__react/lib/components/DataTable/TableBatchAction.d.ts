import { FCReturn, ReactDivAttr } from '../../../typings/shared';
import { ReactElement } from 'react';

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
	renderIcon?: (() => ReactElement) | ReactElement;
}

declare const TableBatchAction: FCReturn<TableBatchActionProps>;

export default TableBatchAction;
