import { useMemo, useState } from 'react';
import { Modal } from '@carbon/react';
import { Column } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useBoolean } from 'ahooks';
import Columns, { ColumnType } from '@components/table/columnCustomize/Columns';
import Actions from './Actions';

// const sortColumns = <T extends object>(defA: Column<T>, defB: Column<T>) => {
//   const isVisibleA = defA.getIsVisible();
//   const isVisibleB = defB.getIsVisible();
//   if (isVisibleA && !isVisibleB) {
//     return -1;
//   }
//   if (!isVisibleA && isVisibleB) {
//     return 1;
//   }
//   return 0;
// };

const CustomizeColumnsModal = <T extends object>({
	isOpen,
	setIsModalOpen,
	onSaveColumnPrefs,
	columnDefinitions
}: {
	isOpen: boolean;
	setIsModalOpen: (open: boolean) => void;
	onSaveColumnPrefs: (columns: Omit<ColumnType<T>, 'column'>[]) => void;
	columnDefinitions: Column<T>[];
}) => {
	const { t } = useTranslation('table');

	const [searchText, setSearchText] = useState('');
	const columns = useMemo(
		() => columnDefinitions.filter(colDef => colDef.getCanHide()),
		// only sort the hidden column to the end when modal reopen
		[columnDefinitions]
	);
	const totalColumns = useMemo(() => columns.length, [columns.length]);
	const [columnsState, setColumnsState] = useState(() =>
		columns.map(col => ({
			id: col.id,
			visible: col.getIsVisible(),
			column: col
		}))
	);
	const visibleColumnsCount = useMemo(
		() => columnsState.filter(c => c.visible).length,
		[columnsState]
	);

	const [isDirty, { setTrue }] = useBoolean(false);

	const onRequestClose = () => {
		setIsModalOpen(false);
	};

	const setDirty = () => {
		!isDirty && setTrue();
	};

	const onRequestSubmit = () => {
		setIsModalOpen(false);
		onSaveColumnPrefs(columnsState);
	};

	const onCheckboxCheck = (col: ColumnType<T>[], value: boolean) => {
		setColumnsState(old =>
			old.map(definition => {
				if (col.findIndex(v => v.id === definition.id) !== -1) {
					return { ...definition, visible: value };
				}
				return definition;
			})
		);
		setDirty();
	};

	const string = searchText.trim().toLowerCase();

	return (
		<Modal
			className='mb-0 p-0'
			open={isOpen}
			modalHeading={`${t(
				'customize-columns-display'
			)} (${visibleColumnsCount}/${totalColumns})`}
			primaryButtonText={t('customize-columns-primary')}
			secondaryButtonText={t('customize-columns-secondary')}
			selectorPrimaryFocus='customize-columns-column-list--focus'
			primaryButtonDisabled={!isDirty}
			onRequestClose={onRequestClose}
			onRequestSubmit={onRequestSubmit}
			content='p-0'
			size='sm'
		>
			<div className='flex h-full flex-col'>
				<div className='typography-body-long-1 mb-6'>
					{t('customize-columns-instructions')}
				</div>
				<Actions
					searchText={searchText}
					setSearchText={setSearchText}
					findColumnPlaceholderLabel={t('customize-columns-find')}
				/>
				{isOpen && (
					<Columns
						assistiveTextInstructionsLabel={t('customize-columns-instructions')}
						assistiveTextDisabledInstructionsLabel={t(
							'customize-columns-assistive-disabled'
						)}
						visibleColumnsCount={visibleColumnsCount}
						columns={columnsState}
						filterString={string}
						onSelectColumn={onCheckboxCheck}
						setColumnsObject={cols => {
							setColumnsState(cols);
							setDirty();
						}}
						selectAllLabel={t('customize-columns-column-name')}
					/>
				)}
			</div>
		</Modal>
	);
};

export default CustomizeColumnsModal;
