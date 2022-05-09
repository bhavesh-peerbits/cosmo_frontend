import { FC } from 'react';

interface MenuRadioGroupProps {
	/**
	 * Whether the option should be checked by default
	 */
	initialSelectedItem?: string;

	/**
	 * Array of the radio options
	 */
	items: string[];

	/**
	 * The radio group label
	 */
	label: string;

	/**
	 * Callback function when selection the has been changed
	 */
	onChange: (selectedItem: string) => void;
}

declare const MenuRadioGroup: FC<MenuRadioGroupProps>;
export default MenuRadioGroup;
