import { FC, ReactNode } from 'react';

interface TooltipProps {
	/**
	 * Specify how the trigger should align with the tooltip
	 */
	align:
		| 'top'
		| 'top-left'
		| 'top-right'
		| 'bottom'
		| 'bottom-left'
		| 'bottom-right'
		| 'left'
		| 'left-bottom'
		| 'left-top'
		| 'right'
		| 'right-bottom'
		| 'right-top';

	/**
	 * Pass in the child to which the tooltip will be applied
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the container node
	 */
	className?: string;

	/**
	 * Specify whether the tooltip should be open when it first renders
	 */
	defaultOpen?: boolean;

	/**
	 * Provide the description to be rendered inside of the Tooltip. The
	 * description will use `aria-describedby` and will describe the child node
	 * in addition to the text rendered inside of the child. This means that if you
	 * have text in the child node, that it will be announced alongside the
	 * description to the screen reader.
	 *
	 * Note: if label and description are both provided, label will be used and
	 * description will not be used
	 */
	description?: ReactNode;

	/**
	 * Specify the duration in milliseconds to delay before displaying the tooltip
	 */
	enterDelayMs?: number;

	/**
	 * Provide -the label to be rendered inside of the Tooltip. The label will use
	 * `aria-labelledby` and will fully describe the child node that is provided.
	 * This means that if you have text in the child node, that it will not be
	 * announced to the screen reader.
	 *
	 * Note: if label and description are both provided, description will not be
	 * used
	 */
	label?: ReactNode;

	/**
	 * Specify the duration in milliseconds to delay before hiding the tooltip
	 */
	leaveDelayMs?: number;
}

declare const Tooltip: FC<TooltipProps>;
export default Tooltip;
