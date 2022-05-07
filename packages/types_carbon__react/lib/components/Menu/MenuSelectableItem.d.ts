import { FC, ReactNode } from 'react';

interface MenuSelectableItemProps {
	/**
	 * Whether the option should be checked by default
	 */
	initialChecked?: boolean;

	/**
	 * Rendered label for the MenuOptionContent
	 */
	label: ReactNode;

	/**
	 * Callback function when selection the has been changed
	 */
	onChange?: (checked: boolean) => void;
}

declare const MenuSelectableItem: FC<MenuSelectableItemProps>;
export default MenuSelectableItem;
