import { FC, ReactNode, SyntheticEvent } from 'react';
import { ReactInputAttr } from '../../../typings/shared';

export interface RadioButtonProps extends ReactInputAttr {
	/**
	 * Specify whether the `<RadioButton>` is currently checked
	 */
	checked?: boolean;

	/**
	 * Provide an optional className to be applied to the containing node
	 */
	className?: string;

	/**
	 * Specify whether the `<RadioButton>` should be checked by default
	 */
	defaultChecked?: boolean;

	/**
	 * Specify whether the control is disabled
	 */
	disabled?: boolean;

	/**
	 * Specify whether the label should be hidden, or not
	 */
	hideLabel?: boolean;

	/**
	 * Provide a unique id for the underlying `<input>` node
	 */
	id?: string;

	/**
	 * Provide where label text should be placed
	 * NOTE: `top`/`bottom` are deprecated
	 */
	labelPosition?: 'right' | 'left';

	/**
	 * Provide label text to be read by screen readers when interacting with the
	 * control
	 */
	labelText: ReactNode;

	/**
	 * Provide a name for the underlying `<input>` node
	 */
	name?: string;

	/**
	 * Provide an optional `onChange` hook that is called each time the value of
	 * the underlying `<input>` changes
	 */
	onChange?: (
		value: string | number,
		name: string,
		event: SyntheticEvent<HTMLInputElement>
	) => void;

	/**
	 * Provide a handler that is invoked when a user clicks on the control
	 */
	onClick?: ReactInputAttr['onClick'];

	/**
	 * Specify the value of the `<RadioButton>`
	 */
	value: string | number;
}

declare const RadioButton: FC<RadioButtonProps>;
export default RadioButton;
