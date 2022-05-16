import { ReactNode, useEffect, useRef } from 'react';
import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import { Tabs } from '@carbon/react';
import useUrlState from '@hooks/useUrlState';

interface TabsContainerProps {
	children: ReactNode;
}

const StickyTabs = ({ children }: TabsContainerProps) => {
	const [url, setUrl] = useUrlState<{ tab: number }>({ tab: 0 });
	const { breadcrumbSize } = useBreadcrumbSize();

	const tabRef = useRef<HTMLDivElement>(null);
	const tab = tabRef.current?.getElementsByClassName('sticky')?.[0] as HTMLElement;
	useEffect(() => {
		tab && (tab.style.top = `${breadcrumbSize}px`);
	}, [breadcrumbSize, tab]);

	return (
		<div ref={tabRef} className='-mt-5 h-full'>
			<Tabs
				selectionMode='manual'
				onChange={({ selectedIndex }) => setUrl({ tab: selectedIndex || undefined })}
				selectedIndex={url.tab || 0}
			>
				{children}
			</Tabs>
		</div>
	);
};

export default StickyTabs;
