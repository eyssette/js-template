export async function activatePreload() {
	if (globalThis.registration.navigationPreload) {
		try {
			await globalThis.registration.navigationPreload.enable();
		} catch (error) {
			if (process.env.NODE_ENV === "development-with-service-worker") {
				console.error(
					"Erreur lors de l'activation du préchargement de la navigation :",
					error,
				);
			}
		}
	}
}
