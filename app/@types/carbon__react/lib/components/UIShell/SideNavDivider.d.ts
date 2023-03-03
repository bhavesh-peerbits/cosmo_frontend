import { FCReturn, ReactAttr } from '../../../typings/shared';

interface SideNavDividerProps extends ReactAttr<HTMLHRElement> {
	/**
	 * Optionally provide a custom class to apply to the underlying `<li>` node
	 */
	className?: string;
}

declare const SideNavDivider: FCReturn<SideNavDividerProps>;

export default SideNavDivider;
