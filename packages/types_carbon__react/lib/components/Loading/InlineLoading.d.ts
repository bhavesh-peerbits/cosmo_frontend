import { FCReturn, ReactDivAttr } from '../../../typings/shared';
import { ReactNode } from 'react';

interface InlineLoadingProps extends ReactDivAttr {
	/**
	 * Specify a custom className to be applied to the container node
	 */
	className?: string;

	/**
	 * Specify the description for the inline loading text
	 */
	description?: ReactNode;

	/**
	 * Specify the description for the inline loading text
	 */
	iconDescription?: string;

	/**
	 * Provide an optional handler to be invoked when <InlineLoading> is
	 * successful
	 */
	onSuccess?: () => void;

	/**
	 * Specify the loading status
	 */
	status: 'inactive' | 'active' | 'finished' | 'error';

	/**
	 * Provide a delay for the `setTimeout` for success
	 */
	successDelay?: number;
}

declare const InlineLoading: FCReturn<InlineLoadingProps>;

export default InlineLoading;
