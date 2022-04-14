import { HTMLProps, ReactElement, ReactNode } from 'react';

type Ran<T extends number> = number extends T ? number : _Range<T, []>;
type _Range<T extends number, R extends unknown[]> = R['length'] extends T
	? R[number]
	: _Range<T, [R['length'], ...R]>;

type StackProps<K extends keyof HTMLElementTagNameMap> = {
	/**
	 * Provide a custom element type to render as the outermost element in
	 * the Stack component. By default, this component will render a `div`.
	 */
	as?: K;

	/**
	 * Provide the elements that will be rendered as children inside of the Stack
	 * component. These elements will have having spacing between them according
	 * to the `step` and `orientation` prop
	 */
	children?: ReactNode;

	/**
	 * Provide a custom class name to be used by the outermost element rendered by
	 * Stack
	 */
	className?: string;

	/**
	 * Provide either a custom value or a step from the spacing scale to be used
	 * as the gap in the layout
	 */
	gap?: string | Ran<14>;

	/**
	 * Specify the orientation of them items in the Stack
	 */
	orientation?: 'horizontal' | 'vertical';
} & HTMLProps<HTMLElementTagNameMap[K]>;

declare function Stack<T extends keyof HTMLElementTagNameMap = 'a'>(
	props: StackProps<T>
): ReactElement;

export default Stack;
