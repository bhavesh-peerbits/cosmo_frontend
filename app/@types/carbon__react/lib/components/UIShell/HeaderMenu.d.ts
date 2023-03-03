import { AriaLabelProps, FCReturn, ReactLIAttr } from '../../../typings/shared';

interface HeaderMenuProps extends AriaLabelProps, ReactLIAttr {
	/**
	 * Provide a custom ref handler for the menu button
	 */
	focusRef?: () => void;

	/**
	 * Provide a label for the link text
	 */
	menuLinkName: string;

	/**
	 * Optional component to render instead of string
	 */
	renderMenuContent?: () => void;

	/**
	 * Optionally provide a tabIndex for the underlying menu button
	 */
	tabIndex?: number;
}

declare const HeaderMenu: FCReturn<HeaderMenuProps>;
export default HeaderMenu;
