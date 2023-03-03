import { AriaRole, ElementType, ReactNode } from 'react';
import { FCReturn, ReactButtonAttr, RenderIcon } from '../../../typings/shared';
import ButtonKinds from './ButtonKinds';

interface ButtonProps extends Omit<ReactButtonAttr, 'as' | 'size'> {
	/**
	 * Specify how the button itself should be rendered.
	 * Make sure to apply all props to the root node and render children appropriately
	 */
	as?: (() => string) | string | ElementType;

	/**
	 * Specify the content of your Button
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be added to your Button
	 */
	className?: string;

	/**
	 * Specify the message read by screen readers for the danger button variant
	 */
	dangerDescription?: string;

	/**
	 * Specify whether the Button should be disabled, or not
	 */
	disabled?: boolean;

	/**
	 * Specify if the button is an icon-only button
	 */
	hasIconOnly?: boolean;

	/**
	 * Optionally specify an href for your Button to become an `<a>` element
	 */
	href?: string;

	/**
	 * If specifying the `renderIcon` prop, provide a description for that icon that can
	 * be read by screen readers
	 */
	iconDescription?: string;

	/**
	 * Specify whether the Button is expressive, or not
	 */
	isExpressive?: boolean;

	/**
	 * Specify whether the Button is currently selected. Only applies to the Ghost variant.
	 */
	isSelected?: boolean;

	/**
	 * Specify the kind of Button you want to create
	 */
	kind?: ButtonKinds;

	/**
	 * Provide an optional function to be called when the button element
	 * loses focus
	 */
	onBlur?: ReactButtonAttr['onBlur'];

	/**
	 * Provide an optional function to be called when the button element
	 * is clicked
	 */
	onClick?: ReactButtonAttr['onClick'];

	/**
	 * Provide an optional function to be called when the button element
	 * receives focus
	 */
	onFocus?: ReactButtonAttr['onFocus'];

	/**
	 * Provide an optional function to be called when the mouse
	 * enters the button element
	 */
	onMouseEnter?: ReactButtonAttr['onMouseEnter'];

	/**
	 * Provide an optional function to be called when the mouse
	 * leaves the button element
	 */
	onMouseLeave?: ReactButtonAttr['onMouseLeave'];

	/**
	 * Optional prop to allow overriding the icon rendering.
	 * Can be a React component class
	 */
	renderIcon?: RenderIcon;

	/**
	 * Optional prop to specify the role of the Button
	 */
	role?: AriaRole;

	/**
	 * Specify the size of the button, from the following list of sizes:
	 */
	size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';

	/**
	 * Optional prop to specify the tabIndex of the Button
	 */
	tabIndex?: number;

	/**
	 * Specify the alignment of the tooltip to the icon-only button.
	 * Can be one of: start, center, or end.
	 */
	tooltipAlignment?: 'start' | 'center' | 'end';

	/**
	 * Specify the direction of the tooltip for icon-only buttons.
	 * Can be either top, right, bottom, or left.
	 */
	tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';

	/**
	 * Optional prop to specify the type of the Button
	 */
	type?: 'button' | 'reset' | 'submit';

	to?: string;
}

declare const Button: FCReturn<ButtonProps>;

export default Button;
