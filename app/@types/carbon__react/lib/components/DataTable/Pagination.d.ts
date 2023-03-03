import { FC } from 'react';
import { ReactDivAttr } from '../../../typings/shared';

interface PaginationProps extends Omit<ReactDivAttr, 'size' | 'onChange'> {
	/**
	 * The description for the backward icon.
	 */
	backwardText?: string;

	/**
	 * The CSS class names.
	 */
	className?: string;

	/**
	 * `true` if the backward/forward buttons, as well as the page select elements,  should be disabled.
	 */
	disabled?: boolean;

	/**
	 * The description for the forward icon.
	 */
	forwardText?: string;

	/**
	 * The unique ID of this component instance.
	 */
	id?: string;

	/**
	 * The function returning a translatable text showing where the current page is,
	 * in a manner of the range of items.
	 */
	itemRangeText?: (min: number, max: number, total: number) => string;

	/**
	 * A variant of `itemRangeText`, used if the total number of items is unknown.
	 */
	itemText?: (min: number, max: number) => string;

	/**
	 * The translatable text indicating the number of items per page.
	 */
	itemsPerPageText?: string;

	/**
	 * The callback function called when the current page changes.
	 */
	onChange?: (params: { page: number; pageSize: number }) => void;

	/**
	 * The current page.
	 */
	page?: number;

	/**
	 * `true` if the select box to change the page should be disabled.
	 */
	pageInputDisabled?: boolean;

	pageNumberText?: string;

	/**
	 * A function returning PII showing where the current page is.
	 */
	pageRangeText?: (current: number, total: number) => string;

	/**
	 * The number dictating how many items a page contains.
	 */
	pageSize?: number;

	/**
	 * `true` if the select box to change the items per page should be disabled.
	 */
	pageSizeInputDisabled?: boolean;

	/**
	 * The choices for `pageSize`.
	 */
	pageSizes: number[] | { text: string; value: number }[];

	/**
	 * The translatable text showing the current page.
	 */
	pageText?: (page: number) => string;

	/**
	 * `true` if the total number of items is unknown.
	 */
	pagesUnknown?: boolean;

	/**
	 * Specify the size of the Pagination.
	 */
	size?: 'sm' | 'md' | 'lg';

	/**
	 * The total number of items.
	 */
	totalItems?: number;
}

declare const Pagination: FC<PaginationProps>;

export default Pagination;
