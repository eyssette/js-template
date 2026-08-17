import { APP_NAME, CURRENT_CACHES } from "../swConfig.mjs";

// Supprime les caches d'une version précédente du service worker.
export async function removePreviousCaches() {
	const cacheNames = await caches.keys();
	await Promise.all(
		cacheNames
			.filter(
				(name) => name.startsWith(`${APP_NAME}-`) && !CURRENT_CACHES.has(name),
			)
			.map((name) => caches.delete(name)),
	);
}
