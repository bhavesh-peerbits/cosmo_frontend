import { FC, ReactNode, MouseEvent, KeyboardEvent } from 'react';
import { ReactAttr, RenderIcon } from 'typings/shared';

interface NodeType {
	id: number | string;
	label: ReactNode;
	value: string;
}

interface ValueType extends NodeType {
	isExpanded: boolean;
}

interface TreeNodeProps extends Omit<ReactAttr<'li'>, 'onSelect' | 'label' | 'selected'> {
	/**
	 * The value of the active node in the tree
	 */
	active?: string | number;

	/**
	 * Specify the children of the TreeNode
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the TreeNode
	 */
	className?: string;

	/**
	 * TreeNode depth to determine spacing, automatically calculated by default
	 */
	depth?: number;

	/**
	 * Specify if the TreeNode is disabled
	 */
	disabled?: boolean;

	/**
	 * Specify if the TreeNode is expanded (only applicable to parent nodes)
	 */
	isExpanded?: boolean;

	/**
	 * Rendered label for the TreeNode
	 */
	label?: ReactNode;

	/**
	 * Callback function for when the node receives or loses focus
	 */
	onNodeFocusEvent?: ReactAttr<'li'>['onFocus'];

	/**
	 * Callback function for when the node is selected
	 */
	onSelect?: (
		event: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>,
		node: NodeType
	) => void;

	/**
	 * Callback function for when a parent node is expanded or collapsed
	 */
	onToggle?: (
		event: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>,
		value: ValueType
	) => void;

	/**
	 * Callback function for when any node in the tree is selected
	 */
	onTreeSelect?:
		| ((event: MouseEvent<HTMLDataListElement>, node: NodeType) => void)
		| undefined;

	/**
	 * Optional prop to allow each node to have an associated icon.
	 * Can be a React component class
	 */
	renderIcon?: RenderIcon;

	/**
	 * Array containing all selected node IDs in the tree
	 */
	selected?: string[] | number[];

	/**
	 * Specify the value of the TreeNode
	 */
	value?: string;
}

declare const TreeNode: FC<TreeNodeProps>;
export default TreeNode;
