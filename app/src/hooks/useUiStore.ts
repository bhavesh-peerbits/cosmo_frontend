import uiStore from '@store/ui/uiStore';
import { useRecoilState } from 'recoil';

const useUiStore = () => {
	const [{ theme, language, languagePromptDismissed }, setUiStore] =
		useRecoilState(uiStore);
	type Theme = typeof theme;

	const setLanguagePromptDismissed = (value: typeof languagePromptDismissed) => {
		setUiStore(val => ({ ...val, languagePromptDismissed: value }));
	};

	const setLanguage = (value: typeof language) => {
		setUiStore(val => ({
			...val,
			languagePromptDismissed: true,
			language: value
		}));
	};

	const setTheme = (value: Theme | ((oldVal: Theme) => Theme)) => {
		setUiStore(val => ({
			...val,
			theme: value instanceof Function ? value(val.theme) : value
		}));
	};

	return {
		theme,
		language,
		languagePromptDismissed,
		setLanguagePromptDismissed,
		setLanguage,
		setTheme
	};
};

export default useUiStore;
