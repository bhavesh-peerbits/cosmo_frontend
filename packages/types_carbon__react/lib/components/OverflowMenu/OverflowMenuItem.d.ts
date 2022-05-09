import { FC, ReactNode } from 'react';
import { ReactButtonAttr } from '../../../typings/shared';

interface OverflowMenuItemProps extends ReactButtonAttr {
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
	onBlur?: ReactButtonAttr['onBlur'];
	onClick?: ReactButtonAttr['onClick'];
	onFocus?: ReactButtonAttr['onFocus'];
	onKeyDown?: ReactButtonAttr['onKeyDown'];
	onKeyUp?: ReactButtonAttr['onKeyUp'];
	onMouseDown?: ReactButtonAttr['onMouseDown'];
	onMouseEnter?: ReactButtonAttr['onMouseEnter'];
	onMouseLeave?: ReactButtonAttr['onMouseLeave'];
	onMouseUp?: ReactButtonAttr['onMouseUp'];

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

declare const OverflowMenuItem: FC<OverflowMenuItemProps>;
export default OverflowMenuItem;
