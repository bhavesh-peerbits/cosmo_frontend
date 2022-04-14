import { AriaLabelProps, FCReturn, ReactButtonAttr } from '../../../typings/shared';

interface HeaderMenuButtonProps extends AriaLabelProps, ReactButtonAttr {
	/**
	 * Optionally provide a custom class name that is applied to the underlying
	 * button
	 */
	className?: string;

	isActive?: boolean;
}

declare const HeaderMenuButton: FCReturn<HeaderMenuButtonProps>;

export default HeaderMenuButton;
