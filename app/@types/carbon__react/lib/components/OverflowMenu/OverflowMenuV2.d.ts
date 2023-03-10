import { FC, ReactNode } from 'react';
import { ReactButtonAttr, RenderIcon } from '../../../typings/shared';

interface OverflowMenuV2Props extends Omit<ReactButtonAttr, 'size'> {
	/**
	 * Specify the children of the OverflowMenu
	 */
	children?: ReactNode;

	/**
	 * Optional className for the trigger button
	 */
	className?: string;

	/**
	 * Function called to override icon rendering.
	 */
	renderIcon?: RenderIcon;

	/**
	 * Specify the size of the menu, from a list of available sizes.
	 */
	size?: 'sm' | 'md' | 'lg';
}

declare const OverflowMenuV2: FC<OverflowMenuV2Props>;
export default OverflowMenuV2;
