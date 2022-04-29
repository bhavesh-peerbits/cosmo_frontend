import {
	Header as CarbonHeader,
	HeaderGlobalAction,
	HeaderGlobalBar,
	HeaderMenu,
	HeaderMenuButton,
	HeaderMenuItem,
	HeaderName,
	HeaderNavigation,
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
	Notification,
	Search,
	Switcher as SwitcherIcon
} from '@carbon/react/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMount, useUnmount } from 'ahooks';

type HeaderProps = {
	isSideNavExpanded: boolean;
	onClickSideNavExpand: () => void;
};
const Header = ({ isSideNavExpanded, onClickSideNavExpand }: HeaderProps) => {
	const navigate = useNavigate();
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
			<HeaderNavigation aria-label='IBM [Platform]'>
				<HeaderMenuItem href='#'>Link 1</HeaderMenuItem>
				<HeaderMenu aria-label='Link 2' menuLinkName='Link 2'>
					<HeaderMenuItem href='#one'>Sub-link 1</HeaderMenuItem>
				</HeaderMenu>
			</HeaderNavigation>

			<HeaderGlobalBar>
				<HeaderGlobalAction aria-label='Search' className='' onClick={() => {}}>
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
					<SideNavMenu
						renderIcon={AlignBoxMiddleCenter}
						title='Narrative'
						className='transition-all'
					>
						<SideNavMenuItem element={Link} to='/management'>
							Management Dashboard
						</SideNavMenuItem>

						<SideNavMenuItem href='/review'>Review</SideNavMenuItem>
					</SideNavMenu>
					<SideNavMenu
						isSideNavExpanded={isSideNavExpanded}
						renderIcon={Fade}
						title='Revalidation'
					>
						<SideNavMenuItem href='/home'>SUID</SideNavMenuItem>
						<SideNavMenuItem href='/home'>Firecall</SideNavMenuItem>
						<SideNavMenuItem href='/home'>User Access</SideNavMenuItem>
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
