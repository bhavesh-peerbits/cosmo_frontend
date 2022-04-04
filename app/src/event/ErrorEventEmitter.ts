import Sentry from '@sentry/react';

class ErrorEventEmitter extends EventTarget {
	onErrorEvent(listener: (errorEvent: Event) => void) {
		return this.addEventListener('error-event', listener);
	}

	emit(e: Sentry.Event) {
		this.dispatchEvent(new CustomEvent('error-event', { detail: e }));
	}
}
const errorEventEmitter = new ErrorEventEmitter();
export default errorEventEmitter;
