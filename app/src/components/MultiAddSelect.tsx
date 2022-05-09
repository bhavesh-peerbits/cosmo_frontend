import { forwardRef } from 'react';
import { ItemElement } from '@components/AddSelect/utilities';
import AddSelect from './AddSelect';

const MultiAddSelect = forwardRef<HTMLDivElement, MultiAddSelectProps>((props, ref) => {
	return (
		<AddSelect
			{...props}
			onSubmit={selection => props.onSubmit(selection as string[])}
			multi
			ref={ref}
		/>
	);
});

interface MultiAddSelectProps {
	clearFiltersText?: string;

	/**
	 * optional class name
	 */
	className?: string;
	/**
	 * placeholder for column input filter
	 */
	columnInputPlaceholder?: string;
	/**
	 * text description that appears under the title
	 */
	description?: string;
	/**
	 * options to display in the global filter box. values are generated
	 * from the id which should correlate with a specific property in an
	 * item entry
	 */
	globalFilters?: Array<{
		id: string;
		label: string;
	}>;

	globalFiltersIconDescription?: string;
	/**
	 * placeholder text for the global filter dropdown
	 */
	globalFiltersPlaceholderText?: string;
	/**
	 * text for the global filter primary button
	 */
	globalFiltersPrimaryButtonText?: string;
	/**
	 * text for the global filter secondary button
	 */
	globalFiltersSecondaryButtonText?: string;
	/**
	 * label for global search input
	 */
	globalSearchLabel?: string;
	/**
	 * placeholder for global search input
	 */
	globalSearchPlaceholder?: string;
	/**
	 * title that displays in the sidebar / influencer
	 */
	influencerTitle?: string;

	influencerItemTitle?: string;
	influencerItemSubtitle?: string;

	/**
	 * object that contains the item data. for more information reference the
	 * "Structuring items" section in the docs tab
	 */
	items: ItemElement;
	/**
	 * label that display above the list of items
	 */
	itemsLabel?: string;
	/**
	 * text to display when no results are found from the global search
	 */
	noResultsDescription?: string;
	/**
	 * title to display when no results are found from the global search
	 */
	noResultsTitle?: string;
	/**
	 * text body that displays in the sidebar when nothing is selected
	 */
	noSelectionDescription?: string;
	/**
	 * title that displays in the sidebar when nothing is selected
	 */
	noSelectionTitle?: string;
	/**
	 * function to call when the close button clicked
	 */
	onClose?: () => void;
	/**
	 * text for close button
	 */
	onCloseButtonText?: string;
	/**
	 * function to call when the submit button is clicked. returns a selection
	 */
	onSubmit: (selection: string[]) => void;
	/**
	 * text for the submit button
	 */
	onSubmitButtonText?: string;
	/**
	 * specifies if the component is open or not
	 */
	open?: boolean;
	/**
	 * description for the remove item icon
	 */
	removeIconDescription?: string;
	/**
	 * text that displays when displaying filtered items
	 */
	searchResultsLabel?: string;
	/**
	 * header text
	 */
	title?: string;
}

export default MultiAddSelect;
