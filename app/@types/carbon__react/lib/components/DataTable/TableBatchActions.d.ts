import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TableBatchActionsProps extends ReactDivAttr {
	children?: ReactNode;
	className?: string;

	/**
	 * Hook required to listen for when the user initiates a cancel request
	 * through this component
	 */
	onCancel: () => void;

	/**
	 * Boolean specifier for whether or not the batch action bar should be
	 * displayed
	 */
	shouldShowBatchActions?: boolean;

	/**
	 * Numeric representation of the total number of items selected in a table.
	 * This number is used to derive the selection message
	 */
	totalSelected: number;

	/**
	 * Supply a method to translate internal strings with your i18n tool of
	 * choice. Translation keys are available on the `translationKeys` field for
	 * this component.
	 */
	translateWithId?: (key: string) => string;
}

declare const TableBatchActions: FCReturn<TableBatchActionsProps>;

export default TableBatchActions;
