import { HTMLProps, ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export type ExtendLink = keyof HTMLElementTagNameMap | typeof RouterLink;

type LinkReturn<T extends ExtendLink> = T extends keyof HTMLElementTagNameMap
	? HTMLProps<HTMLElementTagNameMap[T]>
	: RouterLink;
export type LinkProps<K extends ExtendLink> = {
	/**
	 * The base element to use to build the link. Defaults to `a`, can also accept
	 * alternative tag names or custom components like `Link` from `react-router`.
	 */
	element?: K;

	/**
	 * Property to indicate if the side nav container is open (or not). Use to
	 * keep local state and styling in step with the SideNav expansion state.
	 */
	isSideNavExpanded?: boolean;
} & LinkReturn<K>;

declare function Link<T extends ExtendLink = 'a'>(props: LinkProps<T>): ReactElement;

export default Link;
