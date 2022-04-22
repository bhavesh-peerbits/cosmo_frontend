import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TabsSkeletonProps extends ReactDivAttr {
	/**
	 * Specify an optional className to add.
	 */
	className?: string;

	/**
	 * Provide the type of Tab
	 */
	type?: '' | 'default' | 'container';
}

declare const TabsSkeleton: FCReturn<TabsSkeletonProps>;

export default TabsSkeleton;
