import { ReactNode } from 'react';
import { FCReturn, ReactInputAttr } from '../../../typings/shared';

interface DatePickerInputProps extends ReactInputAttr {
	/**
	 * The type of the date picker:
	 *
	 * * `simple` - Without calendar dropdown.
	 * * `single` - With calendar dropdown and single date.
	 * * `range` - With calendar dropdown and a date range.
	 */
	datePickerType?: 'simple' | 'single' | 'range';

	/**
	 * Specify whether or not the input should be disabled
	 */
	disabled?: boolean;

	/**
	 * Provide text that is used alongside the control label for additional help
	 */
	helperText?: ReactNode;

	/**
	 * Specify if the label should be hidden
	 */
	hideLabel?: boolean;

	/**
	 * Specify an id that uniquely identifies the `<input>`
	 */
	id: string;

	/**
	 * Specify whether or not the input should be invalid
	 */
	invalid?: boolean;

	/**
	 * Specify the text to be rendered when the input is invalid
	 */
	invalidText?: ReactNode;

	/**
	 * Provide the text that will be read by a screen reader when visiting this
	 * control
	 */
	labelText: ReactNode;

	/**
	 * Specify an `onChange` handler that is called whenever a change in the
	 * input field has occurred
	 */
	onChange?: () => void;

	/**
	 * Provide a function to be called when the input field is clicked
	 */
	onClick?: () => void;

	/**
	 * Specify the placeholder text
	 */
	placeholder?: string;

	/**
	 * Specify the size of the Date Picker Input. Currently supports either `sm`, 'md' (default) or 'lg` as an option.
	 * TODO V11: remove `xl` (replaced with lg)
	 */
	size?: 'sm' | 'md' | 'lg';

	/**
	 * Specify the type of the `<input>`
	 */
	type?: string;
	/**
	 * Specify whether the control is currently in warning state
	 */
	warn?: boolean;
	/**
	 * Provide the text that is displayed when the control is in warning state
	 */
	warnText?: ReactNode;
}

declare const DatePickerInput: FCReturn<DatePickerInputProps>;

export default DatePickerInput;
