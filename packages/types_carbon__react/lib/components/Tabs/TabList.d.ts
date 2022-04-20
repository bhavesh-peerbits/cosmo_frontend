import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TabListProps extends ReactDivAttr {
	/**
	 * Specify whether the content tab should be activated automatically or
	 * manually
	 */
	activation?: 'automatic' | 'manual';

	/**
	 * Provide an accessible label to be read when a user interacts with this
	 * component
	 */
	ariaLabel: string;

	/**
	 * Provide child elements to be rendered inside of `ContentTabs`.
	 * These elements should render a `ContentTab`
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be added to the container node
	 */
	className?: string;

	/**
	 * Specify whether component is contained type
	 */
	contained?: boolean;

	/**
	 * If using `IconTab`, specify the size of the icon being used.
	 */
	iconSize?: 'default' | 'lg';

	/**
	 * Provide the props that describe the left overflow button
	 */
	leftOverflowButtonProps?: object;

	/**
	 * Specify whether or not to use the light component variant
	 */
	light?: boolean;

	/**
	 * Provide the props that describe the right overflow button
	 */
	rightOverflowButtonProps?: object;

	/**
	 * Optionally provide a delay (in milliseconds) passed to the lodash
	 * debounce of the onScroll handler. This will impact the responsiveness
	 * of scroll arrow buttons rendering when scrolling to the first or last tab.
	 */
	scrollDebounceWait?: number;

	/**
	 * Choose whether or not to automatically scroll to newly selected tabs
	 * on component rerender
	 */
	scrollIntoView?: boolean;
}

declare const TabList: FCReturn<TabListProps>;

export default TabList;
