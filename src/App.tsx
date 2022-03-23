import {
	Header,
	Theme,
	HeaderMenu,
	HeaderContainer,
	HeaderMenuButton,
	HeaderName,
	HeaderNavigation,
	HeaderMenuItem,
	HeaderGlobalBar,
	HeaderGlobalAction,
	SideNav,
	SideNavItems,
	HeaderSideNavItems,
	SideNavMenu,
	SideNavMenuItem,
	SideNavLink,
	HeaderPanel,
	Switcher,
	SwitcherItem,
	SwitcherDivider,
	Content
} from '@carbon/react';
import {
	Notification,
	Search,
	Switcher as SwitcherIcon,
	Fade
} from '@carbon/react/icons';
import 'style/app.scss';
import useGetExample from '@api/useGetExample';
import ErrorBoundary from '@error/components/ErrorBoundary';
import { Suspense, useEffect, useState } from 'react';

const Test = () => {
	const { data } = useGetExample();
	// eslint-disable-next-line no-console
	console.log(data);
	const [error, setError] = useState(false);
	setTimeout(() => {
		setError(true);
	}, 2000);
	useEffect(() => {
		if (error) {
			throw new Error('Test Error');
		}
	}, [error]);
	return <div>{JSON.stringify(data)}</div>;
};

const App = () => (
	<Theme theme='g100' className='h-full'>
		<HeaderContainer
			render={({ isSideNavExpanded, onClickSideNavExpand }) => (
				<>
					<SideNav
						aria-label='Side navigation'
						expanded={isSideNavExpanded}
						isChildOfHeader={false}
					>
						<SideNavItems>
							<HeaderSideNavItems hasDivider>
								<HeaderMenuItem href='#'>Link 1</HeaderMenuItem>
								<HeaderMenuItem href='#'>Link 2</HeaderMenuItem>
								<HeaderMenuItem href='#'>Link 3</HeaderMenuItem>
								<HeaderMenu aria-label='Link 4' menuLinkName='Link 4'>
									<HeaderMenuItem href='#'>Sub-link 1</HeaderMenuItem>
									<HeaderMenuItem href='#'>Sub-link 2</HeaderMenuItem>
									<HeaderMenuItem href='#'>Sub-link 3</HeaderMenuItem>
								</HeaderMenu>
							</HeaderSideNavItems>
							<SideNavMenu renderIcon={Fade} title='Category title'>
								<SideNavMenuItem href='https://www.carbondesignsystem.com/'>
									Link
								</SideNavMenuItem>
								<SideNavMenuItem href='https://www.carbondesignsystem.com/'>
									Link
								</SideNavMenuItem>
								<SideNavMenuItem href='https://www.carbondesignsystem.com/'>
									Link
								</SideNavMenuItem>
							</SideNavMenu>
							<SideNavMenu renderIcon={Fade} title='Category title'>
								<SideNavMenuItem href='https://www.carbondesignsystem.com/'>
									Link
								</SideNavMenuItem>
								<SideNavMenuItem href='https://www.carbondesignsystem.com/'>
									Link
								</SideNavMenuItem>
								<SideNavMenuItem href='https://www.carbondesignsystem.com/'>
									Link
								</SideNavMenuItem>
							</SideNavMenu>
							<SideNavMenu renderIcon={Fade} title='Category title' isActive>
								<SideNavMenuItem href='https://www.carbondesignsystem.com/'>
									Link
								</SideNavMenuItem>
								<SideNavMenuItem
									aria-current='page'
									href='https://www.carbondesignsystem.com/'
								>
									Link
								</SideNavMenuItem>
								<SideNavMenuItem href='https://www.carbondesignsystem.com/'>
									Link
								</SideNavMenuItem>
							</SideNavMenu>
							<SideNavLink renderIcon={Fade} href='https://www.carbondesignsystem.com/'>
								Link
							</SideNavLink>
							<SideNavLink renderIcon={Fade} href='https://www.carbondesignsystem.com/'>
								Link
							</SideNavLink>
						</SideNavItems>
					</SideNav>
					<Header aria-label='IBM Platform Name'>
						<HeaderMenuButton
							aria-label='Open menu'
							onClick={onClickSideNavExpand}
							isActive={isSideNavExpanded}
							isCollapsible
						/>
						<HeaderName href='#' prefix='IBM'>
							[Platform]
						</HeaderName>
						<HeaderNavigation aria-label='IBM [Platform]'>
							<HeaderMenuItem href='#'>Link 1</HeaderMenuItem>
							<HeaderMenuItem href='#'>Link 2</HeaderMenuItem>
							<HeaderMenuItem href='#'>Link 3</HeaderMenuItem>
							<HeaderMenu aria-label='Link 4' menuLinkName='Link 4'>
								<HeaderMenuItem href='#one'>Sub-link 1</HeaderMenuItem>
								<HeaderMenuItem href='#two'>Sub-link 2</HeaderMenuItem>
								<HeaderMenuItem href='#three'>Sub-link 3</HeaderMenuItem>
							</HeaderMenu>
						</HeaderNavigation>
						<HeaderGlobalBar>
							<HeaderGlobalAction aria-label='Search' onClick={() => {}}>
								<Search />
							</HeaderGlobalAction>
							<HeaderGlobalAction aria-label='Notifications' onClick={() => {}}>
								<Notification />
							</HeaderGlobalAction>
							<HeaderGlobalAction
								aria-label='App Switcher'
								isActive
								onClick={() => {}}
								tooltipAlignment='end'
							>
								<SwitcherIcon />
							</HeaderGlobalAction>
						</HeaderGlobalBar>

						<HeaderPanel aria-label='Header Panel' expanded>
							<Switcher aria-label='Switcher Container'>
								<SwitcherItem isSelected aria-label='Link 1' href='#'>
									Link 1
								</SwitcherItem>
								<SwitcherDivider />
								<SwitcherItem href='#' aria-label='Link 2'>
									Link 2
								</SwitcherItem>
								<SwitcherItem href='#' aria-label='Link 3'>
									Link 3
								</SwitcherItem>
								<SwitcherItem href='#' aria-label='Link 4'>
									Link 4
								</SwitcherItem>
								<SwitcherItem href='#' aria-label='Link 5'>
									Link 5
								</SwitcherItem>
								<SwitcherDivider />
								<SwitcherItem href='#' aria-label='Link 6'>
									Link 6
								</SwitcherItem>
							</Switcher>
						</HeaderPanel>
					</Header>
					<Content className='h-full w-full'>
						<ErrorBoundary>
							<Suspense fallback='LOADING'>
								<Test />
							</Suspense>
						</ErrorBoundary>
					</Content>
				</>
			)}
		/>
	</Theme>
);

export default App;
