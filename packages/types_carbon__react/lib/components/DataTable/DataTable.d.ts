import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

type HeaderShape = {
	key: string;
	header: ReactNode;
};

type RowShape = {
	id: string;
	disabled?: boolean;
	isSelected?: boolean;
	isExpanded?: boolean;
};

interface DataTableProps extends ReactDivAttr {
	/**
	 * Optional hook to manually control filtering of the rows from the
	 * TableToolbarSearch component
	 */
	filterRows?: () => void;

	/**
	 * The `headers` prop represents the order in which the headers should
	 * appear in the table. We expect an array of objects to be passed in, where
	 * `key` is the name of the key in a row object, and `header` is the name of
	 * the header.
	 */
	headers: HeaderShape[];

	/**
	 * Specify whether the table should be able to be sorted by its headers
	 */
	isSortable?: boolean;

	/**
	 * Provide a string for the current locale
	 */
	locale?: string;

	/**
	 * Specify whether the overflow menu (if it exists) should be shown always, or only on hover
	 */
	overflowMenuOnHover?: boolean;

	/**
	 * Specify whether the control should be a radio button or inline checkbox
	 */
	radio?: boolean;

	/**
	 * The `rows` prop is where you provide us with a list of all the rows that
	 * you want to render in the table. The only hard requirement is that this
	 * is an array of objects, and that each object has a unique `id` field
	 * available on it.
	 */
	rows: RowShape[];

	/**
	 *  Change the row height of table. Currently supports `xs`, `sm`, `md`, `lg`, and `xl`.
	 */
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	/**
	 * Optional hook to manually control sorting of the rows.
	 */
	sortRow?: () => void;

	/**
	 * Specify whether the header should be sticky.
	 * Still experimental: may not work with every combination of table props
	 */
	stickyHeader?: boolean;

	/**
	 * Optional method that takes in a message id and returns an
	 * internationalized string. See `DataTable.translationKeys` for all
	 * available message ids.
	 */
	translateWithId?: () => void;

	/**
	 * `false` If true, will use a width of 'auto' instead of 100%
	 */
	useStaticWidth?: boolean;

	/**
	 * `true` to add useZebraStyles striping.
	 */
	useZebraStyles?: boolean;
}

declare const DataTable: FCReturn<DataTableProps>;

export default DataTable;
