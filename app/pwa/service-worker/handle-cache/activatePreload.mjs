export async function activatePreload() {
	if (globalThis.registration.navigationPreload) {
		try {
			await globalThis.registration.navigationPreload.enable();
		} catch (error) {
			// oxlint-disable-next-line no-console
			console.error(
				"Erreur lors de l'activation du préchargement de la navigation :",
				error,
			);
		}
	}
}
