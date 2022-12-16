import { Search } from '@carbon/react';
import { ChangeEvent } from 'react';

const Actions = ({
	searchText,
	setSearchText,
	findColumnPlaceholderLabel
}: {
	findColumnPlaceholderLabel?: string;
	searchText: string;
	setSearchText: (val: string) => void;
}) => {
	return (
		<div className='-mx-5 flex bg-field-2'>
			<Search
				placeholder={findColumnPlaceholderLabel}
				value={searchText}
				labelText={findColumnPlaceholderLabel}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					// TODO: is it performant?
					setSearchText(e.target.value);
				}}
			/>
		</div>
	);
};

export default Actions;
