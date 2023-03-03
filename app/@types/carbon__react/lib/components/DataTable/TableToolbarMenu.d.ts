import { ComponentProps, ReactNode } from 'react';
import { FCReturn, RenderIcon } from '../../../typings/shared';
import { OverflowMenu } from '../OverflowMenu';

interface TableToolbarMenuProps
	extends Omit<ComponentProps<typeof OverflowMenu>, 'renderIcon'> {
	children: ReactNode;

	/**
	 * Provide an optional class name for the toolbar menu
	 */
	className?: string;

	/**
	 * The description of the menu icon.
	 */
	iconDescription: string;

	/**
	 * Optional prop to allow overriding the default menu icon
	 */
	renderIcon?: RenderIcon;
}

declare const TableToolbarMenu: FCReturn<TableToolbarMenuProps>;

export default TableToolbarMenu;
