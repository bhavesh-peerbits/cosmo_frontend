import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TableExpandHeaderProps extends ReactDivAttr {
	/**
	 * Specify the string read by a voice reader when the expand trigger is
	 * focused
	 */
	ariaLabel?: string;

	children?: ReactNode;

	className?: string;

	/**
	 * Specify whether an expand all button should be displayed
	 */
	enableToggle?: boolean;

	/**
	 * The description of the chevron right icon, to be put in its SVG `<title>` element.
	 */
	expandIconDescription?: string;

	/**
	 * Specify whether this row is expanded or not. This helps coordinate data
	 * attributes so that `TableExpandRow` and `TableExpandedRow` work together
	 */
	isExpanded?: boolean;

	/**
	 * Hook for when a listener initiates a request to expand the given row
	 */
	onExpand?: () => void;
}

declare const TableExpandHeader: FCReturn<TableExpandHeaderProps>;

export default TableExpandHeader;
