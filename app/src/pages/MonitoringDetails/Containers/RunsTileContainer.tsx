import { smoothScroll, triggerFocus } from '@components/TableOfContents/utils';
import Monitoring from '@model/Monitoring';
import { useLayoutEffect } from 'react';
import RunTile from '../Components/RunTile';

type RunsTileContainerProps = {
	monitoring: Monitoring;
};

const RunsTileContainer = ({ monitoring }: RunsTileContainerProps) => {
	useLayoutEffect(() => {
		const selector = `*[id="run-${monitoring.currentRun}"]`;
		smoothScroll(selector, 149);
		triggerFocus(selector);
	}, [monitoring]);

	return (
		<div className='space-y-5'>
			{monitoring.runs
				.slice()
				.sort((a, b) => a.orderNumber - b.orderNumber)
				.map(run => (
					<RunTile run={run} key={run.id} />
				))}
		</div>
	);
};
export default RunsTileContainer;
