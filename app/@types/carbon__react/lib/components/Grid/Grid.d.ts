import { HTMLProps, ReactElement, ReactNode } from 'react';

type GridProps<K extends keyof HTMLElementTagNameMap> = {
	/**
	 * Provide a custom element to render instead of the default <div>
	 */
	as?: K;

	/**
	 * Pass in content that will be rendered within the `Grid`
	 */
	children?: ReactNode;

	/**
	 * Specify a custom className to be applied to the `Grid`
	 */
	className?: string;

	/**
	 * Specify how many columns wide the Grid should span
	 */
	columns?: number;

	/**
	 * Collapse the gutter to 1px. Useful for fluid layouts.
	 * Rows have 1px of margin between them to match gutter.
	 */
	condensed?: boolean;

	/**
	 * Remove the default max width that the grid has set
	 */
	fullWidth?: boolean;

	/**
	 * Container hangs 16px into the gutter. Useful for
	 * typographic alignment with and without containers.
	 */
	narrow?: boolean;
} & HTMLProps<HTMLElementTagNameMap[K]>;

declare function Grid<T extends keyof HTMLElementTagNameMap = 'div'>(
	props: GridProps<T>
): ReactElement;

export default Grid;
