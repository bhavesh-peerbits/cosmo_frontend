import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface ButtonSetProps extends ReactDivAttr {
	/**
	 * Specify the content of your ButtonSet
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be added to your ButtonSet
	 */
	className?: string;

	/**
	 * Specify the button arrangement of the set (vertically stacked or
	 * horizontal)
	 */
	stacked?: boolean;
}

declare const ButtonSet: FCReturn<ButtonSetProps>;

export default ButtonSet;
