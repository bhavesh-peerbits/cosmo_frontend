import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TableBodyProps extends ReactDivAttr {
	/**
	 * `polite` Adjust the notification behavior of screen readers
	 */
	ariaLive?: 'polite' | 'assertive' | 'off';

	children?: ReactNode;

	className?: string;
}

declare const TableBody: FCReturn<TableBodyProps>;

export default TableBody;
