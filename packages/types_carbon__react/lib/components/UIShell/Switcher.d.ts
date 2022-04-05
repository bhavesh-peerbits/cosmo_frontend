import { ReactNode } from 'react';
import { FCReturn } from '../../../typings/shared';

interface SwitcherProps {
	/**
	 * expects to receive <SwitcherItem />
	 */
	children: ReactNode;

	/**
	 * Optionally provide a custom class to apply to the underlying `<ul>` node
	 */
	className?: string;
}

declare const Switcher: FCReturn<SwitcherProps>;
export default Switcher;
