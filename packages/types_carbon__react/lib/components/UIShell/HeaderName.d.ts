import { ExtendLink, LinkProps } from './Link';
import { ReactNode } from 'react';

type HeaderNameProps<K extends ExtendLink> = LinkProps<K> & {
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
	 * Provide an href for the name to link to
	 */
	href?: string;

	/**
	 * Optionally specify a prefix to your header name. Useful for companies, for
	 * example: IBM [Product Name] versus solely [Product Name]
	 */
	prefix?: string;
};

declare function HeaderName<T extends ExtendLink = 'a'>(
	props: HeaderNameProps<T>
): JSX.Element;

export default HeaderName;
