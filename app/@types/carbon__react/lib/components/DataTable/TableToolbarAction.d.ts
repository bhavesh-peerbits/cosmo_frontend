import { ComponentProps, ReactNode } from 'react';
import { FCReturn, ReactButtonAttr } from '../../../typings/shared';
import { OverflowMenuItem } from '../OverflowMenu';

interface TableToolbarActionProps extends ComponentProps<typeof OverflowMenuItem> {
	children?: ReactNode;
	className?: string;
	onClick: ReactButtonAttr['onClick'];
}

declare const TableToolbarAction: FCReturn<TableToolbarActionProps>;

export default TableToolbarAction;
