import { Checkbox, OverflowMenu, OverflowMenuItem, TableHeader } from '@carbon/react';
import { CaretDown } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';

interface SelectAllHeaderProps {
	getIsAllRowsSelected: () => boolean;
	getIsSomeRowsSelected: () => boolean;
	getIsAllPageRowsSelected: () => boolean;
	getToggleAllRowsSelectedHandler: (event: unknown) => void;
	getToggleAllPageRowsSelectedHandler: (event: unknown) => void;
}

const SelectAllHeader = ({
	getToggleAllRowsSelectedHandler,
	getToggleAllPageRowsSelectedHandler,
	getIsSomeRowsSelected,
	getIsAllPageRowsSelected,
	getIsAllRowsSelected
}: SelectAllHeaderProps) => {
	const { t } = useTranslation('table');

	return (
		<TableHeader scope='col'>
			<div className='relative flex items-center justify-center'>
				<Checkbox
					labelText=''
					id='selectAll'
					name='selectAll'
					checked={getIsAllRowsSelected()}
					indeterminate={getIsSomeRowsSelected()}
					onClick={getToggleAllRowsSelectedHandler}
				/>
				<OverflowMenu
					className='absolute left-6 h-7 w-5'
					ariaLabel='open and close list of options'
					iconDescription='open and close list of option'
					focusTrap
					size='sm'
					renderIcon={() => <CaretDown size={16} />}
				>
					<OverflowMenuItem
						requireTitle
						itemText={t(
							getIsAllPageRowsSelected() ? 'deselect-all-page' : 'select-all-page'
						)}
						onClick={getToggleAllPageRowsSelectedHandler}
					/>
					<OverflowMenuItem
						requireTitle
						itemText={t(getIsAllRowsSelected() ? 'deselect-all' : 'select-all')}
						onClick={getToggleAllRowsSelectedHandler}
					/>
				</OverflowMenu>
			</div>
		</TableHeader>
	);
};
export default SelectAllHeader;
