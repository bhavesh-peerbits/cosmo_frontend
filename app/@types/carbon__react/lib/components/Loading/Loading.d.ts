import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface LoadingProps extends ReactDivAttr {
	/**
	 * Specify whether you want the loading indicator to be spinning or not
	 */
	active?: boolean;

	/**
	 * Provide an optional className to be applied to the containing node
	 */
	className?: string;

	/**
	 * Specify a description that would be used to best describe the loading state
	 */
	description?: string;

	/**
	 * Specify whether you would like the small variant of <Loading>
	 */
	small?: boolean;

	/**
	 * Specify whether you want the loader to be applied with an overlay
	 */
	withOverlay?: boolean;
}

declare const Loading: FCReturn<LoadingProps>;

export default Loading;
