import { ReactNode } from 'react';
import { FCReturn, ReactAttr } from '../../../typings/shared';

interface BreadcrumbItemProps extends ReactAttr<HTMLUListElement> {
	ariaCurrent?: string | boolean;

	/**
	 * Pass in content that will be inside of the BreadcrumbItem
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the container node
	 */
	className?: string;

	/**
	 * Optional string representing the link location for the BreadcrumbItem
	 */
	href?: string;

	/**
	 * Provide if this breadcrumb item represents the current page
	 */
	isCurrentPage?: boolean;
}
declare const BreadcrumbItem: FCReturn<BreadcrumbItemProps>;

export default BreadcrumbItem;
