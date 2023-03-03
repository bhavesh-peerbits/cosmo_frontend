import { ReactNode } from 'react';
import { AriaLabelProps, FCReturn, ReactDivAttr } from '../../../typings/shared';

interface PopoverProps extends AriaLabelProps, Omit<ReactDivAttr, 'size'> {
	/**
	 * Specify how the popover should align with the trigger element
	 */
	align?:
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
	 * Provide a custom element or component to render the top-level node for the
	 * component.
	 */
	as?: string;

	/**
	 * Will auto-align the popover on first render if it is not visible. This prop is currently experimental and is subject to futurue changes.
	 */
	autoAlign?: boolean;

	/**
	 * Specify whether a caret should be rendered
	 */
	caret?: boolean;

	/**
	 * Provide elements to be rendered inside of the component
	 */
	children?: ReactNode;

	/**
	 * Provide a custom class name to be added to the outermost node in the
	 * component
	 */
	className?: string;

	/**
	 * Specify whether a drop shadow should be rendered on the popover
	 */
	dropShadow?: boolean;

	/**
	 * Render the component using the high-contrast variant
	 */
	highContrast?: boolean;

	/**
	 * Specify whether the component is currently open or closed
	 */
	open: boolean;
}

declare const Popover: FCReturn<PopoverProps>;

export default Popover;
