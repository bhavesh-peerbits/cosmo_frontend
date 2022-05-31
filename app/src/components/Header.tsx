import {
	Header as CarbonHeader,
	HeaderGlobalAction,
	HeaderGlobalBar,
	HeaderMenuButton,
	HeaderName,
	SideNav,
	SideNavItems,
	SideNavLink,
	SideNavMenu,
	SideNavMenuItem
} from '@carbon/react';
import {
	AlignBoxMiddleCenter,
	Fade,
	Logout,
	Moon,
	RequestQuote
} from '@carbon/react/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useBoolean, useMount, useUnmount } from 'ahooks';
import useResponsive from '@hooks/useResponsive';
import useUiStore from '@hooks/useUiStore';
import routes from '@routes/routes-const';
import usePolicyStore from '@hooks/usePolicyStore';
import UserProfileImage from '@components/UserProfileImage';
import useLoginStore from '@hooks/auth/useLoginStore';
import UserPanel from '@components/UserPanel';
import { useRef } from 'react';

type HeaderProps = {
	isSideNavExpanded: boolean;
	onClickSideNavExpand: () => void;
};
const Header = ({ isSideNavExpanded, onClickSideNavExpand }: HeaderProps) => {
	const { canReview, canReviewNarrative, canSeeNarrativeManagement } = usePolicyStore();
	const { auth } = useLoginStore();
	const { setTheme } = useUiStore();
	const navigate = useNavigate();
	const { md, lg } = useResponsive();
	const userButtonRef = useRef<HTMLButtonElement>(null);
	const [userExpanded, { toggle: toggleUser, setFalse: setCloseUser }] =
		useBoolean(false);

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
				onClick={() => navigate(routes.HOME)}
				prefix='Cosmo'
			>
				[Dashboard]
			</HeaderName>

			<HeaderGlobalBar>
				<HeaderGlobalAction
					aria-label='Theme'
					onClick={() => {
						setTheme(old => (old === 'white' ? 'g100' : 'white'));
					}}
				>
					<Moon />
				</HeaderGlobalAction>

				<HeaderGlobalAction
					ref={userButtonRef}
					aria-label={auth?.user?.displayName}
					isActive={userExpanded}
					onClick={() => toggleUser()}
					tooltipAlignment='end'
				>
					<UserProfileImage
						backgroundColor='light-gray'
						initials={auth?.user?.displayName}
						imageDescription={auth?.user?.username}
						size='md'
					/>
				</HeaderGlobalAction>
			</HeaderGlobalBar>
			<SideNav
				onOverlayClick={onClickSideNavExpand}
				aria-label='Side navigation'
				expanded={isSideNavExpanded}
				isRail={md && !lg}
			>
				<SideNavItems>
					{canSeeNarrativeManagement && (
						<SideNavMenu
							renderIcon={AlignBoxMiddleCenter}
							title='Narrative'
							className='transition-all'
						>
							<SideNavMenuItem element={Link} to={routes.MANAGEMENT}>
								Management Dashboard
							</SideNavMenuItem>
							{canReviewNarrative && (
								<SideNavMenuItem element={Link} to={routes.REVIEW}>
									Review
								</SideNavMenuItem>
							)}
						</SideNavMenu>
					)}
					{canReview && (
						<SideNavMenu
							renderIcon={RequestQuote}
							title='Review'
							className='transition-all'
						>
							<SideNavMenuItem element={Link} to={routes.REVIEW_NARRATIVE}>
								Narrative
							</SideNavMenuItem>
						</SideNavMenu>
					)}
					{import.meta.env.DEV && (
						<SideNavLink renderIcon={Fade} href='/translation?showtranslations'>
							[TEST ONLY] Show translations
						</SideNavLink>
					)}
					<SideNavLink renderIcon={Logout} href={routes.LOGOUT}>
						Logout
					</SideNavLink>
				</SideNavItems>
			</SideNav>
			<UserPanel
				expanded={userExpanded}
				user={auth?.user}
				onClickOutside={e =>
					e.target !== userButtonRef.current &&
					!userButtonRef.current?.contains(e.target as Node) &&
					setCloseUser()
				}
			/>
		</CarbonHeader>
	);
};

export default Header;
