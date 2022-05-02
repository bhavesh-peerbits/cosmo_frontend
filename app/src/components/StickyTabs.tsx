import { ReactNode, useEffect, useRef } from 'react';
import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import { Tabs } from '@carbon/react';

interface TabsContainerProps {
	children: ReactNode;
}

const StickyTabs = ({ children }: TabsContainerProps) => {
	const { breadcrumbSize } = useBreadcrumbSize();

	const tabRef = useRef<HTMLDivElement>(null);
	const tab = tabRef.current?.getElementsByClassName('sticky')?.[0] as HTMLElement;
	useEffect(() => {
		tab && (tab.style.top = `${breadcrumbSize}px`);
	}, [breadcrumbSize, tab]);

	return (
		<div ref={tabRef} className='-mt-5 h-full'>
			<Tabs>{children}</Tabs>
		</div>
	);
};

export default StickyTabs;
