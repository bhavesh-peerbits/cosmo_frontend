import { FCReturn, ReactDivAttr } from '../../../typings/shared';
import { ReactNode } from 'react';

interface TableExpandRowProps extends ReactDivAttr {
	/**
	 * Specify the string read by a voice reader when the expand trigger is
	 * focused
	 */
	ariaLabel: string;
	children?: ReactNode;
	className?: string;
	/**
	 * The id of the matching th node in the table head. Addresses a11y concerns outlined here: https://www.ibm.com/able/guidelines/ci162/info_and_relationships.html and https://www.w3.org/TR/WCAG20-TECHS/H43
	 */
	expandHeader?: string;

	/**
	 * The description of the chevron right icon, to be put in its SVG `<title>` element.
	 */
	expandIconDescription?: string;

	/**
	 * Specify whether this row is expanded or not. This helps coordinate data
	 * attributes so that `TableExpandRow` and `TableExpandedRow` work together
	 */
	isExpanded: boolean;

	/**
	 * Specify if the row is selected
	 */
	isSelected?: boolean;

	/**
	 * Hook for when a listener initiates a request to expand the given row
	 */
	onExpand: () => void;
}

declare const TableExpandRow: FCReturn<TableExpandRowProps>;

export default TableExpandRow;
