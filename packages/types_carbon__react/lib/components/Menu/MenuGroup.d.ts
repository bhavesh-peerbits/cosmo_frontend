import { FC, ReactNode } from 'react';

interface MenuGroupProps {
	/**
	 * Specify the children of the MenuGroup
	 */
	children?: ReactNode;

	/**
	 * Rendered label for the MenuGroup
	 */
	label: ReactNode;
}

declare const MenuGroup: FC<MenuGroupProps>;
export default MenuGroup;
