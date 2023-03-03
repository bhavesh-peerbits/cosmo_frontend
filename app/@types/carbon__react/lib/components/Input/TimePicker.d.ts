import { ReactNode } from 'react';
import { FCReturn, ReactInputAttr } from '../../../typings/shared';

interface TimePickerProps extends Omit<ReactInputAttr, 'value'> {
	/**
	 * Pass in the children that will be rendered next to the form control
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the container node
	 */
	className?: string;

	/**
	 * Specify whether the `<input>` should be disabled
	 */
	disabled?: boolean;

	/**
	 * Specify whether you want the underlying label to be visually hidden
	 */
	hideLabel?: boolean;

	/**
	 * Specify a custom `id` for the `<input>`
	 */
	id: string;

	/**
	 * Specify whether the control is currently invalid
	 */
	invalid?: boolean;

	/**
	 * Provide the text that is displayed when the control is in an invalid state
	 */
	invalidText?: ReactNode;

	/**
	 * Provide the text that will be read by a screen reader when visiting this
	 * control
	 */
	labelText?: ReactNode;

	/**
	 * Specify the maximum length of the time string in `<input>`
	 */
	maxLength?: number;

	/**
	 * Optionally provide an `onBlur` handler that is called whenever the
	 * `<input>` loses focus
	 */
	onBlur?: ReactInputAttr['onBlur'];

	/**
	 * Optionally provide an `onChange` handler that is called whenever `<input>`
	 * is updated
	 */
	onChange?: ReactInputAttr['onChange'];

	/**
	 * Optionally provide an `onClick` handler that is called whenever the
	 * `<input>` is clicked
	 */
	onClick?: ReactInputAttr['onClick'];

	/**
	 * Specify the regular expression working as the pattern of the time string in `<input>`
	 */
	pattern?: string;

	/**
	 * Specify the placeholder attribute for the `<input>`
	 */
	placeholder?: string;

	/**
	 * Specify whether the TimePicker should be read-only
	 */
	readOnly?: boolean;

	/**
	 * Specify the size of the Time Picker.
	 */
	size?: 'sm' | 'md' | 'lg';

	/**
	 * Specify the type of the `<input>`
	 */
	type?: string;

	/**
	 * Specify the value of the `<input>`
	 */
	value?: string;
}

declare const TimePicker: FCReturn<TimePickerProps>;

export default TimePicker;
