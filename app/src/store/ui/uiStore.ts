import { DefaultValue, selector } from 'recoil';
import languageAtom from '@store/i18n/languageAtom';
import languagePromptDismissedAtom from '@store/ui/languagePromptDismissedAtom';
import themeAtom from '@store/ui/themeAtom';
import { GetRecoilType } from '@store/util';

type UIStore = {
	language: NonNullable<GetRecoilType<typeof languageAtom>>;
	languagePromptDismissed: NonNullable<GetRecoilType<typeof languagePromptDismissedAtom>>;
	theme: NonNullable<GetRecoilType<typeof themeAtom>>;
};
//
// const transformLanguage = (language: string): string => {
//   return language;
// };

const uiStore = selector<UIStore>({
	key: 'uiStore',
	get: ({ get }) => {
		const uiPref: UIStore | null = JSON.parse(localStorage.getItem('UI_PREF') || '{}');
		const language = get(languageAtom) ?? uiPref?.language ?? 'en_US';
		const languagePromptDismissed =
			get(languagePromptDismissedAtom) ?? uiPref?.languagePromptDismissed ?? false;
		const theme = get(themeAtom) ?? uiPref?.theme ?? 'white';
		return { language, languagePromptDismissed, theme };
	},
	set: ({ set }, newState) => {
		if (newState instanceof DefaultValue) {
			return;
		}
		set(languageAtom, newState.language);
		set(languagePromptDismissedAtom, newState.languagePromptDismissed);
		set(themeAtom, newState.theme);
		localStorage.setItem('UI_PREF', JSON.stringify(newState));
	}
});

export default uiStore;
