import { CarbonTheme as CarbonThemeType, Theme as CarbonTheme } from '@carbon/react';
import { ReactNode } from 'react';

type ThemeProps = {
	children: ReactNode;
	theme: CarbonThemeType;
};

const Theme = ({ children, theme }: ThemeProps) => {
	return (
		<CarbonTheme theme={theme} className='h-full overflow-hidden'>
			{children}
		</CarbonTheme>
	);
};

export default Theme;
