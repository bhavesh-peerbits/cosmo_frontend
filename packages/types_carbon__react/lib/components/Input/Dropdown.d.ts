import { ReactElement, ReactNode } from 'react';
import { ReactDivAttr } from '../../../typings/shared';

interface DropdownProps<T extends string | number | object> extends ReactDivAttr {
	/**
	 * 'aria-label' of the ListBox component.
	 */
	ariaLabel?: string;

	/**
	 * Provide a custom className to be applied on the bx--dropdown node
	 */
	className?: string;

	/**
	 * Specify the direction of the dropdown. Can be either top or bottom.
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
	 * Provide helper text that is used alongside the control label for
	 * additional help
	 */
	helperText?: ReactNode;

	/**
	 * Specify whether the title text should be hidden or not
	 */
	hideLabel?: boolean;

	/**
	 * Specify a custom `id`
	 */
	id: string;

	/**
	 * Allow users to pass in an arbitrary item or a string (in case their items are an array of strings)
	 * from their collection that are pre-selected
	 */
	initialSelectedItem?: string | number | object;

	/**
	 * Specify if the currently selected value is invalid.
	 */
	invalid?: boolean;

	/**
	 * Message which is displayed if the value is invalid.
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
	 * `onChange` is a utility for this controlled component to communicate to a
	 * consuming component what kind of internal state changes are occurring.
	 */
	onChange?: (item: { selectedItem: T }) => void;

	/**
	 * An optional callback to render the currently selected item as a react element instead of only
	 * as a string.
	 */
	renderSelectedItem?: (item: T) => ReactNode;

	/**
	 * In the case you want to control the dropdown selection entirely.
	 */
	selectedItem?: T;

	/**
	 * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
	 */
	size?: 'sm' | 'md' | 'lg';

	/**
	 * Provide the title text that will be read by a screen reader when
	 * visiting this control
	 */
	titleText?: ReactNode;

	/**
	 * Callback function for translating ListBoxMenuIcon SVG title
	 */
	translateWithId?: (id: string) => string;

	/**
	 * The dropdown type, `default` or `inline`
	 */
	type?: 'default' | 'inline';

	/**
	 * Specify whether the control is currently in warning state
	 */
	warn?: boolean;

	/**
	 * Provide the text that is displayed when the control is in warning state
	 */
	warnText?: ReactNode;
}

declare function Dropdown<T extends number | string | object>(
	props: DropdownProps<T>
): ReactElement;

export default Dropdown;
