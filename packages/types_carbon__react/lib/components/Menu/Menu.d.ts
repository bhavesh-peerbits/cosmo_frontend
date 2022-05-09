import { FC, ReactElement, ReactNode } from 'react';

interface MenuProps {
	/**
	 * Specify the children of the Menu
	 */
	children?: ReactNode;

	/**
	 * Specify a custom className to apply to the ul node
	 */
	className?: string;

	/**
	 * Define an ID for this menu
	 */
	id?: string;

	/**
	 * Internal: keeps track of the nesting level of the menu
	 */
	level?: number;

	/**
	 * Function called when the menu is closed
	 */
	onClose?: () => void;

	/**
	 * Specify whether the Menu is currently open
	 */
	open?: boolean;

	/**
	 * Specify the size of the menu, from a list of available sizes.
	 */
	size?: 'sm' | 'md' | 'lg';

	/**
	 * Optionally pass an element the Menu should be appended to as a child. Defaults to document.body.
	 */
	target?: ReactElement;

	/**
	 * Specify the x position where this menu is rendered
	 */
	x: number | number[];
	/**
	 * Specify the y position where this menu is rendered
	 */
	y: number | number[];
}

declare const Menu: FC<MenuProps>;
export default Menu;
