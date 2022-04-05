import { FCReturn, ReactDivAttr } from '../../../typings/shared';
import CarbonTheme from './CarbonTheme';

interface ThemeProps extends ReactDivAttr {
	/**
	 * Specify the global theme for your app
	 */
	theme: CarbonTheme;
}

declare const GlobalTheme: FCReturn<ThemeProps>;
export default GlobalTheme;
