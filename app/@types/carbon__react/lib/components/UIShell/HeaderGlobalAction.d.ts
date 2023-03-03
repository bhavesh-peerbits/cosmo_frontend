import { ReactNode } from 'react';
import { AriaLabelProps, FCReturn, ReactAttr } from '../../../typings/shared';

interface HeaderGlobalActionProps extends AriaLabelProps, ReactAttr<HTMLButtonElement> {
	/**
	 * Provide a custom icon for this global action
	 */
	children: ReactNode;

	/**
	 * Optionally provide a custom class name that is applied to the underlying
	 * button
	 */
	className?: string;

	/**
	 * Specify whether the action is currently active
	 */
	isActive?: boolean;

	/**
	 * Specify the alignment of the tooltip to the icon-only button.
	 * Can be one of: start, center, or end.
	 */
	tooltipAlignment?: 'start' | 'center' | 'end';
}

declare const HeaderGlobalAction: FCReturn<HeaderGlobalActionProps>;
export default HeaderGlobalAction;
