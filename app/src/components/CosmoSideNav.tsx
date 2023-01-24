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
	Archive,
	Compare
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
		canCreateRequest,
		canCreateMonitoring,
		canWorkflowApprover
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
					{(canReview || canWorkflowApprover) && (
						<SideNavMenu
							renderIcon={RequestQuote}
							title='Inbox'
							className='transition-all'
						>
							{canReview && (
								<>
									<SideNavMenuItem element={Link} to={routes.REVIEW_NARRATIVE}>
										Review Narrative
									</SideNavMenuItem>
									<SideNavMenuItem element={Link} to={routes.USER_REVALIDATION}>
										User Revalidation
									</SideNavMenuItem>
									<SideNavMenuItem element={Link} to={routes.CHANGE_MONITORING}>
										Change Monitoring
									</SideNavMenuItem>
								</>
							)}
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
								Dashboard
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
								Dashboard
							</SideNavMenuItem>
						</SideNavMenu>
					)}

					{canCreateMonitoring && (
						<SideNavMenu
							renderIcon={Compare}
							title='Change Monitoring'
							className='transition-all'
						>
							<SideNavMenuItem element={Link} to={routes.NEW_MONITORING}>
								New Monitoring
							</SideNavMenuItem>
							<SideNavMenuItem element={Link} to={routes.MONITORING_DASHBOARD}>
								Dashboard
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
