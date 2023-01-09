/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useTranslation } from 'react-i18next';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import TreeContainer from '@components/EvidenceRequest/TreeContainer';
import Framework from '@model/Framework';
import { TreeView, TreeNode } from '@carbon/react';
import { TrashCan } from '@carbon/react/icons';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useGetFrameworkByCode from '@api/change-monitoring/useGetFrameworkByCode';

type TreeSelectionModalProps = {
	selectedFramework: string;
	open: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	selectedLeaves: Framework[];
	setSelectedLeaves: Dispatch<SetStateAction<Framework[]>>;
};
const TreeSelectionModal = ({
	selectedFramework,
	open,
	setIsOpen,
	selectedLeaves,
	setSelectedLeaves
}: TreeSelectionModalProps) => {
	const { t } = useTranslation([
		'changeMonitoring',
		'modals',
		'userSelect',
		'evidenceRequest'
	]);

	const { data: framework } = useGetFrameworkByCode(selectedFramework);
	const [selectedItems, setSelectedItems] = useState<Framework[]>(selectedLeaves);

	useEffect(() => {
		setSelectedItems(selectedLeaves);
	}, [selectedLeaves]);

	const cleanUp = () => {
		setIsOpen(false);
		setSelectedItems([]);
	};
	const submit = () => {
		setSelectedLeaves(selectedItems);
		cleanUp();
	};

	return (
		<TearsheetNarrow
			hasCloseIcon
			title={t('changeMonitoring:select-framework-leaves', {
				framework: selectedFramework
			})}
			actions={[
				{
					id: 'cancel-button',
					label: t('modals:cancel'),
					kind: 'secondary',
					onClick: cleanUp
				},
				{
					id: 'submit-button',
					label: t('userSelect:select'),
					kind: 'primary',
					onClick: submit,
					disabled: !selectedItems.length
				}
			]}
			open={open}
			onClose={cleanUp}
		>
			{framework && (
				<div className='flex w-full space-x-5 divide-x-1 divide-solid divide-border-subtle-0 px-5'>
					<div className='w-full'>
						<p className='text-heading-1'>{t('evidenceRequest:select-leaves')}</p>
						{framework && (
							<TreeContainer framework={framework} setSelectedLeaves={setSelectedItems} />
						)}
					</div>
					<div className='w-full pl-5'>
						<p className='text-heading-1'>{t('evidenceRequest:selected-items')}</p>
						<TreeView className='w-full pt-3' hideLabel label='Selected leaves'>
							{[...selectedItems].map(leaf => (
								<TreeNode
									key={leaf.code}
									label={
										<div className='flex'>
											{leaf.name}
											<div
												className='cursor-pointer pl-4'
												onClick={() =>
													setSelectedItems(
														[...selectedItems].filter(
															selectedLeaf => selectedLeaf.code !== leaf.code
														)
													)
												}
											>
												<TrashCan />
											</div>
										</div>
									}
								/>
							))}
						</TreeView>
					</div>
				</div>
			)}
		</TearsheetNarrow>
	);
};
export default TreeSelectionModal;
