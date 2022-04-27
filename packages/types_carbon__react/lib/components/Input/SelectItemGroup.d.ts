import { ReactNode } from 'react';
import { FCReturn, ReactInputAttr } from '../../../typings/shared';

interface SelectItemGroupProps extends ReactInputAttr {
	/**
	 * Provide the contents of your <SelectItemGroup>
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the node
	 */
	className?: string;

	/**
	 * Specify whether the <SelectItemGroup> should be disabled
	 */
	disabled?: boolean;

	/**
	 * Specify the label to be displayed
	 */
	label: string;
}

declare const SelectItemGroup: FCReturn<SelectItemGroupProps>;

export default SelectItemGroup;
