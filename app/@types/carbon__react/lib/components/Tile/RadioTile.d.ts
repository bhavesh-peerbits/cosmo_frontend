import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface RadioTileProps extends ReactDivAttr {
	/**
	 * `true` if this tile should be selected.
	 */
	checked?: boolean;

	/**
	 * The tile content.
	 */
	children?: ReactNode;

	/**
	 * The CSS class names.
	 */
	className?: string;

	/**
	 * Specify whether the RadioTile should be disabled
	 */
	disabled?: boolean;

	/**
	 * The ID of the `<input>`.
	 */
	id?: string;

	/**
	 * The `name` of the `<input>`.
	 */
	name?: string;

	/**
	 * The handler of the massaged `change` event on the `<input>`.
	 */
	onChange?: ReactDivAttr['onChange'];

	/**
	 * Specify the tab index of the wrapper element
	 */
	tabIndex?: number;

	/**
	 * The `value` of the `<input>`.
	 */
	value: string | number;
}
declare const RadioTile: FCReturn<RadioTileProps>;

export default RadioTile;
