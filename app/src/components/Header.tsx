import {
	Accordion,
	AccordionItem,
	Button,
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
import { mapUserRoleToDisplayRole } from '@model/UserRole';

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
	const [userExpanded, { toggle: toggleUser }] = useBoolean(false);

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

			<HeaderPanel
				aria-label='User Panel'
				className='h-fit border-t-[0] border-r-[0] border-b-[1px] border-solid border-border-subtle-1'
				expanded={userExpanded}
			>
				<section className='flex flex-nowrap items-center space-x-5 p-5'>
					<UserProfileImage
						backgroundColor='light-gray'
						initials={auth?.user?.displayName}
						imageDescription={auth?.user?.username}
						size='xlg'
					/>
					<div>
						<span className='break-words hyphens-auto text-productive-heading-3'>
							{auth?.user?.displayName}
						</span>
						<span className='block break-all text-caption-1'>{auth?.user?.email}</span>
					</div>
				</section>
				<section>
					<Accordion className='py-2'>
						<AccordionItem
							className='relative border-[0]'
							title={
								<>
									<div className='text-caption-1'>
										Roles: {auth?.user?.roles?.length ?? 0}
									</div>
									<div className='w-13 overflow-hidden text-ellipsis whitespace-nowrap text-left text-body-short-2'>
										{auth?.user?.principalRole}
									</div>
								</>
							}
						>
							<ul className='space-y-3'>
								{auth?.user?.roles?.map(role => (
									<li className='w-full'>
										<div className='w-full border-b-[1px] border-solid border-border-subtle-1 px-5 py-3 text-body-short-1'>
											{mapUserRoleToDisplayRole(role)}
										</div>
									</li>
								))}
							</ul>
						</AccordionItem>
					</Accordion>
				</section>
				<section className='flex items-center justify-between border-t-[1px] border-solid border-border-subtle-1 py-2 px-2 text-body-short-1'>
					<Button kind='ghost' size='sm' className='flex flex-1 justify-start'>
						Edit Profile
					</Button>
					<Button
						kind='ghost'
						size='sm'
						className='flex flex-1 justify-end'
						onClick={() => navigate(routes.LOGOUT, { replace: true })}
					>
						Sign out
					</Button>
				</section>
			</HeaderPanel>
		</CarbonHeader>
	);
};

export default Header;
