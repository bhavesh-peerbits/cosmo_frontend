import { ReactNode } from 'react';
import { FCReturn, ReactAttr } from '../../../typings/shared';

interface AccordionProps extends Omit<ReactAttr, 'size'> {
	/**
	 * Specify the alignment of the accordion heading title and chevron.
	 */
	align?: 'start' | 'end';

	/**
	 * Pass in the children that will be rendered within the Accordion
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the container node
	 */
	className?: string;

	/**
	 * Specify whether an individual AccordionItem should be disabled
	 */
	disabled?: boolean;

	/**
	 * Specify the size of the Accordion. Currently supports the following:
	 */
	size?: 'sm' | 'md' | 'lg';
}
declare const Accordion: FCReturn<AccordionProps>;

export default Accordion;
