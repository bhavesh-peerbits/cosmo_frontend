import { ReactElement, ReactNode, RefObject } from 'react';
import { FCReturn } from '../../../typings/shared';

interface SideNavMenu {
	buttonRef?: RefObject<HTMLButtonElement>;

	/**
	 * Provide <SideNavMenuItem>'s inside of the `SideNavMenu`
	 */
	children?: ReactNode;

	/**
	 * Provide an optional class to be applied to the containing node
	 */
	className?: string;

	/**
	 * Specify whether the menu should default to expanded. By default, it will
	 * be closed.
	 */
	defaultExpanded?: boolean;

	/**
	 * Specify whether the `SideNavMenu` is "active". `SideNavMenu` should be
	 * considered active if one of its menu items are a link for the current
	 * page.
	 */
	isActive?: boolean;

	/**
	 * Property to indicate if the side nav container is open (or not). Use to
	 * keep local state and styling in step with the SideNav expansion state.
	 */
	isSideNavExpanded?: boolean;

	/**
	 * Specify if this is a large variation of the SideNavMenu
	 */
	large?: boolean;

	/**
	 * Pass in a custom icon to render next to the `SideNavMenu` title
	 */
	renderIcon?: (() => ReactElement) | ReactElement;

	/**
	 * Provide the text for the overall menu name
	 */
	title: string;
}

declare const SideNavMenu: FCReturn<SideNavMenu>;

export default SideNavMenu;
