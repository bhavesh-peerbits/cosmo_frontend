import { HTMLProps, ReactElement, ReactNode } from 'react';

type RowProps<K extends keyof HTMLElementTagNameMap> = {
	/**
	 * Provide a custom element to render instead of the default <div>
	 */
	as?: K;

	/**
	 * Pass in content that will be rendered within the `Row`
	 */
	children?: ReactNode;

	/**
	 * Specify a custom className to be applied to the `Row`
	 */
	className?: string;

	/**
	 * Specify a single row as condensed.Rows that are adjacent
	 * and are condensed will have 2px of margin between them to match gutter.
	 */
	condensed?: boolean;

	/**
	 * Specify a single row as narrow. The container will hang
	 * 16px into the gutter.
	 */
	narrow?: boolean;
} & HTMLProps<HTMLElementTagNameMap[K]>;

declare function Row<T extends keyof HTMLElementTagNameMap = 'div'>(
	props: RowProps<T>
): ReactElement;

export default Row;
