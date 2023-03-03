import { FC, ReactNode } from 'react';
import { ReactDivAttr } from '../../../typings/shared';

interface StructuredListInputProps extends ReactDivAttr {
	/**
	 * Specify an optional className to be applied to the input
	 */
	className?: string;

	/**
	 * Specify a custom `id` for the input
	 */
	id?: string;

	/**
	 * Provide a `name` for the input
	 */
	name?: string;

	/**
	 * Provide a `title` for the input
	 */
	title?: string;
}

declare const StructuredListInput: FC<StructuredListInputProps>;
export default StructuredListInput;
