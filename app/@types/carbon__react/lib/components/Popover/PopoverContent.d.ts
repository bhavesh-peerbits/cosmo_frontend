import { ReactNode } from 'react';
import { AriaLabelProps, FCReturn, ReactDivAttr } from '../../../typings/shared';

interface PopoverContentProps extends AriaLabelProps, Omit<ReactDivAttr, 'size'> {
	/**
	 * Provide elements to be rendered inside of the component
	 */
	children: ReactNode;

	/**
	 * Provide a custom class name to be added to the outermost node in the
	 * component
	 */
	className: string;
}

declare const PopoverContent: FCReturn<PopoverContentProps>;

export default PopoverContent;
