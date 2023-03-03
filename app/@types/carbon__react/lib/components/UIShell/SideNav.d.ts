import React from 'react';
import { AriaLabelProps, FCReturn, ReactDivAttr } from '../../../typings/shared';

interface SideNavProps extends AriaLabelProps, ReactDivAttr {
	/**
	 * Specify whether focus and blur listeners are added. They are by default.
	 */
	addFocusListeners?: boolean;

	/**
	 * Specify whether mouse entry/exit listeners are added. They are by default.
	 */
	addMouseListeners?: boolean;

	/**
	 * Optionally provide a custom class to apply to the underlying `<li>` node
	 */
	className?: string;

	/**
	 * If `true`, the SideNav will be open on initial render.
	 */
	defaultExpanded?: boolean;

	/**
	 * If `true`, the SideNav will be expanded, otherwise it will be collapsed.
	 * Using this prop causes SideNav to become a controled component.
	 */
	expanded?: boolean;

	/**
	 * Optionally provide a custom class to apply to the underlying `<li>` node
	 */
	isChildOfHeader?: boolean;

	/**
	 * Specify if sideNav is standalone
	 */
	isFixedNav?: boolean;

	/**
	 * Specify if the sideNav will be persistent above the lg breakpoint
	 */
	isPersistent?: boolean;

	/**
	 * Optional prop to display the side nav rail.
	 */
	isRail?: boolean;

	/**
	 * An optional listener that is called when the SideNav overlay is clicked
	 *
	 * @param {object} event
	 */
	onOverlayClick?: ReactDivAttr['onClick'];

	/**
	 * An optional listener that is called when an event that would cause
	 * toggling the SideNav occurs.
	 *
	 * @param {object} event
	 * @param {boolean} value
	 */
	onToggle?: (event: React.MouseEvent<HTMLElement>, value: boolean) => void;

	/**
	 * Provide a custom function for translating all message ids within this
	 * component. This function will take in two arguments: the mesasge Id and the
	 * state of the component. From this, you should return a string representing
	 * the label you want displayed or read by screen readers.
	 */
	translateById?: (messageId: string) => string;
}

declare const SideNav: FCReturn<SideNavProps>;
export default SideNav;
