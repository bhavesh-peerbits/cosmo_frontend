import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface ListItemProps extends ReactDivAttr {
	/**
	 * Specify the content for the ListItem
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to apply to the underlying `<li>` node
	 */
	className?: string;
}

declare const ListItem: FCReturn<ListItemProps>;

export default ListItem;
