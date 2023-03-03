import { ReactNode } from 'react';
import { FCReturn, ReactAttr } from '../../../typings/shared';

interface TimePickerSelectProps extends Omit<ReactAttr<HTMLSelectElement>, 'size'> {
	/**
	 * Provide the contents of your TimePickerSelect
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the node containing the label and the select box
	 */
	className?: string;

	/**
	 * Optionally provide the default value of the `<select>`
	 */
	defaultValue?: any;

	/**
	 * Specify whether the control is disabled
	 */
	disabled?: boolean;

	/**
	 * Specify a custom `id` for the `<select>`
	 */
	id: string;
}

declare const TimePickerSelect: FCReturn<TimePickerSelectProps>;
export default TimePickerSelect;
