import { FC, ReactNode } from 'react';
import { ReactDivAttr } from '../../../typings/shared';

interface StructuredListCellProps extends ReactDivAttr {
	/**
	 * Provide the contents of your StructuredListCell
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the container node
	 */
	className?: string;

	/**
	 * Specify whether your StructuredListCell should be used as a header cell
	 */
	head?: boolean;

	/**
	 * Specify whether your StructuredListCell should have text wrapping
	 */
	noWrap?: boolean;
}

declare const StructuredListCell: FC<StructuredListCellProps>;
export default StructuredListCell;
