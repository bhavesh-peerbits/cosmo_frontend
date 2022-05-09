import { unstable_Menu as Menu } from '@carbon/react';

interface MenuElement {
	type: 'radiogroup' | 'group' | 'divider' | 'selectable' | 'item';
	id: string;
}

interface MenuGroup extends MenuElement {
	type: 'group';
	label: string;
	children: MenuItem[];
}

interface MenuSelectable extends MenuElement {
	type: 'selectable';
	label: string;
	initialChecked?: boolean;
	onChange: (checked: boolean) => void;
}

interface MenuDivider extends MenuElement {
	type: 'divider';
}

interface MenuItemElement extends MenuElement {
	type: 'item';
	label: string;
	shortcut?: string;
	children?: MenuItem[];
	onClick?: () => void;
	disabled?: boolean;
	kind?: 'default' | 'danger';
}
interface MenuRadioGroup extends MenuElement {
	type: 'radiogroup';
	label: string;
	items: { name: string; label: string }[];
	initialSelectedItem?: string;
	onChange: (item: { name: string; label: string }) => void;
}

export type MenuItem =
	| MenuGroup
	| MenuSelectable
	| MenuDivider
	| MenuItemElement
	| MenuRadioGroup;

export const renderMenuItem = (item: MenuItem) => {
	switch (item.type) {
		case 'item':
			return (
				<Menu.MenuItem
					key={item.id}
					label={item.label}
					shortcut={item.shortcut}
					disabled={item.disabled}
					kind={item.kind}
					onClick={item.onClick}
				>
					{item.children && item.children.map(renderMenuItem)}
				</Menu.MenuItem>
			);
		case 'divider':
			return <Menu.MenuDivider key={item.id} />;
		case 'selectable':
			return (
				<Menu.MenuSelectableItem
					key={item.id}
					label={item.label}
					initialChecked={item.initialChecked}
					onChange={item.onChange}
				/>
			);
		case 'radiogroup':
			return (
				<Menu.MenuRadioGroup
					key={item.id}
					label={item.label}
					items={item.items.map(i => i.label)}
					initialSelectedItem={
						item.items.find(it => it.name === item.initialSelectedItem)?.label
					}
					onChange={val =>
						item.onChange(item.items.find(i => i.label === val) || item.items[0])
					}
				/>
			);
		case 'group':
			return (
				<Menu.MenuGroup key={item.id} label={item.label}>
					{item.children && item.children.map(renderMenuItem)}
				</Menu.MenuGroup>
			);
		default:
			return null;
	}
};
