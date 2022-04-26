import { ReactNode } from 'react';
import { FCReturn } from '../../../typings/shared';
import { SearchProps } from '../Input/Search';

interface TableToolbarSearchProps extends Omit<SearchProps, 'labelText'> {
	children?: ReactNode;

	/**
	 * Provide an optional class name for the search container
	 */
	className?: string;

	/**
	 * Specifies if the search should initially render in an expanded state
	 */
	defaultExpanded?: boolean;

	/**
	 * Provide an optional default value for the Search component
	 */
	defaultValue?: string;

	/**
	 * Specifies if the search should be disabled
	 */
	disabled?: boolean;

	/**
	 * Specifies if the search should expand
	 */
	expanded?: boolean;

	/**
	 * Provide an optional id for the search container
	 */
	id?: string;

	/**
	 * Provide an optional label text for the Search component icon
	 */
	labelText?: string;

	/**
	 * Provide an optional function to be called when the search input loses focus, this will be
	 * passed the event as the first parameter and a function to handle the expanding of the search
	 * input as the second
	 */
	onBlur?: () => void;

	/**
	 * Provide an optional hook that is called each time the input is updated
	 */
	onChange?: SearchProps['onChange'];

	/**
	 * Optional callback called when the search value is cleared.
	 */
	onClear?: () => void;

	/**
	 * Provide an optional hook that is called each time the input is expanded
	 */
	onExpand?: () => void;

	/**
	 * Provide an optional function to be called when the search input gains focus, this will be
	 * passed the event as the first parameter and a function to handle the expanding of the search
	 * input as the second.
	 */
	onFocus?: () => void;

	/**
	 * Whether the search should be allowed to expand
	 */
	persistent?: boolean;

	/**
	 * Provide an optional placeholder text for the Search component
	 */
	placeholder?: string;

	/**
	 * Provide an optional className for the overall container of the Search
	 */
	searchContainerClass?: string;

	/**
	 * Optional prop to specify the tabIndex of the <Search> (in expanded state) or the container (in collapsed state)
	 */
	tabIndex?: string | number;
	/**
	 * Provide custom text for the component for each translation id
	 */
	//	translateWithId: () => void;
}

declare const TableToolbarSearch: FCReturn<TableToolbarSearchProps>;

export default TableToolbarSearch;
