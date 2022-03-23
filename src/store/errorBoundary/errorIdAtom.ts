import { atom } from 'recoil';
import errorEventEmitter from '@event/ErrorEventEmitter';

const errorId = atom<string | undefined>({
	key: 'error-id',
	default: undefined,
	effects: [
		({ setSelf }) => {
			errorEventEmitter.onErrorEvent(errorEvent => setSelf(errorEvent.event_id));
		}
	]
});

export default errorId;
