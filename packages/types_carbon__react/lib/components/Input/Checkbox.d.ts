import { FCReturn, ReactInputAttr } from '../../../typings/shared';
import { ReactNode } from 'react';

interface CheckboxProps extends ReactInputAttr {
	/**
	 * Specify whether the underlying input should be checked
	 */
	checked?: boolean;

	/**
	 * Specify an optional className to be applied to the <label> node
	 */
	className?: string;

	/**
	 * Specify whether the underlying input should be checked by default
	 */
	defaultChecked?: boolean;

	/**
	 * Specify whether the Checkbox should be disabled
	 */
	disabled?: boolean;

	/**
	 * Specify whether the label should be hidden, or not
	 */
	hideLabel?: boolean;

	/**
	 * Provide an `id` to uniquely identify the Checkbox input
	 */
	id: string;

	/**
	 * Specify whether the Checkbox is in an indeterminate state
	 */
	indeterminate?: boolean;

	/**
	 * Provide a label to provide a description of the Checkbox input that you are
	 * exposing to the user
	 */
	labelText: ReactNode;

	/**
	 * Receives three arguments: true/false, the checkbox's id, and the dom event.
	 * `(value, id, event) => console.log({value, id, event})`
	 */
	onChange?: (
		event: Event,
		{ checked, id }: { checked: boolean; id: CheckboxProps['id'] }
	) => void;

	/**
	 * Specify a title for the <label> node for the Checkbox
	 */
	title?: string;
}

declare const Checkbox: FCReturn<CheckboxProps>;

export default Checkbox;
