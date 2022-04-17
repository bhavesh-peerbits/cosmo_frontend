import { ReactElement, ReactNode } from 'react';
import { ExtendLink, LinkProps } from './Link';

type SideNavLinkProps<K extends ExtendLink> = LinkProps<K> & {
	/**
	 * Specify the text content for the link
	 */
	children: ReactNode;

	/**
	 * Provide an optional class to be applied to the containing node
	 */
	className?: string;

	/**
	 * Property to indicate if the side nav container is open (or not). Use to
	 * keep local state and styling in step with the SideNav expansion state.
	 */
	isSideNavExpanded?: boolean;

	/**
	 * Specify if this is a large variation of the SideNavLink
	 */
	large?: boolean;

	/**
	 * Provide an icon to render in the side navigation link. Should be a React class.
	 */
	renderIcon: (() => ReactElement) | ReactElement;
};

declare function SideNavLink<T extends ExtendLink = 'a'>(
	props: SideNavLinkProps<T>
): ReactElement;

export default SideNavLink;
