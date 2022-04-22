import { useEffect, useMemo, useState } from 'react';
import { breakpoints, rem } from '@carbon/layout';

const displaySize: Record<string, number> = {
	...Object.entries(breakpoints).reduce(
		(acc, [key, { width }]) => ({
			...acc,
			[key]: +width.replace('rem', '')
		}),
		{}
	)
};

const determineDisplaySize = (width: number) => {
	const w = +rem(width).replace('rem', '');
	return Object.entries(displaySize).reduce(
		(acc, [key, value]) => ({
			...acc,
			[key]: w >= value
		}),
		{}
	);
};

const useResponsive = () => {
	const [currentDisplaySize, setCurrentDisplaySize] = useState<Record<string, boolean>>(
		determineDisplaySize(window.innerWidth)
	);

	useEffect(() => {
		const handler = () => setCurrentDisplaySize(determineDisplaySize(window.innerWidth));
		window.addEventListener('resize', handler);
		return () => window.removeEventListener('resize', handler);
	}, []);

	return useMemo(() => currentDisplaySize, [currentDisplaySize]);
};

export default useResponsive;
