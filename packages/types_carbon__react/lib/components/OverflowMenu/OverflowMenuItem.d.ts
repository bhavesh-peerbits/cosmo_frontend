import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface OverflowMenuItemProps extends ReactDivAttr {
	/**
	 * The CSS class name to be placed on the button element
	 */
	className?: string;

	/**
	 * A callback to tell the parent menu component that the menu should be closed.
	 */
	closeMenu?: () => void;

	/**
	 * `true` to make this menu item disabled.
	 */
	disabled?: boolean;

	handleOverflowMenuItemFocus?: () => void;

	/**
	 * `true` to make this menu item a divider.
	 */
	hasDivider?: boolean;

	/**
	 * If given, overflow item will render as a link with the given href
	 */
	href?: string;

	index?: number;

	/**
	 * `true` to make this menu item a "danger button".
	 */
	isDelete?: boolean;

	/**
	 * The text in the menu item.
	 */
	itemText: ReactNode;

	/**
	 * event handlers
	 */
	onBlur?: () => void;
	onClick?: () => void;
	onFocus?: () => void;
	onKeyDown?: () => void;
	onKeyUp?: () => void;
	onMouseDown?: () => void;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	onMouseUp?: () => void;

	/**
	 * `true` if this menu item has long text and requires a browser tooltip
	 */
	requireTitle?: boolean;

	/**
	 * Specify a title for the OverflowMenuItem
	 */
	title?: string;

	/**
	 * The CSS class name to be placed on the wrapper list item element
	 */
	wrapperClassName?: string;
}

declare const OverflowMenuItem: FCReturn<OverflowMenuItemProps>;

export default OverflowMenuItem;
