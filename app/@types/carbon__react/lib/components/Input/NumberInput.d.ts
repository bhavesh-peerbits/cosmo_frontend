import React, { ReactNode } from 'react';
import { FCReturn, ReactButtonAttr, ReactInputAttr } from '../../../typings/shared';

interface NumberInputProps
	extends Omit<ReactInputAttr, 'size' | 'label' | 'onChange' | 'onKeyUp' | 'onClick'> {
	/**
	 * `true` to allow empty string.
	 */
	allowEmpty?: boolean;

	/**
	 * Specify an optional className to be applied to the wrapper node
	 */
	className?: string;

	/**
	 * Optional starting value for uncontrolled state
	 */
	defaultValue?: string | number;

	/**
	 * Specify if the wheel functionality for the input should be disabled, or not
	 */
	disableWheel?: boolean;

	/**
	 * Specify if the control should be disabled, or not
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
	 * Specify whether you want the steppers to be hidden
	 */
	hideSteppers?: boolean;

	/**
	 * Provide a description for up/down icons that can be read by screen readers
	 */
	iconDescription?: string;

	/**
	 * Specify a custom `id` for the input
	 */
	id: string;

	/**
	 * Specify if the currently value is invalid.
	 */
	invalid?: boolean;

	/**
	 * Message which is displayed if the value is invalid.
	 */
	invalidText?: ReactNode;

	/**
	 * Generic `label` that will be used as the textual representation of what
	 * this field is for
	 */
	label?: ReactNode;

	/**
	 * The maximum value.
	 */
	max?: number;

	/**
	 * The minimum value.
	 */
	min?: number;

	/**
	 * Provide an optional handler that is called when the internal state of
	 * NumberInput changes. This handler is called with event and state info.
	 * `(event, { value, direction }) => void`
	 */
	onChange?: (
		event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>,
		data: { direction: 'up' | 'down'; value: number | string }
	) => void;

	/**
	 * Provide an optional function to be called when the up/down button is clicked
	 */
	onClick?: (
		event: React.MouseEvent<HTMLButtonElement>,
		data: { direction: 'up' | 'down'; value: string | number }
	) => void;

	/**
	 * Provide an optional function to be called when a key is pressed in the number input
	 */
	onKeyUp?: ReactButtonAttr['onKeyUp'];

	/**
	 * Specify if the component should be read-only
	 */
	readOnly?: boolean;

	/**
	 * Specify the size of the Number Input.
	 */
	size?: 'sm' | 'md' | 'lg';

	/**
	 * Specify how much the values should increase/decrease upon clicking on up/down button
	 */
	step?: number;

	/**
	 * Provide custom text for the component for each translation id
	 */
	translateWithId?: () => void;

	/**
	 * Specify the value of the input
	 */
	value?: number | string;

	/**
	 * Specify whether the control is currently in warning state
	 */
	warn?: boolean;

	/**
	 * Provide the text that is displayed when the control is in warning state
	 */
	warnText?: ReactNode;
}

declare const NumberInput: FCReturn<NumberInputProps>;

export default NumberInput;
