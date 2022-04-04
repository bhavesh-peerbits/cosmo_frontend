import '@testing-library/jest-dom';
import mediaQuery from 'css-mediaquery';
import { afterAll } from 'vitest';
import { DESKTOP_RESOLUTION_HEIGHT, DESKTOP_RESOLUTION_WIDTH } from '@test/testUtils';
import server from '@test/mocks/server';
import 'whatwg-fetch';

beforeAll(() => {
	server.listen({ onUnhandledRequest: 'error' });

	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: (query: string) => {
			function matchQuery(): boolean {
				return mediaQuery.match(query, {
					width: window.innerWidth,
					height: window.innerHeight
				});
			}

			const listeners: (() => void)[] = [];
			const instance = {
				matches: matchQuery(),
				addEventListener: (_: 'change', listener: () => void): void => {
					listeners.push(listener);
				},
				removeEventListener: (_: 'change', listener: () => void): void => {
					const index = listeners.indexOf(listener);
					if (index >= 0) {
						listeners.splice(index, 1);
					}
				}
			};
			window.addEventListener('resize', () => {
				const change = matchQuery();
				if (change !== instance.matches) {
					instance.matches = change;
					listeners.forEach(listener => listener());
				}
			});

			return instance;
		}
	});
	Object.defineProperty(window, 'scrollTo', {
		writable: true,
		value: () => {}
	});
	Object.defineProperty(window, 'resizeTo', {
		writable: true,
		value: (width: number, height: number) => {
			Object.assign(window, {
				innerWidth: width,
				innerHeight: height
			}).dispatchEvent(new window.Event('resize'));
		}
	});
});

beforeEach(() => {
	window.resizeTo(DESKTOP_RESOLUTION_WIDTH, DESKTOP_RESOLUTION_HEIGHT);
});

afterEach(() => {
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});
