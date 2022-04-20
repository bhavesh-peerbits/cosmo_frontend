import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TabPanelProps extends ReactDivAttr {
	/**
	 * Provide child elements to be rendered inside of `TabPanel`.
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be added to TabPanel.
	 */
	className?: string;
}

declare const TabPanel: FCReturn<TabPanelProps>;

export default TabPanel;
