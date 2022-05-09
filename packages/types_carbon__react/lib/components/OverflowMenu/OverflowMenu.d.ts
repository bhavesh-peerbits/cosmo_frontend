import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

type MenuOffsetShape = {
	top?: number;
	left?: number;
};

interface OverflowMenuProps extends ReactDivAttr {
	/**
	 * The ARIA label.
	 */
	ariaLabel: string;

	/**
	 * The child nodes.
	 */
	children?: ReactNode;
	/**
	 * The CSS class names.
	 */
	className?: string;

	/**
	 * The menu direction.
	 */
	direction?: 'top' | 'bottom';

	/**
	 * `true` if the menu alignment should be flipped.
	 */
	flipped?: boolean;

	/**
	 * Enable or disable focus trap behavior
	 */
	focusTrap?: boolean;

	/**
	 * The CSS class for the icon.
	 */
	iconClass?: string;

	/**
	 * The icon description.
	 */
	iconDescription: string;

	/**
	 * The element ID.
	 */
	id?: string;

	/**
	 * The adjustment in position applied to the floating menu.
	 */
	menuOffset?: MenuOffsetShape | (() => void);

	/**
	 * The adjustment in position applied to the floating menu.
	 */
	menuOffsetFlip?: MenuOffsetShape | (() => void);

	/**
	 * The class to apply to the menu options
	 */
	menuOptionsClass?: string;

	/**
	 * The event handler for the `click` event.
	 */
	onClick?: () => void;

	/**
	 * Function called when menu is closed
	 */
	onClose?: () => void;

	/**
	 * The event handler for the `focus` event.
	 */
	onFocus?: () => void;

	/**
	 * The event handler for the `keydown` event.
	 */
	onKeyDown?: () => void;

	/**
	 * Function called when menu is opened
	 */
	onOpen?: () => void;

	/**
	 * `true` if the menu should be open.
	 */
	open?: boolean;

	/**
	 * Function called to override icon rendering.
	 */
	renderIcon?: (() => void) | object;

	/**
	 * Specify a CSS selector that matches the DOM element that should
	 * be focused when the OverflowMenu opens
	 */
	selectorPrimaryFocus?: string;

	/**
	 * Specify the size of the OverflowMenu. Currently supports either `sm`, 'md' (default) or 'lg` as an option.
	 */
	size?: 'sm' | 'md' | 'lg';
}

declare const OverflowMenu: FCReturn<OverflowMenuProps>;

export default OverflowMenu;
