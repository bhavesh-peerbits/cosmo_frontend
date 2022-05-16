import { atom } from 'recoil';
import i18n from '@i18n';
import { languages } from '@i18n/languageOptions';

type Language = typeof languages[number];

const languageAtom = atom<Language | null>({
	key: 'language-atom',
	default: null,
	effects: [
		({ onSet }) => {
			onSet(value => {
				if (i18n.language !== value) {
					return i18n.changeLanguage(value || 'en_US');
				}
				return null;
			});
		}
	]
});
export default languageAtom;
