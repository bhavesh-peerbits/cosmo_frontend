import {
	Notification,
	Search,
	Switcher as SwitcherIcon,
	Fade
} from '@carbon/react/icons';
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
	Content,
	SkipToContent,
	Button
} from '@carbon/react';
import 'style/app.scss';
import useGetExample from '@api/useGetExample';
import ErrorBoundary from '@error/components/ErrorBoundary';
import { Suspense, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import languageAtom from '@store/i18n/languageAtom';

const Test = () => {
	const { data } = useGetExample();
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

const StoryContent = () => {
	const { t } = useTranslation(['home', 'test']);
	const setLanguage = useSetRecoilState(languageAtom);

	const content = (
		<div className='bx--grid'>
			<div className='bx--row'>
				<section className='bx--offset-lg-3 bx--col-lg-13'>
					<h2
						style={{
							fontWeight: '800',
							margin: '30px 0',
							fontSize: '20px'
						}}
					>
						{t('home:purpose')}
					</h2>
					<Button onClick={() => setLanguage(val => (val === 'it' ? 'en' : 'it'))}>
						Change Lang
					</Button>
					<h1 className='capitalize'>{t('test:test-string')}</h1>
					<p style={{ lineHeight: '20px' }}>
						The shell is perhaps the most crucial piece of any UI built with Carbon. It
						contains the shared navigation framework for the entire design system and ties
						the products in IBM’s portfolio together in a cohesive and elegant way. The
						shell is the home of the topmost navigation, where users can quickly and
						dependably gain their bearings and move between pages.
						<br />
						<br />
						The shell was designed with maximum flexibility built in, to serve the needs
						of a broad range of products and users. Adopting the shell ensures compliance
						with IBM design standards, simplifies development efforts, and provides great
						user experiences. All IBM products built with Carbon are required to use the
						shell’s header.
						<br />
						<br />
						To better understand the purpose and function of the UI shell, consider the
						“shell” of MacOS, which contains the Apple menu, top-level navigation, and
						universal, OS-level controls at the top of the screen, as well as a universal
						dock along the bottom or side of the screen. The Carbon UI shell is roughly
						analogous in function to these parts of the Mac UI. For example, the app
						switcher portion of the shell can be compared to the dock in MacOS.
					</p>
					<h2
						style={{
							fontWeight: '800',
							margin: '30px 0',
							fontSize: '20px'
						}}
					>
						Header responsive behavior
					</h2>
					<p style={{ lineHeight: '20px' }}>
						As a header scales down to fit smaller screen sizes, headers with persistent
						side nav menus should have the side nav collapse into “hamburger” menu. See
						the example to better understand responsive behavior of the header.
					</p>
					<h2
						style={{
							fontWeight: '800',
							margin: '30px 0',
							fontSize: '20px'
						}}
					>
						Secondary navigation
					</h2>
					<p style={{ lineHeight: '20px' }}>
						The side-nav contains secondary navigation and fits below the header. It can
						be configured to be either fixed-width or flexible, with only one level of
						nested items allowed. Both links and category lists can be used in the
						side-nav and may be mixed together. There are several configurations of the
						side-nav, but only one configuration should be used per product section. If
						tabs are needed on a page when using a side-nav, then the tabs are secondary
						in hierarchy to the side-nav.
					</p>
				</section>
			</div>
		</div>
	);

	return <Content>{content}</Content>;
};

const App = () => {
	const [appExpanded, setAppExpanded] = useState(false);

	return (
		<Theme theme='white' className='h-full overflow-hidden'>
			<HeaderContainer
				render={({ isSideNavExpanded, onClickSideNavExpand }) => (
					<Header aria-label='IBM Platform Name'>
						<SkipToContent />
						<HeaderMenuButton
							aria-label='Open menu'
							onClick={onClickSideNavExpand}
							isActive={isSideNavExpanded}
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
								isActive={appExpanded}
								onClick={() => setAppExpanded(v => !v)}
								tooltipAlignment='end'
							>
								<SwitcherIcon />
							</HeaderGlobalAction>
						</HeaderGlobalBar>
						<SideNav aria-label='Side navigation' expanded={isSideNavExpanded}>
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
								<SideNavLink renderIcon={Fade} element={Link} to='/test'>
									Link
								</SideNavLink>
								{import.meta.env.DEV && (
									<SideNavLink renderIcon={Fade} href='?showtranslations'>
										[TEST ONLY] Show translations
									</SideNavLink>
								)}
							</SideNavItems>
						</SideNav>

						<HeaderPanel aria-label='Header Panel' expanded={appExpanded}>
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
				)}
			/>
			<Content className='container-w-sidenav h-full overflow-auto'>
				<ErrorBoundary>
					<Routes>
						<Route index element={<StoryContent />} />
						<Route
							path='/test'
							element={
								<Suspense fallback='LOADING'>
									<Test />
								</Suspense>
							}
						/>
						<Route path='*' element={<div>Not found</div>} />
					</Routes>
				</ErrorBoundary>
			</Content>
		</Theme>
	);
};

export default App;
