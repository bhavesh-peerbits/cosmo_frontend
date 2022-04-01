import EventEmitter from 'events';
import Sentry from '@sentry/react';

class ErrorEventEmitter {
	private target: EventEmitter;

	constructor() {
		this.target = new EventEmitter();
	}

	onErrorEvent(listener: (notification: Sentry.Event) => void) {
		return this.target.on('error-event', listener);
	}

	emit(e: Sentry.Event) {
		this.target.emit('error-event', e);
	}
}
const errorEventEmitter = new ErrorEventEmitter();
export default errorEventEmitter;
