import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface ProgressIndicatorProps extends ReactDivAttr {
	/**
	 * Provide `<ProgressStep>` components to be rendered in the
	 * `<ProgressIndicator>`
	 */
	children?: ReactNode;

	/**
	 * Provide an optional className to be applied to the containing node
	 */
	className?: string;

	/**
	 * Optionally specify the current step array index
	 */
	currentIndex?: number;

	/**
	 * Optional callback called if a ProgressStep is clicked on.  Returns the index of the step.
	 */
	onChange?: () => void;

	/**
	 * Specify whether the progress steps should be split equally in size in the div
	 */
	spaceEqually?: boolean;
	/**
	 * Determines whether or not the ProgressIndicator should be rendered vertically.
	 */
	vertical?: boolean;
}

declare const ProgressIndicator: FCReturn<ProgressIndicatorProps>;

export default ProgressIndicator;
