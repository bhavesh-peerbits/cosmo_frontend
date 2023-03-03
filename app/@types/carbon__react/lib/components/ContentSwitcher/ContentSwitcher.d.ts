import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface ContentSwitcherProps extends Omit<ReactDivAttr, 'size'> {
	/**
	 * Pass in Switch components to be rendered in the ContentSwitcher
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be added to the container node
	 */
	className?: string;

	/**
	 * Specify an `onChange` handler that is called whenever the ContentSwitcher
	 * changes which item is selected
	 */
	onChange: ReactDivAttr['onChange'];

	/**
	 * Specify a selected index for the initially selected content
	 */
	selectedIndex?: number;

	/**
	 * Choose whether or not to automatically change selection on focus
	 */
	selectionMode?: 'automatic' | 'manual';

	/**
	 * Specify the size of the Content Switcher. Currently supports either `sm`, 'md' (default) or 'lg` as an option.
	 */
	size?: 'sm' | 'md' | 'lg';
}
declare const ContentSwitcher: FCReturn<ContentSwitcherProps>;

export default ContentSwitcher;
