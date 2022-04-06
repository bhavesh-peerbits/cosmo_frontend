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
	HeaderSideNavItems,
	SideNav,
	SideNavItems,
	SideNavLink,
	SideNavMenu,
	SideNavMenuItem,
	SkipToContent,
	Switcher,
	SwitcherDivider,
	SwitcherItem
} from '@carbon/react';
import {
	Fade,
	Notification,
	Search,
	Switcher as SwitcherIcon
} from '@carbon/react/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

type HeaderProps = {
	isSideNavExpanded: boolean;
	onClickSideNavExpand: () => void;
};
const Header = ({ isSideNavExpanded, onClickSideNavExpand }: HeaderProps) => {
	const [appExpanded, setAppExpanded] = useState(false);
	return (
		<CarbonHeader aria-label='IBM Platform Name'>
			<SkipToContent href=''>TEST</SkipToContent>
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
						<SideNavLink renderIcon={Fade} href='/translation?showtranslations'>
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
		</CarbonHeader>
	);
};

export default Header;
