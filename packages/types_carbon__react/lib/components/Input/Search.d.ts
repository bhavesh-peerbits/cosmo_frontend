import { ReactElement, ReactNode } from 'react';
import { FCReturn, ReactInputAttr } from '../../../typings/shared';

export interface SearchProps extends Omit<ReactInputAttr, 'size'> {
	/**
	 * Specify an optional className to be applied to the container node
	 */
	className?: string;

	/**
	 * Specify a label to be read by screen readers on the "close" button
	 */
	closeButtonLabelText?: string;

	/**
	 * Optionally provide the default value of the `<input>`
	 */
	defaultValue?: string | number;

	/**
	 * Specify whether the `<input>` should be disabled
	 */
	disabled?: boolean;

	/**
	 * Specify a custom `id` for the input
	 */
	id?: string;

	/**
	 * Provide the label text for the Search icon
	 */
	labelText: ReactNode;

	/**
	 * Specify light version or default version of this control
	 */
	light?: boolean;

	/**
	 * Optional callback called when the search value changes.
	 */
	onChange?: ReactInputAttr['onChange'];

	/**
	 * Optional callback called when the search value is cleared.
	 */
	onClear?: () => void;

	/**
	 * Provide a handler that is invoked on the key down event for the input
	 */
	onKeyDown?: () => void;

	/**
	 * Provide an optional placeholder text for the Search.
	 * Note: if the label and placeholder differ,
	 * VoiceOver on Mac will read both
	 */
	placeholder?: string;

	/**
	 * Rendered icon for the Search.
	 * Can be a React component class
	 */
	renderIcon?: (() => ReactElement) | ReactElement;

	/**
	 * Specify the search size
	 */
	size?: 'sm' | 'md' | 'lg' | 'xl';

	/**
	 * Optional prop to specify the type of the `<input>`
	 */
	type?: string;

	/**
	 * Specify the value of the `<input>`
	 */
	value?: string | number;
}

declare const Search: FCReturn<SearchProps>;
export default Search;
