import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface ToggleProps extends ReactDivAttr {
	['aria-label']: string;

	/**
	 * Specify a custom className to apply to the form-item node
	 */
	className?: string;

	/**
	 * Specify whether the toggle should be on by default
	 */
	defaultToggled?: boolean;

	/**
	 * Provide an id that unique represents the underlying `<input>`
	 */
	id: string;

	/**
	 * Specify the label for the "off" position
	 */
	labelA: ReactNode;

	/**
	 * Specify the label for the "on" position
	 */
	labelB: ReactNode;

	/**
	 * Provide the text that will be read by a screen reader when visiting this
	 * control
	 */
	labelText?: ReactNode;
	/**
	 * Provide an optional hook that is called when the control is changed
	 */
	onChange?: () => void;

	/**
	 * Provide an optional hook that is called when the control is toggled
	 */
	onToggle?: () => void;

	/**
	 * Specify the size of the Toggle. Currently only supports 'sm' or 'md' (default)
	 */
	size?: 'sm' | 'md';

	/**
	 * Specify whether the control is toggled
	 */
	toggled?: boolean;
}

declare const Toggle: FCReturn<ToggleProps>;

export default Toggle;
