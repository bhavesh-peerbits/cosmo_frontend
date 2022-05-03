import { ChangeEvent, useEffect, useState } from 'react';
import { TableOfContents } from '@carbon/react/icons';
import { smoothScroll, triggerFocus } from '@components/TableOfContents/utils';

interface TOCMobileProps {
	/**
	 * Array of menu item objects to render within the side nav.
	 * Each items has the following structure:
	 *
	 * | Properties Name | Data Type | Description     |
	 * | --------------- | --------- | --------------- |
	 * | title           | String    | Menu title text |
	 * | id              | String    | Menu id         |
	 */
	menuItems: Array<{ title: string; id: string }>;

	/**
	 * Id of a menu item.
	 */
	selectedId?: string;

	/**
	 * Function to update parent state.
	 */
	updateState: (id: string, title: string) => void;

	stickyOffset?: number;
}

/**
 * Mobile Component.
 */
const TOCMobile = ({
	menuItems,
	selectedId,
	updateState,
	stickyOffset = 0
}: TOCMobileProps) => {
	const [selectedOption, setSelectedOption] = useState(selectedId);

	useEffect(() => {
		setSelectedOption(selectedId);
	}, [selectedId]);

	/**
	 * Handle onChange event of select
	 *
	 * @param {*} e event object
	 */
	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const id = e.target.value;
		const filteredItems = menuItems.filter(menu => {
			return menu.id === id;
		});
		const { title } = filteredItems[0];
		updateState(id, title);
		const selector = `*[data-toc-id="${id}"]`;
		smoothScroll(selector, stickyOffset + 50);
		triggerFocus(selector);
	};

	/**
	 * Handle OnBlur event
	 *
	 * @returns {null} Returns null for blur events
	 */
	const handleOnBlur = () => {
		return null;
	};

	return (
		<div className='w-full shadow shadow-md shadow-background'>
			<div className='relative flex rounded bg-field-2 hover:bg-field-hover-2'>
				<select
					className='-outline-offset-2 h-9 w-full min-w-full max-w-full cursor-pointer appearance-none text-ellipsis
					 border-none bg-transparent  pl-5 pr-9 outline-2 transition ease-standard-expressive text-body-short-2'
					onBlur={handleOnBlur}
					value={selectedOption}
					onChange={e => handleChange(e)}
				>
					{menuItems.map(option => (
						<option className='bg-layer-2' key={option.id} value={option.id}>
							{option.title}
						</option>
					))}
				</select>
				<div className='pointer-events-none absolute right-5 mt-2 translate-y-1/2'>
					<TableOfContents size={20} aria-label='menu icon' />
				</div>
			</div>
		</div>
	);
};

export default TOCMobile;
