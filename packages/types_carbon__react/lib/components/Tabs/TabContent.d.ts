import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TabContentProps extends ReactDivAttr {
	/**
	 * Pass in content to render inside of the TabContent
	 */
	children?: ReactNode;

	/**
	 * Provide a className for the tab content container
	 */
	className?: string;

	/**
	 * Specify whether the TabContent is selected
	 */
	selected?: boolean;
}

declare const TabContent: FCReturn<TabContentProps>;

export default TabContent;
