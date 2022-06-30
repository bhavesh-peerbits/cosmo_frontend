import { cacheNames, clientsClaim } from 'workbox-core';
import { registerRoute, setCatchHandler, setDefaultHandler } from 'workbox-routing';
import { NetworkFirst, NetworkOnly, Strategy } from 'workbox-strategies';
import type { ManifestEntry } from 'workbox-build';

// Give TypeScript the correct global.
declare let self: ServiceWorkerGlobalScope;

const debug = false;
const credentials = 'same-origin';
const networkTimeoutSeconds = 0;
const fallback = 'offline.html';

const cacheName = cacheNames.runtime;

const buildStrategy = (): Strategy => {
	if (networkTimeoutSeconds > 0)
		return new NetworkFirst({ cacheName, networkTimeoutSeconds });
	return new NetworkFirst({ cacheName });
};

// @ts-ignore
const manifest = self.__WB_MANIFEST as Array<ManifestEntry>;

const cacheEntries: RequestInfo[] = [];

const manifestURLs = manifest.map(entry => {
	const url = new URL(entry.url, self.location.href);
	cacheEntries.push(
		new Request(url.href, {
			credentials: credentials as RequestCredentials
		})
	);
	return url.href;
});

self.addEventListener('install', (event: ExtendableEvent) => {
	event.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll(cacheEntries);
		})
	);
});

self.addEventListener('activate', (event: ExtendableEvent) => {
	// - clean up outdated runtime cache
	event.waitUntil(
		caches.open(cacheName).then(cache => {
			// clean up those who are not listed in manifestURLs
			cache.keys().then(keys => {
				keys.forEach(request => {
					debug && console.log(`Checking cache entry to be removed: ${request.url}`);
					if (!manifestURLs.includes(request.url)) {
						cache.delete(request).then(deleted => {
							if (debug) {
								if (deleted)
									console.log(`Precached data removed: ${request.url || request}`);
								else console.log(`No precache found: ${request.url || request}`);
							}
						});
					}
				});
			});
		})
	);
});

registerRoute(({ url }) => manifestURLs.includes(url.href), buildStrategy());

setDefaultHandler(new NetworkOnly());

// fallback to app-shell for document request
setCatchHandler(({ event }): Promise<Response> => {
	// @ts-ignore
  switch (event.request.destination) {
		case 'document':
			return caches.match(fallback).then(r => {
				return r ? Promise.resolve(r) : Promise.resolve(Response.error());
			});
		default:
			return Promise.resolve(Response.error());
	}
});

// this is necessary, since the new service worker will keep on skipWaiting state
// and then, caches will not be cleared since it is not activated
self.skipWaiting();
clientsClaim();
