import { FCReturn, ReactAttr } from '../../../typings/shared';
import { ReactNode } from 'react';

interface HeaderNavigationProps extends ReactAttr {
	/**
	 * Provide valid children of HeaderNavigation, for example `HeaderMenuItem`
	 * or `HeaderMenu`
	 */
	children?: ReactNode;

	/**
	 * Optionally provide a custom class to apply to the underlying <nav> node
	 */
	className?: string;
}

declare const HeaderNavigation: FCReturn<HeaderNavigationProps>;

export default HeaderNavigation;
