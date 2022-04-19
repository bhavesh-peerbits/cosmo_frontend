import { ReactNode } from 'react';
import { FCReturn, ReactInputAttr } from '../../../typings/shared';

interface TextInputProps extends ReactInputAttr {
	/**
	 * Specify an optional className to be applied to the `<input>` node
	 */
	className?: string;

	/**
	 * Optionally provide the default value of the `<input>`
	 */
	defaultValue?: ReactInputAttr['defaultValue'];

	/**
	 * Specify whether the `<input>` should be disabled
	 */
	disabled?: boolean;

	/**
	 * Provide text that is used alongside the control label for additional help
	 */
	helperText?: ReactNode;

	/**
	 * Specify whether you want the underlying label to be visually hidden
	 */
	hideLabel?: boolean;

	/**
	 * Specify a custom `id` for the `<input>`
	 */
	id: string;

	/**
	 * `true` to use the inline version.
	 */
	inline?: boolean;

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
	labelText: ReactNode;

	/**
	 * `true` to use the light version. For use on $ui-01 backgrounds only.
	 * Don't use this to make tile background color same as container background color.
	 */
	light?: boolean;

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
	 * Specify the placeholder attribute for the `<input>`
	 */
	placeholder?: string;

	/**
	 * Whether the input should be read-only
	 */
	readOnly?: boolean;

	/**
	 * Specify the size of the Text Input. Currently supports the following:
	 */
	size?: 'sm' | 'md' | 'lg';

	/**
	 * Specify the type of the `<input>`
	 */
	type?: ReactInputAttr['type'];

	/**
	 * Specify the value of the `<input>`
	 */
	value?: ReactInputAttr['value'];

	/**
	 * Specify whether the control is currently in warning state
	 */
	warn?: boolean;

	/**
	 * Provide the text that is displayed when the control is in warning state
	 */
	warnText?: ReactNode;
}

declare const TextInput: FCReturn<TextInputProps>;

export default TextInput;
