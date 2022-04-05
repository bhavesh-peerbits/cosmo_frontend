import { ReactNode } from 'react';
import { FCReturn } from '../../../typings/shared';

type HeaderSideNavItemsProps = {
	/**
	 * The child nodes to be rendered
	 */
	children?: ReactNode;

	/**
	 * Optionally provide a custom class name that is applied to the underlying
	 * button
	 */
	className?: string;

	/**
	 * Optionally specify if container will have a bottom divider to differentiate
	 * between original sidenav items and header menu items. False by default.
	 */
	hasDivider?: boolean;
};

declare const HeaderSideNavItems: FCReturn<HeaderSideNavItemsProps>;

export default HeaderSideNavItems;
