import { ReactNode } from 'react';
import {
	FCReturn,
	ReactButtonAttr,
	ReactDivAttr,
	RenderIcon
} from '../../../typings/shared';

interface ContainedListItemProps extends Omit<ReactDivAttr, 'size'> {
	/**
	 * A slot for a possible interactive element to render within the item.
	 */
	action?: ReactNode;

	/**
	 * The content of this item. Must not contain any interactive elements. Use props.action to include those.
	 */
	children?: ReactNode;

	/**
	 * Additional CSS class names.
	 */
	className?: string;

	/**
	 * Whether this item is disabled.
	 */
	disabled?: boolean;

	/**
	 * Provide an optional function to be called when the item is clicked.
	 */
	onClick?: ReactButtonAttr['onClick'];

	/**
	 * Provide an optional icon to render in front of the item's content.
	 */
	renderIcon?: RenderIcon;
}
declare const ContainedListItem: FCReturn<ContainedListItemProps>;

export default ContainedListItem;
