import { FC, ReactNode } from 'react';

interface MenuItemProps {
	/**
	 * Specify the children of the MenuItem
	 */
	children?: ReactNode;

	/**
	 * Specify whether this MenuItem is disabled
	 */
	disabled?: boolean;

	/**
	 * Optional prop to specify the kind of the MenuItem
	 */
	kind?: 'default' | 'danger';

	/**
	 * Rendered label for the MenuItem
	 */
	label?: ReactNode;

	/**
	 * Rendered shortcut for the MenuItem
	 */
	shortcut?: ReactNode;

	onClick?: () => void;
}

declare const MenuItem: FC<MenuItemProps>;
export default MenuItem;
