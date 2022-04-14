import { FCReturn, ReactAttr } from '../../../typings/shared';

interface SwitcherDividerProps extends ReactAttr<HTMLHRElement> {
	/**
	 * Optionally provide a custom class to apply to the underlying `<li>` node
	 */
	className?: string;
}

declare const SwitcherDivider: FCReturn<SwitcherDividerProps>;

export default SwitcherDivider;
