import {
	SideNav,
	SideNavItems,
	SideNavLink,
	SideNavMenu,
	SideNavMenuItem,
	Theme
} from '@carbon/react';
import {
	AlignBoxMiddleCenter,
	Logout,
	RequestQuote,
	Fade,
	UserAdmin,
	UserRole,
	Archive
} from '@carbon/react/icons';
import routes from '@routes/routes-const';
import useUiStore from '@hooks/useUiStore';
import { Link } from 'react-router-dom';
import usePolicyStore from '@hooks/usePolicyStore';
import useResponsive from '@hooks/useResponsive';

type CosmoSideNavProps = {
	isSideNavExpanded: boolean;
	onClickSideNavExpand: () => void;
};

const CosmoSideNav = ({ onClickSideNavExpand, isSideNavExpanded }: CosmoSideNavProps) => {
	const { theme } = useUiStore();
	const {
		canAdmin,
		canReview,
		canReviewNarrative,
		canSeeNarrativeManagement,
		canRevalidateUser,
		canCreateRequest
	} = usePolicyStore();
	const { md, lg } = useResponsive();

	return (
		<Theme theme={theme}>
			<SideNav
				className='border-r-[1px] border-solid border-border-subtle-1'
				onOverlayClick={onClickSideNavExpand}
				aria-label='Side navigation'
				expanded={isSideNavExpanded}
				isRail={md && !lg}
			>
				<SideNavItems>
					{canReview && (
						<SideNavMenu
							renderIcon={RequestQuote}
							title='Inbox'
							className='transition-all'
						>
							<SideNavMenuItem element={Link} to={routes.REVIEW_NARRATIVE}>
								Review Narrative
							</SideNavMenuItem>
							<SideNavMenuItem element={Link} to={routes.USER_REVALIDATION}>
								User Revalidation
							</SideNavMenuItem>
							<SideNavMenuItem element={Link} to={routes.EVIDENCE_REQUEST_ACTION}>
								Evidence Request
							</SideNavMenuItem>
						</SideNavMenu>
					)}
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
									Narrative History
								</SideNavMenuItem>
							)}
						</SideNavMenu>
					)}
					{import.meta.env.DEV && (
						<SideNavLink renderIcon={Fade} href='/home/?showtranslations'>
							[TEST ONLY] Show translations
						</SideNavLink>
					)}
					{canRevalidateUser && (
						<SideNavMenu
							renderIcon={UserRole}
							title='User Revalidation'
							className='transition-all'
						>
							<SideNavMenuItem element={Link} to={routes.NEW_REVALIDATION}>
								New Revalidation
							</SideNavMenuItem>
							<SideNavMenuItem element={Link} to={routes.REVALIDATIONS_ONGOING}>
								Revalidations Ongoing
							</SideNavMenuItem>
						</SideNavMenu>
					)}
					{canCreateRequest && (
						<SideNavMenu
							renderIcon={Archive}
							title='Evidence Request'
							className='transition-all'
						>
							<SideNavMenuItem element={Link} to={routes.NEW_EVIDENCE_REQUEST}>
								New Requests
							</SideNavMenuItem>
							<SideNavMenuItem element={Link} to={routes.STARTED_EVIDENCE_REQUEST}>
								Started Requests
							</SideNavMenuItem>
						</SideNavMenu>
					)}

					{canAdmin && (
						<SideNavLink renderIcon={UserAdmin} element={Link} to={routes.ADMIN}>
							Administration
						</SideNavLink>
					)}

					<SideNavLink renderIcon={Logout} href={routes.LOGOUT}>
						Logout
					</SideNavLink>
				</SideNavItems>
			</SideNav>
		</Theme>
	);
};
export default CosmoSideNav;
