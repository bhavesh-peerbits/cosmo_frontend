import {
	Header as CarbonHeader,
	HeaderGlobalAction,
	HeaderGlobalBar,
	HeaderMenuButton,
	HeaderName,
	HeaderPanel,
	SideNav,
	SideNavItems,
	SideNavLink,
	SideNavMenu,
	SideNavMenuItem,
	Switcher,
	SwitcherDivider,
	SwitcherItem
} from '@carbon/react';
import {
	AlignBoxMiddleCenter,
	Fade,
	Logout,
	Moon,
	Notification,
	RequestQuote,
	Search,
	Help,
	Switcher as SwitcherIcon
} from '@carbon/react/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMount, useUnmount } from 'ahooks';
import useResponsive from '@hooks/useResponsive';
import useUiStore from '@hooks/useUiStore';

type HeaderProps = {
	isSideNavExpanded: boolean;
	onClickSideNavExpand: () => void;
};
const Header = ({ isSideNavExpanded, onClickSideNavExpand }: HeaderProps) => {
	const { setTheme } = useUiStore();
	const navigate = useNavigate();
	const { md, lg } = useResponsive();
	const [appExpanded, setAppExpanded] = useState(false);
	useMount(() => {
		document.body.classList.add('fix-height');
	});
	useUnmount(() => {
		document.body.classList.remove('fix-height');
	});
	return (
		<CarbonHeader aria-label='Cosmo'>
			<HeaderMenuButton
				aria-label='Open menu'
				onClick={onClickSideNavExpand}
				isActive={isSideNavExpanded}
			/>
			<HeaderName
				as='div'
				className='cursor-pointer'
				onClick={() => navigate('/home')}
				prefix='Cosmo'
			>
				[Dashboard]
			</HeaderName>

			<HeaderGlobalBar>
				<HeaderGlobalAction aria-label='Search' className='' onClick={() => {}}>
					<Search />
				</HeaderGlobalAction>
				<HeaderGlobalAction
					aria-label='Theme'
					onClick={() => {
						setTheme(old => (old === 'white' ? 'g100' : 'white'));
					}}
				>
					<Moon />
				</HeaderGlobalAction>
				<HeaderGlobalAction aria-label='Notifications' onClick={() => {}}>
					<Notification />
				</HeaderGlobalAction>
				<HeaderGlobalAction aria-label='Contact an Analyst' onClick={() => {}}>
					<Help />
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
			<SideNav
				onOverlayClick={onClickSideNavExpand}
				aria-label='Side navigation'
				expanded={isSideNavExpanded}
				isRail={md && !lg}
			>
				<SideNavItems>
					<SideNavMenu
						renderIcon={AlignBoxMiddleCenter}
						title='Narrative'
						className='transition-all'
					>
						<SideNavMenuItem element={Link} to='/management'>
							Management Dashboard
						</SideNavMenuItem>

						<SideNavMenuItem element={Link} to='/review'>
							Review
						</SideNavMenuItem>
					</SideNavMenu>
					<SideNavMenu
						renderIcon={RequestQuote}
						title='Review'
						className='transition-all'
					>
						<SideNavMenuItem element={Link} to='/review-narrative'>
							Narrative
						</SideNavMenuItem>
					</SideNavMenu>
					<SideNavLink renderIcon={Fade} element={Link} to='/test'>
						Test Error
					</SideNavLink>
					{import.meta.env.DEV && (
						<SideNavLink renderIcon={Fade} href='/translation?showtranslations'>
							[TEST ONLY] Show translations
						</SideNavLink>
					)}
					<SideNavLink renderIcon={Logout} href='/logout'>
						Logout
					</SideNavLink>
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
				</Switcher>
			</HeaderPanel>
		</CarbonHeader>
	);
};

export default Header;
