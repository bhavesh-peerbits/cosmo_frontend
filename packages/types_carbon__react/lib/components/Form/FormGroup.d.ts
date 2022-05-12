import { FC, ReactNode } from 'react';

interface FormGroupProps {
	/**
	 * Provide the children form elements to be rendered inside of the <fieldset>
	 */
	children?: ReactNode;

	/**
	 * Provide a custom className to be applied to the containing <fieldset> node
	 */
	className?: string;

	/**
	 * Specify whether the <FormGroup> is invalid
	 */
	invalid?: boolean;

	/**
	 * Provide id for the fieldset <legend> which corresponds to the fieldset
	 * `aria-labelledby`
	 */
	legendId?: ReactNode;

	/**
	 * Provide the text to be rendered inside of the fieldset <legend>
	 */
	legendText: ReactNode;

	/**
	 * Specify whether the message should be displayed in the <FormGroup>
	 */
	message?: boolean;

	/**
	 * Provide the text for the message in the <FormGroup>
	 */
	messageText?: string;
}

declare const FormGroup: FC<FormGroupProps>;
export default FormGroup;
