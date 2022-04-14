import { AriaLabelProps, FCReturn, ReactAttr } from '../../../typings/shared';

interface HeaderProps extends AriaLabelProps, ReactAttr {
	className?: string;
}

export const Header: FCReturn<HeaderProps>;

export default Header;
