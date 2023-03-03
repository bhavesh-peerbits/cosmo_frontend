import { FC, ReactNode } from 'react';
import { ReactDivAttr } from '../../../typings/shared';

interface StructuredListRowProps extends ReactDivAttr {
	/**
	 * Provide the contents of your StructuredListRow
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the container node
	 */
	className?: string;

	/**
	 * Specify whether your StructuredListRow should be used as a header row
	 */
	head?: boolean;

	/**
	 * Provide a handler that is invoked on the key down event for the control,
	 */
	onKeyDown?: ReactDivAttr['onKeyDown'];
}

declare const StructuredListRow: FC<StructuredListRowProps>;
export default StructuredListRow;
