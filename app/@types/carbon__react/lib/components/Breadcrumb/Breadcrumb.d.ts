import { ReactNode } from 'react';
import { FCReturn, ReactAttr } from '../../../typings/shared';

interface BreadcrumbProps extends ReactAttr<HTMLElement> {
	/**
	 * Specify the label for the breadcrumb container
	 */
	ariaLabeL?: string;

	/**
	 * Pass in the BreadcrumbItem's for your Breadcrumb
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the container node
	 */
	className?: string;

	/**
	 * Optional prop to omit the trailing slash for the breadcrumbs
	 */
	noTrailingSlash?: boolean;
}
declare const Breadcrumb: FCReturn<BreadcrumbProps>;

export default Breadcrumb;
