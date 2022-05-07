import Menu from './Menu';
import MenuItem from './MenuItem';
import MenuDivider from './MenuDivider';
import MenuSelectableItem from './MenuSelectableItem';
import MenuRadioGroup from './MenuRadioGroup';
import MenuGroup from './MenuGroup';

type CarbonMenuType = typeof Menu & {
	MenuItem: typeof MenuItem;
	MenuDivider: typeof MenuDivider;
	MenuSelectableItem: typeof MenuSelectableItem;
	MenuRadioGroup: typeof MenuRadioGroup;
	MenuGroup: typeof MenuGroup;
};

declare const CarbonMenu: CarbonMenuType;
export { CarbonMenu as unstable_Menu };
