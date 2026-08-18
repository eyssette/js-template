import { resolveAppUrl } from "./service-worker/helpers/url.mjs";

const environment = process.env.NODE_ENV;

const useServiceWorker =
	environment === "development-with-service-worker" ||
	environment === "production";

export async function registerServiceWorker() {
	if (useServiceWorker && "serviceWorker" in navigator) {
		try {
			const registration = await navigator.serviceWorker.register(
				resolveAppUrl("sw.js"),
				{ scope: resolveAppUrl("./") },
			);
			return registration;
		} catch (error) {
			if (environment === "development-with-service-worker") {
				console.error("SW registration failed:", error);
			}
		}
	}
}
