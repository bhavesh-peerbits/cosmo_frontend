import { FC, ReactNode } from 'react';
import { ReactAttr } from '../../../typings/shared';

interface FormLabelProps extends ReactAttr<HTMLLabelElement> {
	/**
	 * Specify the content of the form label
	 */
	children?: ReactNode;

	/**
	 * Provide a custom className to be applied to the containing <label> node
	 */
	className?: string;

	/**
	 * Provide a unique id for the given <FormLabel>
	 */
	id?: string;
}

declare const FormLabel: FC<FormLabelProps>;
export default FormLabel;
