import { ReactElement, ReactNode } from 'react';
import CarbonTheme from './CarbonTheme';

type ThemeProps<K extends keyof HTMLElementTagNameMap> = {
	children: ReactNode;
	className?: string;
	as?: K;
	/**
	 * Specify the theme
	 */
	theme: CarbonTheme;
} & React.HTMLProps<HTMLElementTagNameMap[K]>;

declare function Theme<T extends keyof HTMLElementTagNameMap = 'div'>(
	props: ThemeProps<T>
): ReactElement;

export declare function useTheme(): { theme: CarbonTheme };

export default Theme;
