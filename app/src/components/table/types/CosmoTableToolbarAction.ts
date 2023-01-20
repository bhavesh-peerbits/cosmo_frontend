import { CarbonIconType } from '@carbon/react/icons';

interface CosmoTableToolbarAction<T extends object> {
	id: string;
	/**
	 * The icon to render.
	 */
	icon: JSX.Element | (() => JSX.Element) | CarbonIconType;
	/**
	 * The label to render.
	 */
	label: string;
	/**
	 * The callback to invoke when the action is clicked.
	 */
	onClick: (selectedElements: T[]) => void;

	disabled?: boolean;
}

export default CosmoTableToolbarAction;
