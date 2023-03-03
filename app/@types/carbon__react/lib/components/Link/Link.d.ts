import { HTMLProps, ReactElement, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { RenderIcon } from '../../../typings/shared';

export type ExtendLink = keyof HTMLElementTagNameMap | typeof RouterLink;

type LinkReturn<T extends ExtendLink> = T extends keyof HTMLElementTagNameMap
	? HTMLProps<HTMLElementTagNameMap[T]>
	: RouterLink;
export type LinkProps<K extends ExtendLink> = {
	/**
	 * Provide the content for the Link
	 */
	children?: ReactNode;

	/**
	 * Provide a custom className to be applied to the containing `<a>` node
	 */
	className?: string;

	/**
	 * Specify if the control should be disabled, or not
	 */
	disabled?: boolean;

	/**
	 * Provide the `href` attribute for the `<a>` node
	 */
	href?: string;

	/**
	 * Specify whether you want the inline version of this control
	 */
	inline?: boolean;

	/**
	 * Optional prop to render an icon next to the link.
	 * Can be a React component class
	 */
	renderIcon?: RenderIcon;

	/**
	 * Specify the size of the Link. Currently supports either `sm`, 'md' (default) or 'lg` as an option.
	 */
	size?: 'sm' | 'md' | 'lg';

	/**
	 * Specify whether you want the link to receive visited styles after the link has been clicked
	 */
	visited?: boolean;
} & LinkReturn<K>;

declare function Link<T extends ExtendLink = 'a'>(props: LinkProps<T>): ReactElement;

export default Link;
