import { FCReturn, ReactInputAttr } from '../../../typings/shared';
import { ReactNode } from 'react';

interface PasswordInputProps extends ReactInputAttr {
	/**
	 * Provide a custom className that is applied directly to the underlying
	 * `<input>` node
	 */
	className?: string;

	/**
	 * Optionally provide the default value of the `<input>`
	 */
	defaultValue?: ReactInputAttr['defaultValue'];

	/**
	 * Specify whether the control is disabled
	 */
	disabled?: boolean;

	/**
	 * Provide text that is used alongside the control label for additional help
	 */
	helperText?: ReactNode;

	/**
	 * Specify whether or not the underlying label is visually hidden
	 */
	hideLabel?: boolean;

	/**
	 * "Hide password" tooltip text on password visibility toggle
	 */
	hidePasswordLabel?: string;

	/**
	 * Provide a unique identifier for the input field
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
	 * Callback function that is called whenever the toggle password visibility
	 * button is clicked
	 */
	onTogglePasswordVisibility?: () => void;

	/**
	 * Specify the placeholder attribute for the `<input>`
	 */
	placeholder?: string;

	/**
	 * "Show password" tooltip text on password visibility toggle
	 */
	showPasswordLabel?: string;

	/**
	 * Specify the size of the Text Input.
	 */
	size?: 'sm' | 'md' | 'lg';

	/**
	 * Specify the alignment of the tooltip to the icon-only button.
	 * Can be one of: start, center, or end.
	 */
	tooltipAlignment?: 'start' | 'center' | 'end';

	/**
	 * Specify the direction of the tooltip for icon-only buttons.
	 * Can be either top, right, bottom, or left.
	 */
	tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';

	/**
	 * The input type, either password or text
	 */
	type?: 'password' | 'text';

	/**
	 * Provide the current value of the `<input>`
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

declare const PasswordInput: FCReturn<PasswordInputProps>;

export default PasswordInput;
