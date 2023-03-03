import { FC, ReactNode } from 'react';
import { ReactDivAttr } from '../../../typings/shared';

interface StructuredListHeadProps extends ReactDivAttr {
	/**
	 * Provide the contents of your StructuredListHead
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the node
	 */
	className?: string;
}

declare const StructuredListHead: FC<StructuredListHeadProps>;
export default StructuredListHead;
