import { useEffect, useRef, useState } from 'react';
import { TableOfContents } from '@carbon/react/icons';
import { smoothScroll, triggerFocus } from '@components/TableOfContents/utils';
import { Checkbox } from '@carbon/react';
import cx from 'classnames';
import { useBoolean, useClickAway } from 'ahooks';

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

	isCheckbox?: boolean;

	checked?: string[];

	setChecked?: (f: (old: string[]) => string[]) => void;
}

interface SelectWithCheckboxProps {
	options: TOCMobileProps['menuItems'];
	value: TOCMobileProps['selectedId'];
	onChange: (value: TOCMobileProps['menuItems'][number]) => void;
	className?: string;
	checked?: TOCMobileProps['checked'];
	setChecked?: TOCMobileProps['setChecked'];
	isCheckbox?: TOCMobileProps['isCheckbox'];
}
const SelectWithCheckbox = ({
	options,
	className,
	value,
	onChange,
	checked,
	setChecked,
	isCheckbox
}: SelectWithCheckboxProps) => {
	const ref = useRef<HTMLFormElement>(null);
	const [expanded, { toggle, setFalse }] = useBoolean(false);
	useClickAway(() => {
		setFalse();
	}, ref);

	return (
		<form className='w-full' ref={ref}>
			<div className='w-full'>
				<div
					tabIndex={0}
					role='button'
					className={cx('relative')}
					onKeyPress={toggle}
					onClick={toggle}
				>
					<select className={cx(className, 'w-full font-bold')}>
						<option>{options.find(o => o.id === value)?.title}</option>
					</select>
					<div className='absolute left-0 right-0 top-0 bottom-0 shadow shadow-shadow' />
				</div>
				{expanded && (
					<div
						className={cx(
							'absolute z-[9999] w-full cursor-pointer rounded-b border-[1px] bg-field-2 shadow'
						)}
					>
						{options.map(option => (
							<div
								key={option.id}
								className='flex w-full items-center hover:bg-layer-accent-hover-3'
							>
								{isCheckbox && (
									<div className='p-3'>
										<Checkbox
											checked={checked?.includes(option.id)}
											onChange={(e, { checked: isChecked }) =>
												setChecked?.((old = []) =>
													isChecked
														? [...old, option.id]
														: old.filter(id => id !== option.id)
												)
											}
											labelText=''
											id={option.id}
										/>
									</div>
								)}
								<div
									className='w-full'
									role='button'
									tabIndex={0}
									onKeyPress={() => {
										onChange(option);
										toggle();
									}}
									onClick={() => {
										onChange(option);
										toggle();
									}}
								>
									<div className='p-3 text-body-1'>{option.title}</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</form>
	);
};

/**
 * Mobile Component.
 */
const TOCMobile = ({
	menuItems,
	selectedId,
	updateState,
	isCheckbox,
	checked,
	setChecked,
	stickyOffset = 0
}: TOCMobileProps) => {
	const [selectedOption, setSelectedOption] = useState(selectedId);

	useEffect(() => {
		setSelectedOption(selectedId);
	}, [selectedId]);

	/**
	 * Handle onChange event of select
	 *
	 * @param opt
	 */
	const handleChange = (opt: { title?: string; id: string }) => {
		const { id } = opt;
		const filteredItems = menuItems.filter(menu => {
			return menu.id === id;
		});
		const { title } = filteredItems[0];
		updateState(id, title);
		const selector = `*[data-toc-id="${id}"]`;
		smoothScroll(selector, stickyOffset + 50);
		triggerFocus(selector);
	};

	return (
		<div className='shadow shadow-md shadow-background'>
			<div className='relative flex rounded bg-field-2 hover:bg-field-hover-2'>
				<SelectWithCheckbox
					options={menuItems}
					value={selectedOption}
					checked={checked}
					setChecked={setChecked}
					isCheckbox={isCheckbox}
					onChange={e => handleChange(e)}
					className='-outline-offset-2 h-9 w-full min-w-full max-w-full cursor-pointer appearance-none text-ellipsis
					 border-none bg-transparent  pl-5 pr-9 outline-2 transition ease-standard-expressive text-body-short-2'
				/>
				<div className='pointer-events-none absolute right-5 mt-2 translate-y-1/2'>
					<TableOfContents size={20} aria-label='menu icon' />
				</div>
			</div>
		</div>
	);
};

export default TOCMobile;
