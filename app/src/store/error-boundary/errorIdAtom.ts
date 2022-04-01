import { atom } from 'recoil';

type LanguageType = 'en' | 'it' | 'fr';

const errorId = atom<LanguageType>({
	key: 'error-id',
	default: 'en',
	effects: [
		({ onSet }) => {
			onSet(value => {
				localStorage.setItem('lng', value);
			});
		}
	]
});

export default errorId;
