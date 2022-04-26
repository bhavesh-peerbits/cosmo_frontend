import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface SkeletonIconProps extends ReactDivAttr {
	/**
	 * Specify an optional className to add.
	 */
	className?: string;

	/**
	 * The CSS styles.
	 */
	style?: object;
}

declare const SkeletonIcon: FCReturn<SkeletonIconProps>;

export default SkeletonIcon;
