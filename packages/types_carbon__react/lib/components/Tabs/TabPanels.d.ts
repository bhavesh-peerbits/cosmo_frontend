import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TabPanelsProps extends ReactDivAttr {
	/**
	 * Provide child elements to be rendered inside of `TabPanels`.
	 */
	children?: ReactNode;
}

declare const TabPanels: FCReturn<TabPanelsProps>;

export default TabPanels;
