import { smoothScroll, triggerFocus } from '@components/TableOfContents/utils';
import { useLayoutEffect } from 'react';
import RunTile from '../Components/RunTile';

const RunsTileContainer = () => {
	const fakeData = [
		'run1',
		'run2',
		'run3',
		'run4',
		'run5',
		'run6',
		'run7',
		'run8',
		'run9',
		'run10',
		'run11',
		'run12',
		'run13'
	];

	useLayoutEffect(() => {
		const selector = `*[id="run4"]`;
		smoothScroll(selector, 149);
		triggerFocus(selector);
	}, []);

	return (
		<div className='space-y-5'>
			{fakeData.map(run => (
				<RunTile run={run} key={run} />
			))}
		</div>
	);
};
export default RunsTileContainer;
