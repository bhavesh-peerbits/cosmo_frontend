import { FC } from 'react';
import { ReactDivAttr } from '../../../typings/shared';

interface PaginationNavProps extends ReactDivAttr {
	/**
	 * Additional CSS class names.
	 */
	className?: string;

	/**
	 * The number of items to be shown.
	 */
	itemsShown?: number;

	/**
	 * Whether user should be able to loop through the items when reaching first / last.
	 */
	loop?: boolean;

	/**
	 * The callback function called when the current page changes.
	 */
	onChange?: (page: number) => void;

	/**
	 * The index of current page.
	 */
	page?: number;

	/**
	 * The total number of items.
	 */
	totalItems?: number;

	/**
	 * Specify a custom translation function that takes in a message identifier
	 * and returns the localized string for the message
	 */
	translateWithId?: (messageId: string) => string;
}

declare const PaginationNav: FC<PaginationNavProps>;

export default PaginationNav;
