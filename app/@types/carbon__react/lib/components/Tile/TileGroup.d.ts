import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TileGroupProps extends ReactDivAttr {
	/**
	 * Provide a collection of <RadioTile> components to render in the group
	 */
	children?: ReactNode;

	/**
	 * Provide an optional className to be applied to the container node
	 */
	className?: string;

	/**
	 * Specify the the value of <RadioTile> to be selected by default
	 */
	defaultSelected?: string | number;

	/**
	 * Specify whether the group is disabled
	 */
	disabled?: boolean;

	/**
	 * Provide an optional legend for this group
	 */
	legend?: string;

	/**
	 * Specify the name of the underlying `<input>` nodes
	 */
	name: string;

	/**
	 * Provide an optional `onChange` hook that is called whenever the value of
	 * the group changes
	 */
	onChange?: ReactDivAttr['onChange'];

	/**
	 * Specify the value that is currently selected in the group
	 */
	valueSelected?: string | number;
}
declare const TileGroup: FCReturn<TileGroupProps>;

export default TileGroup;
