import { ReactNode } from 'react';
import { FCReturn, ReactAttr } from '../../../typings/shared';

type ReactAttrTextArea = ReactAttr<HTMLTextAreaElement>;

interface TextAreaProps extends ReactAttrTextArea {
	/**
	 * Provide a custom className that is applied directly to the underlying
	 * `<textarea>` node
	 */
	className?: string;

	/**
	 * Specify the `cols` attribute for the underlying `<textarea>` node
	 */
	cols?: number;

	/**
	 * Optionally provide the default value of the `<textarea>`
	 */
	defaultValue?: ReactAttrTextArea['defaultValue'];

	/**
	 * Specify whether the control is disabled
	 */
	disabled?: boolean;

	/**
	 * Specify whether to display the character counter
	 */
	enableCounter?: boolean;

	/**
	 * Provide text that is used alongside the control label for additional help
	 */
	helperText?: ReactNode;

	/**
	 * Specify whether you want the underlying label to be visually hidden
	 */
	hideLabel?: boolean;

	/**
	 * Provide a unique identifier for the control
	 */
	id?: string;

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
	 * Max character count allowed for the textarea. This is needed in order for enableCounter to display
	 */
	maxCount?: number;

	/**
	 * Optionally provide an `onChange` handler that is called whenever `<textarea>`
	 * is updated
	 */
	onChange?: ReactAttrTextArea['onChange'];

	/**
	 * Optionally provide an `onClick` handler that is called whenever the
	 * `<textarea>` is clicked
	 */
	onClick?: ReactAttrTextArea['onClick'];

	/**
	 * Specify the placeholder attribute for the `<textarea>`
	 */
	placeholder?: string;

	/**
	 * Specify the rows attribute for the `<textarea>`
	 */
	rows?: number;

	/**
	 * Provide the current value of the `<textarea>`
	 */
	value?: ReactAttrTextArea['value'];
}

declare const TextArea: FCReturn<TextAreaProps>;
export default TextArea;
