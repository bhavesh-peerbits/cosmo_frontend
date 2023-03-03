import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface CheckboxSkeletonProps extends ReactDivAttr {
	/**
	 * Specify an optional className to add.
	 */
	className?: string;
}

declare const CheckboxSkeleton: FCReturn<CheckboxSkeletonProps>;

export default CheckboxSkeleton;
