import { FC, ReactNode } from 'react';
import { RadioButtonProps } from './RadioButton';

interface RadioButtonGroupProps {
	/**
	 * Provide a collection of `<RadioButton>` components to render in the group
	 */
	children?: ReactNode;

	/**
	 * Provide an optional className to be applied to the container node
	 */
	className?: string;

	/**
	 * Specify the `<RadioButton>` to be selected by default
	 */
	defaultSelected?: string | number;

	/**
	 * Specify whether the group is disabled
	 */
	disabled?: boolean;

	/**
	 * Provide where label text should be placed
	 */
	labelPosition?: 'left' | 'right';

	/**
	 * Provide a legend to the RadioButtonGroup input that you are
	 * exposing to the user
	 */
	legendText?: ReactNode;

	/**
	 * Specify the name of the underlying `<input>` nodes
	 */
	name: string;

	/**
	 * Provide an optional `onChange` hook that is called whenever the value of
	 * the group changes
	 */
	onChange?: RadioButtonProps['onChange'];

	/**
	 * Provide where radio buttons should be placed
	 */
	orientation?: 'horizontal' | 'vertical';

	/**
	 * Specify the value that is currently selected in the group
	 */
	valueSelected?: string | number;
}

declare const RadioButtonGroup: FC<RadioButtonGroupProps>;
export default RadioButtonGroup;
