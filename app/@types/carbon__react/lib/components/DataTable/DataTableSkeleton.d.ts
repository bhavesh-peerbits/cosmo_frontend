import { AriaLabelProps, FCReturn, ReactDivAttr } from 'typings/shared';

interface DataTableSkeletonProps extends AriaLabelProps, Omit<ReactDivAttr, 'size'> {
	/**
	 * Specify an optional className to add.
	 */
	className?: string;

	/**
	 * Specify the number of columns that you want to render in the skeleton state
	 */
	columnCount?: number;

	/**
	 * Optionally specify whether you want the Skeleton to be rendered as a
	 * compact DataTable
	 */
	compact?: boolean;

	/**
	 * Optionally specify the displayed headers
	 */
	headers?: Record<string, string> | string[];

	/**
	 * Specify the number of rows that you want to render in the skeleton state
	 */
	rowCount?: number;

	/**
	 * Specify if the table header should be rendered as part of the skeleton.
	 */
	showHeader?: boolean;

	/**
	 * Specify if the table toolbar should be rendered as part of the skeleton.
	 */
	showToolbar?: boolean;

	/**
	 * Optionally specify whether you want the DataTable to be zebra striped
	 */
	zebra?: boolean;
}

declare const DataTableSkeleton: FCReturn<DataTableSkeletonProps>;

export default DataTableSkeleton;
