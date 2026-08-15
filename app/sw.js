// oxlint-disable no-implicit-globals no-console max-lines

// Service worker pour que l'application puisse fonctionner comme une PWA (Progressive Web App) avec mise en cache des ressources et gestion du hors-ligne.

// Trois stratégies de cache sont utilisées :
// 1. Cache-first : pour les ressources essentielles (le cœur de l'application)
// 2. Stale-while-revalidate : pour les assets statiques (JS, CSS, images, fonts, icônes...)
// 3. Network-first : pour les données téléchargées depuis le réseau et les pages HTML hors page d'accueil (index.html)

// On peut forcer une stratégie particulière pour une requête donnée en ajoutant un header HTTP `X-Cache-Strategy` ou un paramètre d'URL `cache_strategy` avec l'une des valeurs suivantes : `cache-first`, `stale-while-revalidate`, `network-first`.
// Ce forçage ne peut s'appliquer qu'aux ressources non-HTML (images, JS, CSS, données JSON...) afin d'éviter de casser le fonctionnement hors-ligne des navigations HTML (pages web).

// 1. CONFIGURATION

// Le service worker est lié à une version : quand on passe à une nouvelle version, les anciens caches sont supprimés à l'activation du nouveau service worker.
const APP_NAME = "js-template";
// Le numéro de version est automatiquement mis à jour lors d'un bump de version.
// NE PAS MODIFIER MANUELLEMENT
const APP_VERSION = "7.0.0";
// On peut forcer manuellement le service worker à se réinstaller et à recharger les caches en changeant la version ci-dessous.
const SW_VERSION = "0";

// Par défaut, le service worker se met à jour automatiquement quand une nouvelle version est disponible.
// C'est plus propre normalement de le faire via l'API "postMessage", mais il faut dans ce cas_là le gérer manuellement dans l'application et envoyer un message avec le type "SKIP_WAITING" pour forcer le service worker à se mettre à jour.
const UPDATE_SERVICE_WORKER_WITH_POST_MESSAGE = false;

// On distingue 3 caches
// - CORE_CACHE : pour les fichiers essentiels de l'application (cache-first)
// - STATIC_ASSETS_CACHE : pour les assets statiques (stale-while-revalidate)
// - DYNAMIC_CACHE : pour les données téléchargées depuis le réseau (network-first)
const CORE_CACHE = `${APP_NAME}-core-${APP_VERSION}-${SW_VERSION}`;
const STATIC_ASSETS_CACHE = `${APP_NAME}-assets-${APP_VERSION}-${SW_VERSION}`;
const DATA_CACHE = `${APP_NAME}-data-${APP_VERSION}-${SW_VERSION}`;
const DYNAMIC_CACHE = `${APP_NAME}-dynamic-${APP_VERSION}-${SW_VERSION}`;
const OPAQUE_CACHE = `${APP_NAME}-opaque-${APP_VERSION}-${SW_VERSION}`;

const CURRENT_CACHES = new Set([
	CORE_CACHE,
	STATIC_ASSETS_CACHE,
	DATA_CACHE,
	DYNAMIC_CACHE,
	OPAQUE_CACHE,
]);

// Page affichée quand la navigation échoue complètement
const OFFLINE_URL = "/pwa/offline.html";

// Fichiers à mettre en cache dès l'installation
const CRITICAL_PRECACHE_URLS = [
	"/",
	"/index.html",
	OFFLINE_URL,
	"/css/styles.min.css",
	"/chunks/main.js",
	"/iifeFallback.js",
	"/script.min.js",
];

const NON_CRITICAL_PRECACHE_URLS = [
	"/favicon.svg",
	"/pwa/manifest.webmanifest",
	"/pwa/icon-192x192.png",
	"/pwa/icon-512x512.png",
	"/pwa/maskable-icon-192x192.png",
	"/pwa/maskable-icon-512x512.png",
];

const PRECACHE_URLS = [
	...CRITICAL_PRECACHE_URLS,
	...NON_CRITICAL_PRECACHE_URLS,
];

// Extensions considérées comme "assets statiques" → stale-while-revalidate
const STATIC_ASSETS_EXTENSIONS = new Set([
	"js",
	"mjs",
	"css",
	"png",
	"jpg",
	"jpeg",
	"svg",
	"gif",
	"webp",
	"avif",
	"ico",
	"woff",
	"woff2",
	"ttf",
	"otf",
	"eot",
]);

// Extensions indiquant des fichiers à ne pas mettre en cache (fichiers lourds, vidéos, etc.)
const NON_CACHEABLE_EXTENSIONS = new Set([
	"mp4",
	"webm",
	"mov",
	"avi",
	"mkv",
	"flv",
	"wmv",
	"ogg",
	"mp3",
	"wav",
	"flac",
	"aac",
	"m4a",
	"pdf",
	"doc",
	"docx",
	"xls",
	"xlsx",
	"ppt",
	"pptx",
	"zip",
	"rar",
	"7z",
	"tar",
	"gz",
	"iso",
	"exe",
	"dmg",
	"msi",
	"apk",
	"bin",
	"dat",
	"raw",
]);

// Extensions indiquant des fichiers de données texte
const DATA_FILE_EXTENSIONS = new Set([
	"adoc",
	"asciidoc",
	"bib",
	"csv",
	"graphql",
	"handlebars",
	"hbs",
	"j2",
	"jinja",
	"json",
	"latex",
	"liquid",
	"markdown",
	"md",
	"mustache",
	"njk",
	"rmd",
	"sql",
	"sqlite",
	"tex",
	"toml",
	"tsv",
	"text",
	"txt",
	"xml",
	"yaml",
	"yml",
]);

// Applications web qui peuvent fournir des fichiers de données texte
const APPS_PROVIDING_DATA_FILES = [
	"grist.numerique.gouv.fr",
	"docs.numerique.gouv.fr",
	"codimd.apps.education.fr",
	"pad.numerique.gouv.fr",
	"demo.hedgedoc.org",
	"digipage.app",
	"framapad.org",
	"digidoc.app",
	"gitlab.com",
	"gitlab.io",
	"framagit.org",
	"framagit.io",
	"github.com",
	"github.io",
	"gitlab.com",
	"forge.apps.education.fr",
	".apps.education.fr",
];

// Nombre max d'entrées gardées dans le cache (évite qu'il grossisse
// indéfiniment si l'app fetch beaucoup de fichiers différents).
const CACHE_MAX_ENTRIES = 100;
// On limite le nombre d'entrées opaques (cross-origin) de manière plus importante pour éviter de saturer le cache avec des ressources externes.
const MAX_OPAQUE_ENTRIES = 10;
// On limite la taille maximale des fichiers mis en cache pour éviter de saturer le cache avec des fichiers volumineux.
// oxlint-disable-next-line no-magic-numbers
const MAX_CACHEABLE_SIZE_BYTES = 20 * 1024 * 1024;

// Header permettant au développeur de choisir explicitement une stratégie.
const STRATEGY_HEADER = "X-Cache-Strategy";
// Paramètre d'URL permettant au développeur de choisir une stratégie.
const STRATEGY_PARAM = "cache_strategy";

// Valeurs acceptées pour les stratégies.
const STRATEGIES = new Set([
	"no-cache",
	"cache-first",
	"stale-while-revalidate",
	"network-first",
]);

// Timeout en ms pour la requête réseau avant de retomber sur le cache.
const DEFAULT_TIMEOUT_MS = 5000;

// 2. PRECACHE

const PRECACHE_URL_SET = new Set(
	PRECACHE_URLS.map((url) => new URL(url, globalThis.location.origin).href),
);

function isPrecachedRequest(request) {
	return PRECACHE_URL_SET.has(request.url);
}

// Met en cache un lot de ressources de manière tolérante aux échecs
// individuels : chaque échec est loggé mais ne fait pas échouer les autres.
async function precacheNonCriticalUrls(cache, urls) {
	const results = await Promise.allSettled(
		urls.map(async (url) => {
			const request = new Request(url, { cache: "reload" });
			const response = await fetch(request);
			if (!isCacheableResponse(response)) {
				throw new Error(
					`Réponse non cacheable pour ${url} (${response.status})`,
				);
			}
			await cache.put(request, response);
		}),
	);

	for (const [index, result] of results.entries()) {
		if (result.status === "rejected") {
			console.error(
				`Précache optionnel échoué pour ${urls[index]} :`,
				result.reason,
			);
		}
	}
}

// 3. HELPERS

// Vérifie si la requête est une navigation (HTML)
function isNavigationRequest(request) {
	return request.mode === "navigate";
}

// Vérifie si l'URL correspond à un asset statique (JS, CSS, images, fonts, icônes...)
function isStaticAsset(url) {
	// On récupère la partie après le dernier point
	const parts = url.pathname.split(".");
	const requiredPartsForExtension = 2;
	if (parts.length < requiredPartsForExtension) {
		return false;
	}

	const ext = parts.pop().toLowerCase();
	return STATIC_ASSETS_EXTENSIONS.has(ext);
}

function isDataRequest(url) {
	// On vérifie si l'url correspond à un fichier dont l'extension correspond à un fichier de données
	const parts = url.pathname.split(".");
	const requiredPartsForExtension = 2;
	if (parts.length >= requiredPartsForExtension) {
		const ext = parts.pop().toLowerCase();
		return DATA_FILE_EXTENSIONS.has(ext);
	}
	// Sinon, on vérifie si le nom de domaine contient un des mots clés correspond à un site qui fournit des fichiers de données (ex: GitHub, GitLab, Framapad...)
	return APPS_PROVIDING_DATA_FILES.some((app) => url.hostname.endsWith(app));
}

// Limite le nombre d'entrées dans un cache dès lors qu'il dépasse un seuil, en supprimant les plus anciennes entrées.
const defaultMarginBeforeTrimming = 20;
async function trimCache(
	cacheName,
	maxEntries,
	margin = defaultMarginBeforeTrimming,
) {
	const cache = await caches.open(cacheName);
	const keys = await cache.keys();

	const threshold = maxEntries + margin;

	if (keys.length <= threshold) {
		return;
	}
	const excess = keys.length - maxEntries;
	const keysToDelete = keys.slice(0, excess);
	await Promise.all(keysToDelete.map((key) => cache.delete(key)));
}

// Vérifie si la réponse est de type "opaque" (cross-origin, sans CORS)
function isOpaqueResponse(response) {
	return response && response.type === "opaque";
}

// Vérifie si la ressource peut être récupérée et mise en cache
function isCacheableResponse(response) {
	return response && (response.ok || response.type === "opaque");
}

// Vérifie si la ressource est considérée comme à ne pas mettre en cache (vidéos, fichiers lourds, etc.)
function shouldNotBeCachedBasedOnFileExtension(request) {
	const url = new URL(request.url);
	const parts = url.pathname.split(".");
	const requiredPartsForExtension = 2;
	if (parts.length < requiredPartsForExtension) {
		return false;
	}

	const ext = parts.pop().toLowerCase();
	return NON_CACHEABLE_EXTENSIONS.has(ext);
}

// Vérifie si la réponse a un header "Cache-Control: no-store" (dans ce cas, on ne doit pas la mettre en cache)
function hasNoStoreDirective(response) {
	const cacheControl = response.headers.get("Cache-Control");
	if (!cacheControl) {
		return false;
	}
	return cacheControl
		.toLowerCase()
		.split(",")
		.map((directive) => directive.trim())
		.includes("no-store");
}

function shouldStayPrivate(request, response) {
	const cacheControl = response.headers.get("Cache-Control");
	if (!cacheControl) {
		return false;
	}

	// Par défaut, si le header Cache-Control contient "private", on considère que la ressource ne doit pas être mise en cache par le service worker.
	// Mais si le développeur autorise explicitement le caching dans la requête via le header `X-Cache-Strategy, alors on autorise la mise en cache
	// On n'autorise pas l'utilisation d'un paramètre d'URL pour forcer le caching d'une ressource privée, car cela pourrait être utilisé par un attaquant pour contourner la politique de confidentialité.
	const headerStrategy = normalizeStrategy(
		request.headers.get(STRATEGY_HEADER),
	);
	if (
		headerStrategy === "stale-while-revalidate" ||
		headerStrategy === "network-first"
	) {
		// On autorise la mise en cache, mais on évite le "cache-first" pour ce type de ressource, car sinon une ressource privée pourrait rester en cache pendant longtemps
		return false;
	}

	return cacheControl
		.toLowerCase()
		.split(",")
		.map((directive) => directive.trim())
		.includes("private");
}

// Récupère la réponse d'un cache opaque (cross-origin) si elle existe
async function matchOpaqueCache(request) {
	const opaqueCache = await caches.open(OPAQUE_CACHE);
	return opaqueCache.match(request);
}

// Récupère la réponse du cache des données si elle existe
async function matchDataCache(request) {
	const dataCache = await caches.open(DATA_CACHE);
	return dataCache.match(request);
}

// Vérifie si la réponse est trop volumineuse pour être mise en cache (par défaut, > 20 Mo)
// Ne fonctionne que si le serveur fournit un header "Content-Length" (ce qui est le cas pour la plupart des serveurs web, mais pas pour les réponses chunked ou les flux).
function isTooLarge(response, maxSize = MAX_CACHEABLE_SIZE_BYTES) {
	const contentLength = response.headers.get("Content-Length");
	if (contentLength) {
		const size = Number(contentLength);
		if (!Number.isNaN(size) && size > maxSize) {
			return true;
		}
	}
	return false;
}

// Vérifie si la requête est une requête de type "Range" (demande d'une partie d'un fichier)
function isRangeRequest(request) {
	return request.headers.has("range");
}

function isPartialResponse(response) {
	const partialResponseStatus = 206;
	return response.status === partialResponseStatus;
}

// Récupère la réponse réseau : tente d'abord le preload si disponible, sinon fetch classique.
// oxlint-disable-next-line max-params max-statements
async function getNetworkResponse(request, fetchOptions, event, timeoutMs) {
	const hasTimeout = timeoutMs > 0;
	// 1. Tentative via navigation preload (si applicable)
	if (request.mode === "navigate" && event && event.preloadResponse) {
		const NAVIGATION_PRELOAD_TIMEOUT_MS = 1000;
		let preloadTimeoutId;

		// oxlint-disable-next-line promise/prefer-await-to-then promise/prefer-await-to-callbacks
		const preloadPromise = event.preloadResponse.catch((error) => {
			console.error("Navigation Preload échoué :", error);
		});

		// oxlint-disable-next-line promise/avoid-new
		const timeoutPromise = new Promise((resolve) => {
			preloadTimeoutId = setTimeout(resolve, NAVIGATION_PRELOAD_TIMEOUT_MS);
		});

		let preloadResponse;
		try {
			preloadResponse = await Promise.race([preloadPromise, timeoutPromise]);
		} finally {
			clearTimeout(preloadTimeoutId);
		}

		// On garde la promesse attachée à l'événement, même après timeout
		event.waitUntil(preloadPromise);

		if (preloadResponse) {
			return preloadResponse;
		}
	}

	// 2. Fetch classique (repli après échec du preload, ou requête non‑navigation);
	let timeoutId;
	try {
		if (hasTimeout) {
			const controller = new AbortController();
			timeoutId = setTimeout(() => {
				controller.abort(
					new DOMException(
						`Timeout après ${timeoutMs}ms pour ${request.url}`,
						"TimeoutError",
					),
				);
			}, timeoutMs);
			return await fetch(request, {
				...fetchOptions,
				signal: controller.signal,
			});
		}
		return await fetch(request, fetchOptions);
	} finally {
		if (hasTimeout) {
			clearTimeout(timeoutId);
		}
	}
}

// Met en cache la réponse réseau si elle est éligible (ni exclue, ni non cacheable).
// oxlint-disable-next-line max-params
async function cacheNetworkResponse(request, response, cacheName, event) {
	if (
		shouldNotBeCachedBasedOnFileExtension(request) ||
		!isCacheableResponse(response) ||
		hasNoStoreDirective(response) ||
		shouldStayPrivate(request, response) ||
		isTooLarge(response) ||
		isRangeRequest(request) ||
		isPartialResponse(response)
	) {
		return;
	}

	const targetCacheName = isOpaqueResponse(response) ? OPAQUE_CACHE : cacheName;
	const maxEntries = isOpaqueResponse(response)
		? MAX_OPAQUE_ENTRIES
		: CACHE_MAX_ENTRIES;

	const cachePutOperation = async () => {
		try {
			const responseClone = response.clone();
			const cache = await caches.open(targetCacheName);
			await cache.put(request, responseClone);
			await trimCache(targetCacheName, maxEntries);
		} catch (error) {
			console.error(
				`Erreur d'écriture dans le cache (${targetCacheName}) :`,
				error,
			);
		}
	};

	// Si un event est fourni, on ne bloque pas la réponse principale pour la
	// mise en cache (utile pour stale-while-revalidate). Sinon on attend
	// (utile pour cache-first quand on doit peupler le cache).
	if (event) {
		event.waitUntil(cachePutOperation());
	} else {
		await cachePutOperation();
	}
}

// Log différencié selon qu'il s'agit d'un timeout applicatif ou d'une autre erreur réseau.
function logFetchError(error, url, timeoutMs) {
	if (error.name === "AbortError" || error.name === "TimeoutError") {
		console.error(
			`Timeout réseau (${timeoutMs}ms) pour ${url}, requête annulée`,
		);
	} else {
		console.error(`Erreur réseau pour ${url} :`, error);
	}
}

// Met à jour le cache depuis le réseau.
const inflightRequests = new Map();

async function fetchAndCache(
	request,
	cacheName,
	{ event, timeoutMs = DEFAULT_TIMEOUT_MS } = {},
) {
	const key = `${request.method}:${request.url}:${cacheName}`;

	// Si une requête identique est déjà en cours, on retourne la même promesse
	if (inflightRequests.has(key)) {
		return inflightRequests.get(key).then((response) => response.clone());
	}

	// Les fichiers volumineux et non cacheables (vidéos, archives, PDF...) ne
	// doivent pas être coupés par le timeout applicatif.
	const skipTimeout = shouldNotBeCachedBasedOnFileExtension(request);

	const promise = (async () => {
		try {
			// On utilise cache: "no-cache" pour toujours obtenir une réponse fraîche
			// du réseau tout en permettant au navigateur de gérer son propre cache HTTP.
			const fetchOptions = {
				cache: "no-cache",
			};
			const response = await getNetworkResponse(
				request,
				fetchOptions,
				event,
				skipTimeout ? 0 : timeoutMs,
			);
			await cacheNetworkResponse(request, response, cacheName, event);
			return response;
		} catch (error) {
			logFetchError(error, request.url, timeoutMs);
			throw error;
		}
	})();

	// Stocke la promesse dans la map pour dédupliquer les requêtes en vol
	inflightRequests.set(key, promise);

	try {
		const response = await promise;
		return response.clone();
	} finally {
		// Nettoie la map une fois la requête terminée (succès ou échec)
		setTimeout(() => {
			if (inflightRequests.get(key) === promise) {
				inflightRequests.delete(key);
			}
		}, 0);
	}
}

// 4. DÉTECTION DES OVERRIDES (stratégies forcées par un header ou un paramètre d'URL)

function normalizeStrategy(value) {
	if (typeof value !== "string") {
		return;
	}

	const strategy = value.trim().toLowerCase();

	if (STRATEGIES.has(strategy)) {
		return strategy;
	}
}

// Retourne la stratégie explicitement demandée
function getForcedStrategy(request, url) {
	const headerStrategy = normalizeStrategy(
		request.headers.get(STRATEGY_HEADER),
	);

	if (headerStrategy) {
		return headerStrategy;
	}

	const urlParamStrategy = url.searchParams.get(STRATEGY_PARAM);

	return normalizeStrategy(urlParamStrategy);
}

// Retire le paramètre de contrôle de l'URL avant d'effectuer la requête pour éviter de polluer le cache avec des URLs différentes pour la même ressource.
function getRequestWithoutStrategyParam(request) {
	const url = new URL(request.url);

	if (!url.searchParams.has(STRATEGY_PARAM)) {
		return request;
	}

	url.searchParams.delete(STRATEGY_PARAM);

	const init = {
		method: request.method,
		headers: request.headers,
		mode: request.mode,
		credentials: request.credentials,
		redirect: request.redirect,
	};

	return new Request(url.href, init);
}

// 5. STRATÉGIES DE CACHE

// Cache-first : on sert le cache si dispo, sinon on va chercher le réseau et on met à jour le cache.
async function cacheFirst(request) {
	const cache = await caches.open(CORE_CACHE);
	const cached =
		(await cache.match(request)) || (await matchOpaqueCache(request));
	if (cached) {
		return cached;
	}
	try {
		return await fetchAndCache(request, CORE_CACHE);
	} catch {
		// Si la requête est de type "navigate" (HTML), on retombe sur la page offline si le réseau est indisponible.
		if (isNavigationRequest(request)) {
			return navigationFallback(request);
		}
		return new Response("Hors-ligne et aucune ressource en cache.", {
			status: 503,
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
			},
		});
	}
}

// Stale-while-revalidate : on sert le cache si dispo, et on rafraîchit en tâche de fond pour la prochaine fois.
async function staleWhileRevalidate(event, request) {
	const cache = await caches.open(STATIC_ASSETS_CACHE);
	const cached =
		(await cache.match(request)) || (await matchOpaqueCache(request));

	const networkPromise = fetchAndCache(request, STATIC_ASSETS_CACHE, { event });

	if (cached) {
		// oxlint-disable-next-line promise/prefer-await-to-then
		event.waitUntil(
			// oxlint-disable-next-line promise/prefer-await-to-then
			networkPromise.catch(() => {
				// On ignore les erreurs réseau pour ne pas casser la navigation si le réseau est indisponible.
			}),
		);
		return cached;
	}

	try {
		// Pas de cache : on doit attendre le réseau.
		const networkResponse = await networkPromise;
		return networkResponse;
	} catch {
		// Ni cache ni réseau disponibles.
		return Response.json(
			{
				error: "offline",
				message: "Aucune ressource disponible hors-ligne.",
			},
			{
				status: 503,
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
			},
		);
	}
}

// Fallback utilisé quand la navigation échoue complètement au réseau.
async function navigationFallback(request) {
	// On regarde d'abord si cette page a déjà été visitée et mise en cache dynamiquement.
	const dynamicCache = await caches.open(DYNAMIC_CACHE);
	const cachedPage = await dynamicCache.match(request);
	if (cachedPage) {
		return cachedPage;
	}

	// On regarde si la requête correspond directement à une URL précachée (ex: "/" ou "/index.html").
	const coreCache = await caches.open(CORE_CACHE);
	const corePage = await coreCache.match(request);
	if (corePage) {
		return corePage;
	}

	// On revient sur la page d'accueil de l'application ("/" ou "/index.html") si elle a été précachée correctement
	const appShell =
		(await coreCache.match("/index.html")) || (await coreCache.match("/"));
	if (appShell) {
		return appShell;
	}

	// En dernier recours, on affiche la page offline générique.
	const offlinePage = await coreCache.match(OFFLINE_URL);
	if (offlinePage) {
		return offlinePage;
	}

	return new Response("Hors-ligne et aucune page en cache.", {
		status: 503,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}

// Network-first pour les navigations : on tente le réseau, sinon on retombe sur le cache, puis sur une page offline (avec un timeout pour ne pas bloquer trop longtemps si le réseau est lent).
async function networkFirstNavigation(event, request) {
	try {
		const response = await fetchAndCache(request, DYNAMIC_CACHE, {
			event,
			timeoutMs: DEFAULT_TIMEOUT_MS,
		});
		return response;
	} catch {
		// Réseau totalement coupé, timeout écoulé, ou preload+fetch tous les deux en échec.
		return navigationFallback(request);
	}
}

// Par défaut (hors navigation/asset/donnée) : réseau direct, repli sur le cache en cas d'échec.
async function networkFirst(event, request, cacheName = DYNAMIC_CACHE) {
	const cache = await caches.open(cacheName);

	try {
		const response = await fetchAndCache(request, cacheName, { event });
		return response;
	} catch {
		// En cas d'échec réseau, on essaie le cache
		const cachedResponse =
			(await cache.match(request)) ||
			(await matchDataCache(request)) ||
			(await matchOpaqueCache(request));

		if (cachedResponse) {
			return cachedResponse;
		}

		return new Response("Hors-ligne et aucune ressource en cache.", {
			status: 503,
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
			},
		});
	}
}

// 6. ROUTAGE DES REQUÊTES

// Applique la stratégie explicitement demandée
function routeForcedStrategy(event, request, strategy) {
	switch (strategy) {
		case "no-cache": {
			return fetch(request);
		}

		case "cache-first": {
			return cacheFirst(request);
		}

		case "stale-while-revalidate": {
			return staleWhileRevalidate(event, request);
		}

		case "network-first": {
			return networkFirst(event, request, DYNAMIC_CACHE);
		}

		default: {
			throw new Error(`Unknown cache strategy: ${strategy}`);
		}
	}
}

// Sélectionne la stratégie à appliquer selon le type de requête.
function routeRequest(event, request, url) {
	if (isRangeRequest(request)) {
		return fetch(request);
	}

	if (isPrecachedRequest(request)) {
		return cacheFirst(request);
	}

	if (isNavigationRequest(request)) {
		return networkFirstNavigation(event, request);
	}

	const forcedStrategy = getForcedStrategy(request, url);

	if (forcedStrategy) {
		const requestWithoutStrategyParam = getRequestWithoutStrategyParam(request);

		return routeForcedStrategy(
			event,
			requestWithoutStrategyParam,
			forcedStrategy,
		);
	}

	if (isStaticAsset(url)) {
		return staleWhileRevalidate(event, request);
	}

	if (isDataRequest(url)) {
		return networkFirst(event, request, DATA_CACHE);
	}

	return networkFirst(event, request, DYNAMIC_CACHE);
}

// 7. INSTALLATION ET ACTIVATION DU SERVICE WORKER

globalThis.addEventListener("install", (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CORE_CACHE);
			// Lors de l'installation du service worker, on met en cache les fichiers essentiels pour que l'application fonctionne hors-ligne.
			// Afin d'éviter de servir des fichiers obsolètes, on force le rechargement depuis le réseau (cache: "reload") pour ces fichiers.
			const criticalRequests = CRITICAL_PRECACHE_URLS.map(
				(url) => new Request(url, { cache: "reload" }),
			);
			await cache.addAll(criticalRequests);
			await precacheNonCriticalUrls(cache, NON_CRITICAL_PRECACHE_URLS);
		})(),
	);
	if (UPDATE_SERVICE_WORKER_WITH_POST_MESSAGE) {
		globalThis.addEventListener("message", (messageEvent) => {
			if (messageEvent.data && messageEvent.data.type === "SKIP_WAITING") {
				globalThis.skipWaiting();
			}
		});
	} else {
		globalThis.skipWaiting();
	}
});

globalThis.addEventListener("activate", (event) => {
	event.waitUntil(
		(async () => {
			// Supprime les caches d'une version précédente du service worker.
			const cacheNames = await caches.keys();
			await Promise.all(
				cacheNames
					.filter(
						(name) =>
							name.startsWith(`${APP_NAME}-`) && !CURRENT_CACHES.has(name),
					)
					.map((name) => caches.delete(name)),
			);
			// Active le préchargement de la navigation pour améliorer les performances des navigations hors-ligne.
			if (globalThis.registration.navigationPreload) {
				try {
					await globalThis.registration.navigationPreload.enable();
				} catch (error) {
					console.error(
						"Erreur lors de l'activation du préchargement de la navigation :",
						error,
					);
				}
			}
			// Prend le contrôle des clients déjà ouverts sans attendre un reload.
			await globalThis.clients.claim();
		})(),
	);
});

// 8. INTERCEPTION DES REQUÊTES (fetch)

globalThis.addEventListener("fetch", (event) => {
	const { request } = event;
	// On ne gère que le GET (les autres méthodes passent au réseau direct :
	// pas de sens à mettre en cache un POST/PUT/DELETE).
	if (request.method !== "GET") {
		return;
	}
	const url = new URL(request.url);
	event.respondWith(routeRequest(event, request, url));
});
