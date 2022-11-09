import Framework from '@model/Framework';
import React, { Dispatch, SetStateAction } from 'react';
import { TreeView, TreeNode } from '@carbon/react';

type TreeContainerProps = {
	setSelectedLeaves: Dispatch<SetStateAction<Framework[]>>;
	framework: Framework;
};
const TreeContainer = React.memo(
	({ setSelectedLeaves, framework }: TreeContainerProps) => {
		const recursiveMap = (tree: Framework) => {
			return tree.children?.map(children => (
				<TreeNode
					className={
						framework?.leafs?.includes(children.code) ? 'cursor-pointer' : 'cursor-auto'
					}
					label={children.name}
					onSelect={() =>
						framework?.leafs?.includes(children.code) &&
						setSelectedLeaves(old =>
							old.find(leaf => leaf.code === children.code)
								? [...old]
								: [...old, children]
						)
					}
				>
					{recursiveMap(children)}
				</TreeNode>
			));
		};
		return (
			<TreeView className='w-full pt-3' hideLabel label='Framework'>
				{framework && recursiveMap(framework)}
			</TreeView>
		);
	}
);
export default TreeContainer;