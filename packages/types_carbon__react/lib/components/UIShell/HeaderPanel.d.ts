import { FCReturn, ReactAttr } from '../../../typings/shared';

interface HeaderPanelProps extends ReactAttr<HTMLDivElement> {
	/**
	 * Optionally provide a custom class to apply to the underlying `<li>` node
	 */
	className?: string;

	/**
	 * Specify whether the panel is expanded
	 */
	expanded?: boolean;
}

declare const HeaderPanel: FCReturn<HeaderPanelProps>;

export default HeaderPanel;
