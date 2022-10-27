/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import useGetFrameworkTreeByCode from '@api/framework/useGetFrameworkTreeByCode';
import { TreeView, TreeNode } from '@carbon/react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { TrashCan } from '@carbon/react/icons';
import Framework from '@model/Framework';
import { useTranslation } from 'react-i18next';
import CreateTearsheetStep from '@components/CreateTearsheet/CreateTearsheepStep';

type FrameworkStepProps = {
	requestType: string;
	selectedLeaves: Framework[];
	setSelectedLeaves: Dispatch<SetStateAction<Framework[]>>;
};
const FrameworkStep = ({
	requestType,
	selectedLeaves,
	setSelectedLeaves
}: FrameworkStepProps) => {
	const { data } = useGetFrameworkTreeByCode(requestType);
	const { t } = useTranslation('evidenceRequest');

	const recursiveMap = (framework: Framework) => {
		return framework?.children?.map(children => (
			<TreeNode
				className={
					!children.children &&
					![...selectedLeaves].find(item => item.code === children.code)
						? 'cursor-pointer'
						: 'cursor-auto'
				}
				label={children.code}
				onSelect={() =>
					!children.children &&
					![...selectedLeaves].find(item => item.code === children.code) &&
					setSelectedLeaves(old => [...old, children])
				}
			>
				{recursiveMap(children)}
			</TreeNode>
		));
	};

	useEffect(() => {
		setSelectedLeaves([]);
	}, [requestType, setSelectedLeaves]);

	if (!data) {
		return null;
	}

	return (
		<CreateTearsheetStep
			keyValue='frameworkStep'
			title='Framework'
			includeStep={requestType !== 'FREE'}
			className='overflow-auto'
			disableSubmit={selectedLeaves.length === 0}
		>
			<div className='flex w-full space-x-5 divide-x-1 divide-solid divide-border-subtle-0'>
				<div className='w-full'>
					<p>{t('select-branches-leaves')}</p>
					<TreeView className='w-full pt-3' hideLabel label='Framework'>
						{recursiveMap(data)}
					</TreeView>
				</div>
				<div className='w-full pl-5'>
					<p>{t('selected-items')}</p>
					<TreeView className='w-full pt-3' hideLabel label='Selected leaves'>
						{[...selectedLeaves].map(leaf => (
							<TreeNode
								label={
									<div className='flex'>
										{leaf.code}
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
		</CreateTearsheetStep>
	);
};
export default FrameworkStep;
