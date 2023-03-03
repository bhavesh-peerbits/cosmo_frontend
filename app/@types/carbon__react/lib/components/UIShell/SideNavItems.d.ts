import { ReactNode } from 'react';
import { FCReturn } from '../../../typings/shared';

interface SideNavItemsProps {
	/**
	 * Provide a single icon as the child to `SideNavIcon` to render in the
	 * container
	 */
	children: ReactNode;

	/**
	 * Provide an optional class to be applied to the containing node
	 */
	className?: string;

	/**
	 * Specify if this is a large variation of the SideNavItem
	 */
	large?: boolean;
}

declare const SideNavItems: FCReturn<SideNavItemsProps>;
export default SideNavItems;
