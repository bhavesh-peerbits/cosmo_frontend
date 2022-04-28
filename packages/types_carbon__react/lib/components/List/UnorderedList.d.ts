import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface UnorderedListProps extends ReactDivAttr {
	/**
	 * Specify a collection of ListItem's to be rendered in the UnorderedList
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the underlying `<ul>` node
	 */
	className?: string;

	/**
	 * Specify whether this ordered list expressive or not
	 */
	isExpressive?: boolean;

	/**
	 * Specify whether the list is nested, or not
	 */
	nested?: boolean;
}

declare const UnorderedList: FCReturn<UnorderedListProps>;

export default UnorderedList;
