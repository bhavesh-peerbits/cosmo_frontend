import { FCReturn, ReactAttr } from '../../../typings/shared';

interface BreadcrumbProps extends ReactAttr<HTMLElement> {
	/**
	 * Specify an optional className to be applied to the container node
	 */
	className?: string;
}
declare const BreadcrumbSkeleton: FCReturn<BreadcrumbProps>;

export default BreadcrumbSkeleton;
