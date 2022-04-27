import { FCReturn, ReactInputAttr } from '../../../typings/shared';

interface SelectItemProps extends ReactInputAttr {
	/**
	 * Specify an optional className to be applied to the node
	 */
	className?: string;

	/**
	 * Specify whether the <SelectItem> should be disabled
	 */
	disabled?: boolean;

	/**
	 * Specify whether the <SelectItem> is hidden
	 */
	hidden?: boolean;

	/**
	 * Provide the contents of your <SelectItem>
	 */
	text: string;

	/**
	 * Specify the value of the <SelectItem>
	 */
	value: any;
}

declare const SelectItem: FCReturn<SelectItemProps>;

export default SelectItem;
