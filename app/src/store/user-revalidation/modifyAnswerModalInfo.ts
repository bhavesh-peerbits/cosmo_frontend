import Answer from '@model/UserRevalidation/Answer';
import { atom } from 'recoil';

const modifyAnswerModalInfo = atom<{
	open: boolean;
	answer: Answer | undefined;
	revId: string | undefined;
	campaignType: string | undefined;
}>({
	key: 'modifyAnswerModalInfo',
	default: { open: false, answer: undefined, revId: undefined, campaignType: undefined }
});

export default modifyAnswerModalInfo;
