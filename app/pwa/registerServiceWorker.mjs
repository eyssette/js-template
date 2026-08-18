const environment = process.env.NODE_ENV;

const useServiceWorker =
	environment === "development-with-service-worker" ||
	environment === "production";

export async function registerServiceWorker() {
	if (useServiceWorker && "serviceWorker" in navigator) {
		try {
			const registration = await navigator.serviceWorker.register("/sw.js", {
				scope: "/",
			});
			return registration;
		} catch (error) {
			if (environment === "development-with-service-worker") {
				console.error("SW registration failed:", error);
			}
		}
	}
}
