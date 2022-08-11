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
	UserRole
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
	const { canReview, canReviewNarrative, canSeeNarrativeManagement, canRevalidateUser } =
		usePolicyStore();
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
					<SideNavLink renderIcon={UserAdmin} href={routes.ADMIN}>
						Administration
					</SideNavLink>
					<SideNavLink renderIcon={Logout} href={routes.LOGOUT}>
						Logout
					</SideNavLink>
				</SideNavItems>
			</SideNav>
		</Theme>
	);
};
export default CosmoSideNav;
