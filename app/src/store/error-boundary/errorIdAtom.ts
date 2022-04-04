import { atom } from 'recoil';
import errorEventEmitter from '@event/ErrorEventEmitter';
import Sentry from '@sentry/react';

const errorId = atom<string | undefined>({
	key: 'error-id',
	default: 'en',
	effects: [
		({ setSelf }) => {
			errorEventEmitter.onErrorEvent(error => {
				const event = error as CustomEvent<Sentry.Event>;
				setSelf(event.detail.event_id);
			});
		}
	]
});

export default errorId;
