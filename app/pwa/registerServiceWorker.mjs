export async function registerServiceWorker() {
	if ("serviceWorker" in navigator) {
		try {
			const registration = await navigator.serviceWorker.register("/sw.js", {
				scope: "/",
			});
			return registration;
		} catch (error) {
			// oxlint-disable-next-line no-console
			console.error("SW registration failed:", error);
		}
	}
}
