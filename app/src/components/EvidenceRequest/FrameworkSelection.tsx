/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Dispatch, SetStateAction } from 'react';
import { TreeView, TreeNode } from '@carbon/react';
import Framework from '@model/Framework';
import { useTranslation } from 'react-i18next';
import { TrashCan } from '@carbon/react/icons';
import useGetFrameworkTreeByCode from '@api/framework/useGetFrameworkTreeByCode';
import TreeContainer from './TreeContainer';

type FrameworkSelectionProps = {
	requestType: string;
	selectedLeaves: Framework[];
	setSelectedLeaves: Dispatch<SetStateAction<Framework[]>>;
};
const FrameworkSelection = ({
	requestType,
	selectedLeaves,
	setSelectedLeaves
}: FrameworkSelectionProps) => {
	const { data: framework } = useGetFrameworkTreeByCode(
		requestType !== 'FREE' ? requestType : ''
	);
	const { t } = useTranslation('evidenceRequest');

	return (
		<div className='flex w-full space-x-5 divide-x-1 divide-solid divide-border-subtle-0'>
			<div className='w-full'>
				<p>{t('select-branches-leaves')}</p>
				{framework && (
					<TreeContainer framework={framework} setSelectedLeaves={setSelectedLeaves} />
				)}
			</div>
			<div className='w-full pl-5'>
				<p>{t('selected-items')}</p>
				<TreeView className='w-full pt-3' hideLabel label='Selected leaves'>
					{[...selectedLeaves].map(leaf => (
						<TreeNode
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
	);
};
export default FrameworkSelection;
