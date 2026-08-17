// oxlint-disable no-console

// Log différencié selon qu'il s'agit d'un timeout applicatif ou d'une autre erreur réseau.
export function logFetchError(error, url, timeoutMs) {
	if (error.name === "AbortError" || error.name === "TimeoutError") {
		console.error(
			`Timeout réseau (${timeoutMs}ms) pour ${url}, requête annulée`,
		);
	} else {
		console.error(`Erreur réseau pour ${url} :`, error);
	}
}
