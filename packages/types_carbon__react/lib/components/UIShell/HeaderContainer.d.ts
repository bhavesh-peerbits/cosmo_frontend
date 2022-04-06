import { FCReturn } from '../../../typings/shared';

interface RenderProps {
	isSideNavExpanded: boolean;

	onClickSideNavExpand: () => void;
}

interface HeaderContainerProps {
	/**
	 * Optionally provide a custom class name that is applied to the underlying <header>
	 */
	isSideNavExpanded?: boolean;

	render: FCReturn<RenderProps>;
}

declare const HeaderContainer: FCReturn<HeaderContainerProps>;
export default HeaderContainer;
