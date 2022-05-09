import { FC, ReactNode } from 'react';
import { ReactDivAttr } from '../../../typings/shared';

interface StructuredListWrapperProps extends ReactDivAttr {
	/**
	 * Specify a label to be read by screen readers on the container node
	 */
	ariaLabel?: string;

	/**
	 * Provide the contents of your StructuredListWrapper
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the container node
	 */
	className?: string;

	/**
	 * Specify whether your StructuredListWrapper should have selections
	 */
	selection?: boolean;
}

declare const StructuredListWrapper: FC<StructuredListWrapperProps>;
export default StructuredListWrapper;
