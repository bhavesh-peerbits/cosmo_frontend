import { ReactElement, ReactNode } from 'react';
import { ExtendLink, LinkProps } from './Link';

type SideNavMenuItemProps<K extends ExtendLink> = LinkProps<K> & {
	/**
	 * Specify the children to be rendered inside of the `SideNavMenuItem`
	 */
	children?: ReactNode;

	/**
	 * Provide an optional class to be applied to the containing node
	 */
	className?: string;

	/**
	 * Optionally specify whether the link is "active". An active link is one that
	 * has an href that is the same as the current page. Can also pass in
	 * `aria-current="page"`, as well.
	 */
	isActive?: boolean;
};

declare function SideNavMenuItem<T extends ExtendLink = 'a'>(
	props: SideNavMenuItemProps<T>
): ReactElement;

export default SideNavMenuItem;
