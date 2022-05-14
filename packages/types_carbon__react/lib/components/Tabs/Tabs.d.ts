import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TabContentProps extends Omit<ReactDivAttr, 'onChange' | 'selected'> {
	/**
	 * Pass in a collection of <Tab> children to be rendered depending on the
	 * currently selected tab
	 */
	children?: ReactNode;

	/**
	 * Provide a className that is applied to the root <div> component for the
	 * <Tabs>
	 */
	className?: string;

	/**
	 * Specify whether the Tab content is hidden
	 */
	hidden?: boolean;

	/**
	 * Provide the props that describe the left overflow button
	 */
	leftOverflowButtonProps?: object;

	/**
	 * Specify whether or not to use the light component variant
	 */
	light?: boolean;

	/**
	 * Optionally provide an `onClick` handler that is invoked when a <Tab> is
	 * clicked
	 */
	onClick?: () => void;

	/**
	 * Optionally provide an `onKeyDown` handler that is invoked when keyed
	 * navigation is triggered
	 */
	onKeyDown?: () => void;

	/**
	 * Provide an optional handler that is called whenever the selection
	 * changes. This method is called with the index of the tab that was
	 * selected
	 */
	onSelectionChange?: () => void;

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

	/**
	 * Optionally provide an index for the currently selected <Tab>
	 */
	selected?: number;

	/**
	 * Choose whether or not to automatically change selection on focus
	 */
	selectionMode?: 'automatic' | 'manual';

	/**
	 * Provide a className that is applied to the <TabContent> components
	 */
	tabContentClassName?: string;

	/**
	 * Provide the type of Tab
	 */
	type?: 'default' | 'container';

	/**
	 * Specify which content tab should be initially selected when the component
	 * is first rendered
	 */
	defaultSelectedIndex?: number;

	/**
	 * Provide an optional function which is called whenever the state of the
	 * `Tabs` changes
	 */
	onChange?: (selection: { selectedIndex: number }) => void;

	/**
	 * Control which content panel is currently selected. This puts the component
	 * in a controlled mode and should be used along with `onChange`
	 */
	selectedIndex?: number;
}

declare const TabContent: FCReturn<TabContentProps>;

export default TabContent;
