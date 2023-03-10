import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TableHeaderProps extends ReactDivAttr {
	/**
	 * Pass in children that will be embedded in the table header label
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the container node
	 */
	className?: string;

	/**
	 * Specify `colSpan` as a non-negative integer value to indicate how
	 * many columns the TableHeader cell extends in a table
	 */
	colSpan?: number;

	/**
	 * Supply an id to the th element.
	 */
	id?: string;

	/**
	 * Specify whether this header is the header by which a table is being sorted
	 * by
	 */
	isSortHeader?: boolean;

	/**
	 * Specify whether this header is one through which a user can sort the table
	 */
	isSortable?: boolean;

	/**
	 * Hook that is invoked when the header is clicked
	 */
	onClick?: ReactDivAttr['onClick'];

	/**
	 * Specify the scope of this table header. You can find more info about this
	 * attribute at the following URL:
	 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope
	 */
	scope: string;

	/**
	 * Specify which direction we are currently sorting by, should be one of DESC,
	 * NONE, or ASC.
	 */
	sortDirection?: 'DESC' | 'NONE' | 'ASC';

	/**
	 * Supply a method to translate internal strings with your i18n tool of
	 * choice. Translation keys are available on the `translationKeys` field for
	 * this component.
	 */
	translateWithId?: () => void;
}

declare const TableHeader: FCReturn<TableHeaderProps>;

export default TableHeader;
