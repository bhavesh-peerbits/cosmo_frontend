import { atom } from 'recoil';
import i18n from '@i18n';
import moment from 'moment';

type Language = 'en' | 'it';

const languageAtom = atom<Language>({
	key: 'language-atom',
	default: 'en',
	effects: [
		({ onSet }) => {
			onSet(value => {
				moment.locale(value);
				return i18n.changeLanguage(value);
			});
		}
	]
});
export default languageAtom;
