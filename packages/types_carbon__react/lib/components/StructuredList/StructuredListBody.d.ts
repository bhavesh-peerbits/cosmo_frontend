import { FC, ReactNode } from 'react';
import { ReactDivAttr } from '../../../typings/shared';

interface StructuredListBodyProps extends ReactDivAttr {
	/**
	 * Provide the contents of your StructuredListBody
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the container node
	 */
	className?: string;

	head?: boolean;

	/**
	 * Provide a handler that is invoked on the key down event for the control
	 */
	onKeyDown?: ReactDivAttr['onKeyDown'];
}

declare const StructuredListBody: FC<StructuredListBodyProps>;
export default StructuredListBody;
