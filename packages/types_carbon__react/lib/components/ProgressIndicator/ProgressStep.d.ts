import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface ProgressStepProps extends Omit<ReactDivAttr, 'label'> {
	/**
	 * Provide an optional className to be applied to the containing `<li>` node
	 */
	className?: string;

	/**
	 * Specify whether the step has been completed
	 */
	complete?: boolean;

	/**
	 * Specify whether the step is the current step
	 */
	current?: boolean;

	/**
	 * Provide a description for the `<ProgressStep>`
	 */
	description?: string;

	/**
	 * Specify whether the step is disabled
	 */
	disabled?: boolean;

	/**
	 * Index of the current step within the ProgressIndicator
	 */
	index?: number;

	/**
	 * Specify whether the step is invalid
	 */
	invalid?: boolean;

	/**
	 * Provide the label for the `<ProgressStep>`
	 */
	label: ReactNode;

	/**
	 * A callback called if the step is clicked or the enter key is pressed
	 */
	onClick?: () => void;

	/**
	 * Provide the props that describe a progress step tooltip
	 */
	overflowTooltipProps?: object;

	/**
	 * Provide an optional secondary label
	 */
	secondaryLabel?: string;

	/**
	 * The ID of the tooltip content.
	 */
	tooltipId?: string;

	/**
	 * Optional method that takes in a message id and returns an
	 * internationalized string.
	 */
	translateWithId?: () => void;
}

declare const ProgressStep: FCReturn<ProgressStepProps>;

export default ProgressStep;
