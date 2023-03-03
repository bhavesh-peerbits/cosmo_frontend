import { ReactElement, ReactNode } from 'react';
import { ExtendLink, LinkProps } from './Link';

type HeaderMenuItemProps<K extends ExtendLink> = LinkProps<K> & {
	/**
	 * Pass in children that are either a string or can be read as a string by
	 * screen readers
	 */
	children: ReactNode;

	/**
	 * Optionally provide a custom class to apply to the underlying `<li>` node
	 */
	className?: string;

	/**
	 * Applies selected styles to the item if a user sets this to true and aria-current !== 'page'.
	 */
	isCurrentPage?: boolean;

	/**
	 * Optionally supply a role for the underlying `<li>` node. Useful for resetting
	 * `<ul>` semantics for menus.
	 */
	role?: string;

	/**
	 * Specify the tab index of the Link
	 */
	tabIndex?: number;
};

declare function HeaderMenuItem<T extends ExtendLink = 'a'>(
	props: HeaderMenuItemProps<T>
): ReactElement;

export default HeaderMenuItem;
