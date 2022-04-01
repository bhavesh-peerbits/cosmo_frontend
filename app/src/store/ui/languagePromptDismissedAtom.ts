import { atom } from 'recoil';

const languagePromptDismissedAtom = atom<boolean | null>({
	key: 'promptDismissed',
	default: null
});

export default languagePromptDismissedAtom;
