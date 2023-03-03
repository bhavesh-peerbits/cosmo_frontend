import { ReactNode, ReactElement } from 'react';
import { ReactAttr } from '../../../typings/shared';

interface MultiSelectProps<T extends string | number | object>
	extends Omit<ReactAttr<HTMLSelectElement>, 'size'> {
	/**
	 * Specify the text that should be read for screen readers that describes total items selected
	 */
	clearSelectionDescription?: string;

	/**
	 * Specify the text that should be read for screen readers to clear selection.
	 */
	clearSelectionText?: string;

	/**
	 * Specify the direction of the multiselect dropdown. Can be either top or bottom.
	 */
	direction?: 'top' | 'bottom';

	/**
	 * Disable the control
	 */
	disabled?: boolean;

	/**
	 * Additional props passed to Downshift
	 */
	downshiftProps?: unknown;

	/**
	 * Specify whether the title text should be hidden or not
	 */
	hideLabel?: boolean;

	/**
	 * Specify a custom `id`
	 */
	id: string;

	/**
	 * Allow users to pass in arbitrary items from their collection that are
	 * pre-selected
	 */
	initialSelectedItems?: T[];

	/**
	 * Is the current selection invalid?
	 */
	invalid?: boolean;

	/**
	 * If invalid, what is the error?
	 */
	invalidText?: ReactNode;

	/**
	 * Function to render items as custom components instead of strings.
	 * Defaults to null and is overridden by a getter
	 */
	itemToElement?: (item: T) => ReactNode;

	/**
	 * Helper function passed to downshift that allows the library to render a
	 * given item to a string label. By default, it extracts the `label` field
	 * from a given item to serve as the item label in the list.
	 */
	itemToString?: (item: T) => string;

	/**
	 * We try to stay as generic as possible here to allow individuals to pass
	 * in a collection of whatever kind of data structure they prefer
	 */
	items: T[];

	/**
	 * Generic `label` that will be used as the textual representation of what
	 * this field is for
	 */
	label: ReactNode;

	/**
	 * `true` to use the light version.
	 */
	light?: boolean;

	/**
	 * Specify the locale of the control. Used for the default `compareItems`
	 * used for sorting the list of items in the control.
	 */
	locale?: string;

	/**
	 * `onChange` is a utility for this controlled component to communicate to a
	 * consuming component what kind of internal state changes are occurring.
	 */
	onChange?: ({ selectedItems }: { selectedItems: T[] }) => void;

	/**
	 * `onMenuChange` is a utility for this controlled component to communicate to a
	 * consuming component that the menu was opend(`true`)/closed(`false`).
	 */
	onMenuChange?: () => void;

	/**
	 * Initialize the component with an open(`true`)/closed(`false`) menu.
	 */
	open?: boolean;

	/**
	 * For full control of the selected items
	 */
	selectedItems?: T[];

	/**
	 * Specify feedback (mode) of the selection.
	 * `top`: selected item jumps to top
	 * `fixed`: selected item stays at it's position
	 * `top-after-reopen`: selected item jump to top after reopen dropdown
	 */
	selectionFeedback?: 'top' | 'fixed' | 'top-after-reopen';

	/**
	 * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
	 */
	size?: 'sm' | 'md' | 'lg';

	/**
	 * Provide text to be used in a `<label>` element that is tied to the
	 * multiselect via ARIA attributes.
	 */
	titleText?: ReactNode;

	/**
	 * Callback function for translating ListBoxMenuIcon SVG title
	 */
	translateWithId?: () => void;

	/**
	 * Specify 'inline' to create an inline multi-select.
	 */
	type?: 'default' | 'inline';

	/**
	 * Specify title to show title on hover
	 */
	useTitleInItem?: boolean;

	/**
	 * Specify whether the control is currently in warning state
	 */
	warn?: boolean;

	/**
	 * Provide the text that is displayed when the control is in warning state
	 */
	warnText?: ReactNode;
}

declare function MultiSelect<T extends number | string | object>(
	props: MultiSelectProps<T>
): ReactElement;
export default MultiSelect;
