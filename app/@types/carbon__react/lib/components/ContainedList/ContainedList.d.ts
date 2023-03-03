import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface ContainedListProps extends Omit<ReactDivAttr, 'size'> {
	/**
	 * A slot for a possible interactive element to render.
	 */
	action?: ReactNode;

	/**
	 * A collection of ContainedListItems to be rendered in the ContainedList
	 */
	children?: ReactNode;

	/**
	 * Additional CSS class names.
	 */
	className?: string;

	/**
	 * The kind of ContainedList you want to display
	 */
	kind?: 'on-page' | 'disclosed';

	/**
	 * A label describing the contained list.
	 */
	label: string | ReactNode;

	/**
	 * Specify the size of the contained list.
	 */
	size?: 'sm' | 'md' | 'lg' | 'xl';
}
declare const ContainedList: FCReturn<ContainedListProps>;

export default ContainedList;
