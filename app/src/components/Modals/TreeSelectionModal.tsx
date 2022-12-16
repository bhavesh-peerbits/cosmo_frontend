/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useTranslation } from 'react-i18next';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import TreeContainer from '@components/EvidenceRequest/TreeContainer';
import Framework from '@model/Framework';
import { useState } from 'react';
import useGetFrameworkTreeByCode from '@api/framework/useGetFrameworkTreeByCode';
import { TreeView, TreeNode } from '@carbon/react';
import { TrashCan } from '@carbon/react/icons';

type TreeSelectionModalProps = {
	selectedFramework: string;
	open: boolean;
};
const TreeSelectionModal = ({ selectedFramework, open }: TreeSelectionModalProps) => {
	const { t } = useTranslation([
		'changeMonitoring',
		'modals',
		'userSelect',
		'evidenceRequest'
	]);
	const [selectedLeaves, setSelectedLeaves] = useState<Framework[]>([]);
	const { data: framework } = useGetFrameworkTreeByCode(selectedFramework);

	return (
		<TearsheetNarrow
			hasCloseIcon
			title='Ciao'
			actions={[
				{
					id: 'cancel-button',
					label: t('modals:cancel'),
					kind: 'primary'
				},
				{
					id: 'submit-button',
					label: t('userSelect:select'),
					kind: 'secondary'
				}
			]}
			open={open}
		>
			{framework && (
				<div className='flex w-full space-x-5 divide-x-1 divide-solid divide-border-subtle-0 px-5'>
					<div className='w-full'>
						<p className='text-heading-1'>{t('evidenceRequest:select-leaves')}</p>
						{framework && (
							<TreeContainer
								framework={framework}
								setSelectedLeaves={setSelectedLeaves}
							/>
						)}
					</div>
					<div className='w-full pl-5'>
						<p className='text-heading-1'>{t('evidenceRequest:selected-items')}</p>
						<TreeView className='w-full pt-3' hideLabel label='Selected leaves'>
							{[...selectedLeaves].map(leaf => (
								<TreeNode
									key={leaf.code}
									label={
										<div className='flex'>
											{leaf.name}
											<div
												className='cursor-pointer pl-4'
												onClick={() =>
													setSelectedLeaves(
														[...selectedLeaves].filter(
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
