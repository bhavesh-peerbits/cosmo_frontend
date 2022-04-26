import { ReactNode } from 'react';
import { AriaLabelProps, FCReturn, ReactButtonAttr } from '../../../typings/shared';

interface HeaderMenuButtonProps extends AriaLabelProps, ReactButtonAttr {
	/**
	 * Optionally provide a custom class name that is applied to the underlying
	 * button
	 */
	className?: string;

	isActive?: boolean;

	isCollapsible?: boolean;

	renderMenuIcon?: ReactNode;
}

declare const HeaderMenuButton: FCReturn<HeaderMenuButtonProps>;

export default HeaderMenuButton;
