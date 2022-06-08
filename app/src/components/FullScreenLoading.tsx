import {
	Content,
	Header as CarbonHeader,
	HeaderGlobalAction,
	HeaderGlobalBar,
	HeaderMenuButton,
	HeaderName,
	HeaderNavigation,
	SideNav,
	SideNavItems,
	SideNavLink,
	SkeletonIcon,
	SkeletonText,
	Theme
} from '@carbon/react';
import useResponsive from '@hooks/useResponsive';
import { useMount, useUnmount } from 'ahooks';
import { useMemo } from 'react';
import PageSkeleton from '@components/PageSkeleton';
import useUiStore from '@hooks/useUiStore';

type LoadingSideNavProps = {
	fakeLink: { id: number }[];
};

const LoadingSideNav = ({ fakeLink }: LoadingSideNavProps) => {
	const { lg } = useResponsive();
	const { theme } = useUiStore();

	return (
		<Theme theme={theme}>
			<SideNav aria-label='Side navigation' isRail={!lg} expanded={lg}>
				<SideNavItems>
					{fakeLink.map(({ id }) => (
						<SideNavLink key={id} renderIcon={SkeletonIcon}>
							<div className='w-13'>
								<SkeletonText className='m-0' />
							</div>
						</SideNavLink>
					))}
				</SideNavItems>
			</SideNav>
		</Theme>
	);
};

const FullScreenLoading = () => {
	useMount(() => {
		document.body.classList.add('fix-height');
	});
	useUnmount(() => {
		document.body.classList.remove('fix-height');
	});
	const fakeLink = useMemo(() => [...Array(12)].map((_, i) => ({ id: i })), []);

	return (
		<>
			<CarbonHeader aria-label='Cosmo' className='cds--g100'>
				<HeaderMenuButton
					aria-label='Open menu'
					className='pointer-events-none'
					isCollapsible
					renderMenuIcon={<SkeletonIcon />}
				/>
				<HeaderName prefix=''>
					<div className='flex w-13 items-center'>
						<SkeletonText className='m-0' />
					</div>
				</HeaderName>
				<HeaderNavigation aria-label='loading'>
					{fakeLink.slice(-6).map(({ id }) => (
						<div key={id} className='mr-4 flex w-10 items-center justify-center'>
							<SkeletonText className='m-0' />
						</div>
					))}
				</HeaderNavigation>
				<HeaderGlobalBar>
					{fakeLink.slice(-4).map(({ id }) => (
						<HeaderGlobalAction
							aria-label='loading'
							key={id}
							className='pointer-events-none'
						>
							<SkeletonIcon style={{ height: 24, width: 24 }} />
						</HeaderGlobalAction>
					))}
				</HeaderGlobalBar>
				<LoadingSideNav fakeLink={fakeLink} />
			</CarbonHeader>
			<Content className='container-w-sidenav ml-6 h-full space-y-8 overflow-auto bg-layer-1 p-9 lg:ml-[calc(32*0.5rem)]'>
				<PageSkeleton />
			</Content>
		</>
	);
};

export default FullScreenLoading;
