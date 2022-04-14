import { HTMLProps, ReactElement, ReactNode } from 'react';

type PercentSpanType = '25%' | '50%' | '75%' | '100%';

type SpanPropType =
	| boolean
	| number
	| { span?: number | PercentSpanType; offset?: number; start?: number; end?: number }
	| PercentSpanType;

type ColumnProps<K extends keyof HTMLElementTagNameMap> = {
	/**
	 * Provide a custom element to render instead of the default <div>
	 */
	as?: K;
	/**
	 * Pass in content that will be rendered within the `Column`
	 */
	children?: ReactNode;

	/**
	 * Specify a custom className to be applied to the `Column`
	 */
	className?: string;

	/**
	 * Specify column span for the `lg` breakpoint (Default breakpoint up to 1312px)
	 * This breakpoint supports 16 columns by default.
	 *
	 * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
	 */
	lg?: SpanPropType;

	/**
	 * Specify column span for the `max` breakpoint. This breakpoint supports 16
	 * columns by default.
	 *
	 * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
	 */
	max?: SpanPropType;

	/**
	 * Specify column span for the `md` breakpoint (Default breakpoint up to 1056px)
	 * This breakpoint supports 8 columns by default.
	 *
	 * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
	 */
	md?: SpanPropType;

	/**
	 * Specify column span for the `sm` breakpoint (Default breakpoint up to 672px)
	 * This breakpoint supports 4 columns by default.
	 *
	 * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
	 */
	sm?: SpanPropType;

	/**
	 * Specify column span for the `xlg` breakpoint (Default breakpoint up to
	 * 1584px) This breakpoint supports 16 columns by default.
	 *
	 * @see https://www.carbondesignsystem.com/guidelines/layout#breakpoints
	 */
	xlg?: SpanPropType;
} & HTMLProps<HTMLElementTagNameMap[K]>;

declare function Column<T extends keyof HTMLElementTagNameMap = 'div'>(
	props: ColumnProps<T>
): ReactElement;

export default Column;
