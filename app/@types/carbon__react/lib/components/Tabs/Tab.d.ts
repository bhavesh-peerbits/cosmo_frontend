import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TabProps extends Omit<ReactDivAttr, 'label'> {
	/**
	 * Specify an optional className to be added to your Tab
	 */
	className?: string;

	/**
	 * Whether your Tab is disabled.
	 */
	disabled?: boolean;

	/**
	 * A handler that is invoked when a user clicks on the control.
	 * Reserved for usage in Tabs
	 */
	handleTabClick?: () => void;

	/**
	 * A handler that is invoked on the key down event for the control.
	 * Reserved for usage in Tabs
	 */
	handleTabKeyDown?: () => void;

	/**
	 * Provide a string that represents the `href` of the Tab
	 */
	// href: deprecate(PropTypes.string),

	/**
	 * The element ID for the top-level element.
	 */
	id?: string;

	/**
	 * The index of your Tab in your Tabs. Reserved for usage in Tabs
	 */
	index?: number;

	/**
	 * Provide the contents of your Tab
	 */
	label?: ReactNode;

	/**
	 * Provide a handler that is invoked when a user clicks on the control
	 */
	onClick?: () => void;

	/**
	 * Provide a handler that is invoked on the key down event for the control
	 */
	onKeyDown?: () => void;

	/**
	 * An optional parameter to allow overriding the anchor rendering.
	 * Useful for using Tab along with react-router or other client
	 * side router libraries.
	 */
	// renderAnchor: deprecate(PropTypes.func),
	renderButton?: () => void;

	/**
	 * An optional parameter to allow overriding the content rendering.
	 */
	renderContent?: () => void;

	/**
	 * Provide an accessibility role for your Tab
	 */
	// role: deprecate(PropTypes.string),

	/**
	 * Whether your Tab is selected.
	 * Reserved for usage in Tabs
	 */
	selected?: boolean;

	/**
	 * Specify the tab index of the `<button>` node
	 */
	tabIndex?: number;
}

declare const Tab: FCReturn<TabProps>;

export default Tab;
