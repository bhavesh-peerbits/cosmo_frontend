import { atom } from 'recoil';
import { CarbonTheme } from '@carbon/react';

const themeAtom = atom<CarbonTheme | null>({
	key: 'theme',
	default: null
});

export default themeAtom;
