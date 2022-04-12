import { FCReturn, ReactDivAttr } from '../../../typings/shared';
import { ReactNode } from 'react';

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
