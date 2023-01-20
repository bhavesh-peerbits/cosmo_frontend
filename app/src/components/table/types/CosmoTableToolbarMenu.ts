import { CarbonIconType } from '@carbon/react/icons';

interface CosmoTableToolbarMenu {
	id: string;
	/**
	 * The icon to render.
	 */
	icon: CarbonIconType;

	disabled?: boolean;

	tableToolbarActions: {
		id: string;
		label: string;
		onClick: () => void;
		disabled?: boolean;
	}[];
}

export default CosmoTableToolbarMenu;
