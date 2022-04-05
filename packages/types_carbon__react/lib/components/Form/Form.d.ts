import { FCReturn, ReactAttr } from '../../../typings/shared';
import { ReactNode } from 'react';

interface FormProps extends ReactAttr<HTMLFormElement> {
	/**
	 * Provide children to be rendered inside of the <form> element
	 */
	children?: ReactNode;

	/**
	 * Provide a custom className to be applied on the containing <form> node
	 */
	className?: string;
}

declare const Form: FCReturn<FormProps>;

export default Form;
