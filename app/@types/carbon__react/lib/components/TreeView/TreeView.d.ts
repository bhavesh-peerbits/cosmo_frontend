import { FC, ReactNode, KeyboardEvent, MouseEvent } from 'react';
import { ReactAttr } from 'typings/shared';

interface TreeViewProps extends Omit<ReactAttr<'ul'>, 'selected' | 'size' | 'onSelect'> {
	/**
	 * Mark the active node in the tree, represented by its value
	 */
	active?: string | number;

	/**
	 * Specify the children of the TreeView
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the TreeView
	 */
	className?: string;

	/**
	 * Specify whether or not the label should be hidden
	 */
	hideLabel?: boolean;

	/**
	 * Provide the label text that will be read by a screen reader
	 */
	label: string;

	/**
	 * **[Experimental]** Specify the selection mode of the tree.
	 * If `multiselect` is `false` then only one node can be selected at a time
	 */
	multiselect?: boolean;
	/**
	 * Callback function that is called when any node is selected
	 */
	onSelect?: (
		event: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>,
		node: ReactNode
	) => void;

	/**
	 * Array representing all selected node IDs in the tree
	 */
	selected?: string[] | number[];

	/**
	 * Specify the size of the tree from a list of available sizes.
	 */
	size?: 'xs' | 'sm';
}

declare const TreeView: FC<TreeViewProps>;
export default TreeView;
