import { ChangeEvent, ReactNode } from 'react';
import { FCReturn, ReactAttr } from '../../../typings/shared';

interface SelectProps extends Omit<ReactAttr<HTMLSelectElement>, 'size'> {
	/**
	 * Provide the contents of your Select
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
	 * Provide text that is used alongside the control label for additional help
	 */
	helperText?: ReactNode;

	/**
	 * Specify whether the label should be hidden, or not
	 */
	hideLabel?: boolean;

	/**
	 * Specify a custom `id` for the `<select>`
	 */
	id: string;

	/**
	 * Specify whether you want the inline version of this control
	 */
	inline?: boolean;

	/**
	 * Specify if the currently value is invalid.
	 */
	invalid?: boolean;

	/**
	 * Message which is displayed if the value is invalid.
	 */
	invalidText?: ReactNode;

	/**
	 * Provide label text to be read by screen readers when interacting with the
	 * control
	 */
	labelText?: ReactNode;

	/**
	 * `true` to use the light version. For use on $ui-01 backgrounds only.
	 * Don't use this to make tile background color same as container background color.
	 */
	light?: boolean;
	/**
	 * Reserved for use with <Pagination> component. Will not render a label for the
	 * select since Pagination renders one for us.
	 */
	noLabel?: boolean;

	/**
	 * Provide an optional `onChange` hook that is called each time the value of
	 * the underlying `<input>` changes
	 */
	onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;

	/**
	 * Specify the size of the Select Input.
	 */
	size?: 'sm' | 'md' | 'lg';

	/**
	 * Specify whether the control is currently in warning state
	 */
	warn?: boolean;

	/**
	 * Provide the text that is displayed when the control is in warning state
	 */
	warnText?: ReactNode;
}

declare const Select: FCReturn<SelectProps>;
export default Select;
