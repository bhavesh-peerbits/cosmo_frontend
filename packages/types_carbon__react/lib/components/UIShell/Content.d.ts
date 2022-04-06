import { HTMLProps, ReactElement, ReactNode } from 'react';

type ContentProps<K extends keyof HTMLElementTagNameMap> = {
	/**
	 * Provide children nodes to be rendered in the content container
	 */
	children?: ReactNode,

	/**
	 * Optionally provide a custom class name that is applied to the container
	 */
	className?: string,

	/**
	 * Optionally specify the tag of the content node. Defaults to `main`
	 */
	tagName?: string,
} & HTMLProps<HTMLElementTagNameMap[K]>

declare function Content<T extends keyof HTMLElementTagNameMap = 'main'>(props: ContentProps<T>): ReactElement;

export default Content;
