import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface SkeletonPlaceholderProps extends ReactDivAttr {
	/**
	 * the class to be applied to the component
	 */
	className?: string;
}

declare const SkeletonPlaceholder: FCReturn<SkeletonPlaceholderProps>;

export default SkeletonPlaceholder;
