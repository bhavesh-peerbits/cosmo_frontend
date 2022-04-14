import { HTMLProps, ReactElement, ReactNode } from 'react';

type GridProps<K extends keyof HTMLElementTagNameMap> = {
	/**
	 * Provide a custom element to render instead of the default <div>
	 */
	as?: K;

	/**
	 * Pass in content that will be rendered within the `Subgrid`
	 */
	children?: ReactNode;

	/**
	 * Specify a custom className to be applied to the `Subgrid`
	 */
	className?: string;

	/**
	 * Specify the grid mode for the subgrid
	 */
	mode?: 'wide' | 'narrow' | 'condensed';
} & HTMLProps<HTMLElementTagNameMap[K]>;

declare function Subgrid<T extends keyof HTMLElementTagNameMap = 'div'>(
	props: GridProps<T>
): ReactElement;

export default Subgrid;
