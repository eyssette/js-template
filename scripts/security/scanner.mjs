// oxlint-disable import/no-nodejs-modules require-unicode-regexp no-console unicorn/no-process-exit
// Scanner de secrets pour détecter les informations sensibles dans le code source.
// Scanne le fichier donné en argument et affiche les secrets détectés.

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";

const showMode = process.env.MODE && process.env.MODE.toLowerCase() === "show";

const excludedFiles = new Set([
	"scripts/security/ignored-errors.json",
	"scripts/security/scanner.mjs",
	"scripts/bump/CHANGELOG.md.j2",
	"tests/e2e/server.mjs",
	"app/js/lib/paraglide/runtime.js",
]);

const excludedDirectories = new Set([
	"packages/create-js-template",
	"i18n/helpers",
	"i18n/project.inlang/cache",
	".git",
]);

// Chemin du fichier listant les erreurs autorisées à ne pas renvoyer de code d'erreur
const IGNORED_ERRORS_FILE = path.join(
	process.cwd(),
	"scripts/security/ignored-errors.json",
);

let ignoredErrorsWarningShown = false;

// Charge la liste des erreurs ignorées depuis le fichier dédié
function loadIgnoredErrors() {
	if (!fs.existsSync(IGNORED_ERRORS_FILE)) {
		return [];
	}

	try {
		const content = fs.readFileSync(IGNORED_ERRORS_FILE, "utf8");
		const data = JSON.parse(content) || {};
		return Array.isArray(data.errors) ? data.errors : [];
	} catch {
		if (!ignoredErrorsWarningShown) {
			console.error(
				`\n➡️  Fichier de configuration des erreurs ignorées vide ou introuvable\n`,
			);
			ignoredErrorsWarningShown = true;
		}
		return [];
	}
}

// Ajoute une erreur à la liste des erreurs ignorées
function addIgnoredError({ file, rule, label, line, match }) {
	const ignoredErrors = loadIgnoredErrors();
	const alreadyIgnored = ignoredErrors.some(
		(entry) =>
			entry.file === file &&
			entry.rule === rule &&
			entry.label === label &&
			entry.line === line &&
			entry.match === match,
	);

	if (alreadyIgnored) {
		return;
	}

	ignoredErrors.push({ file, rule, label, line, match });

	const data = { errors: ignoredErrors };
	fs.writeFileSync(
		IGNORED_ERRORS_FILE,
		`${JSON.stringify(data, undefined, "\t")}\n`,
		"utf8",
	);
}

// Vérifie si une erreur est présente dans la liste des erreurs ignorées
function isIgnoredError({ file, rule, label, line, match }) {
	return loadIgnoredErrors().some(
		(entry) =>
			entry.file === file &&
			entry.rule === rule &&
			entry.label === label &&
			entry.line === line &&
			entry.match === match,
	);
}

// Charge les motifs d'exclusion depuis le fichier .gitignore (chargement dynamique)
function loadGitignorePatterns() {
	const gitignorePath = path.join(process.cwd(), ".gitignore");
	if (!fs.existsSync(gitignorePath)) {
		return [];
	}

	const content = fs.readFileSync(gitignorePath, "utf8");
	return content
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line && !line.startsWith("#") && !line.startsWith("!"));
}

const gitignorePatterns = loadGitignorePatterns();

// Vérifie si un chemin correspond à un motif d'exclusion du .gitignore
function isGitignored(filePath) {
	const normalized = filePath.replaceAll("\\", "/");

	return gitignorePatterns.some((pattern) => {
		const isDirectoryPattern = pattern.endsWith("/");
		const basePattern = isDirectoryPattern ? pattern.slice(0, -1) : pattern;

		// Motif de dossier sans chemin (ex: "node_modules/", "dist/") :
		// s'applique à n'importe quel niveau de l'arborescence
		if (isDirectoryPattern && !basePattern.includes("/")) {
			return (
				normalized === basePattern ||
				normalized.includes(`/${basePattern}/`) ||
				normalized.endsWith(`/${basePattern}`)
			);
		}

		// Motif de dossier avec chemin (ex: "tests/e2e/output/") :
		// relatif à la racine
		if (isDirectoryPattern) {
			return (
				normalized === basePattern || normalized.startsWith(`${basePattern}/`)
			);
		}

		// Motif simple sans chemin (ex: ".env") : correspond au nom de base
		if (!pattern.includes("/")) {
			return path.basename(normalized) === pattern;
		}

		// Motif avec chemin (ex: "app/js/lib/paraglide/runtime.js") :
		// relatif à la racine
		return normalized === pattern || normalized.endsWith(`/${pattern}`);
	});
}

// Source : https://forge.apps.education.fr/rouxsimon/albert-vscode/-/blob/main/src/extension/participants/gardeFouParticipant.ts?ref_type=heads
const LOCAL_RULES = [
	// RGPD - CDN / ressources externes US
	{
		regex: /https?:\/\/fonts\.googleapis\.com/gi,
		rule: "rgpd",
		label: "Google Fonts - violation RGPD",
	},
	{
		regex: /https?:\/\/fonts\.gstatic\.com/gi,
		rule: "rgpd",
		label: "Google Fonts (gstatic) - violation RGPD",
	},
	{
		regex: /https?:\/\/cdnjs\.cloudflare\.com/gi,
		rule: "rgpd",
		label: "CDN cdnjs (US) - violation RGPD",
	},
	{
		regex: /https?:\/\/cdn\.jsdelivr\.net/gi,
		rule: "rgpd",
		label: "CDN jsDelivr (US) - violation RGPD",
	},
	{
		regex: /https?:\/\/unpkg\.com/gi,
		rule: "rgpd",
		label: "CDN unpkg (US) - violation RGPD",
	},
	{
		regex: /googletagmanager\.com|google-analytics\.com/gi,
		rule: "rgpd",
		label: "Google Analytics / Tag Manager - violation RGPD",
	},
	{
		regex: /google\.com\/recaptcha/gi,
		rule: "rgpd",
		label: "reCAPTCHA - violation RGPD",
	},
	{
		regex: /connect\.facebook\.net|facebook\.com\/tr/gi,
		rule: "rgpd",
		label: "Facebook Pixel / SDK - violation RGPD",
	},
	{
		regex: /https?:\/\/cdn\.tailwindcss\.com/gi,
		rule: "rgpd",
		label: "CDN Tailwind (US) - violation RGPD",
	},
	// RGPD - Maps, vidéos, widgets sociaux, analytics, support
	{
		regex: /maps\.googleapis\.com|maps\.google\.com/gi,
		rule: "rgpd",
		label: "Google Maps - violation RGPD",
	},
	{
		regex: /youtube\.com\/embed|youtu\.be/gi,
		rule: "rgpd",
		label: "YouTube embed (préférer youtube-nocookie) - violation RGPD",
	},
	{
		regex: /player\.vimeo\.com|vimeo\.com\/api/gi,
		rule: "rgpd",
		label: "Vimeo - violation RGPD",
	},
	{
		regex: /platform\.twitter\.com|x\.com\/widgets/gi,
		rule: "rgpd",
		label: "Twitter/X widgets - violation RGPD",
	},
	{
		regex: /snap\.licdn\.com|platform\.linkedin\.com/gi,
		rule: "rgpd",
		label: "LinkedIn Insight - violation RGPD",
	},
	{
		regex: /static\.hotjar\.com|script\.hotjar\.com/gi,
		rule: "rgpd",
		label: "Hotjar - violation RGPD",
	},
	{
		regex: /clarity\.ms/gi,
		rule: "rgpd",
		label: "Microsoft Clarity - violation RGPD",
	},
	{
		regex: /cdn\.segment\.com|api\.segment\.io/gi,
		rule: "rgpd",
		label: "Segment - violation RGPD",
	},
	{
		regex: /cdn\.mxpnl\.com|api\.mixpanel\.com/gi,
		rule: "rgpd",
		label: "Mixpanel - violation RGPD",
	},
	{
		regex: /widget\.intercom\.io|js\.intercomcdn\.com/gi,
		rule: "rgpd",
		label: "Intercom - violation RGPD",
	},
	{
		regex: /js\.stripe\.com/gi,
		rule: "rgpd",
		label: "Stripe.js (US) - violation RGPD",
	},
	{
		regex: /doubleclick\.net|googlesyndication\.com|googleadservices\.com/gi,
		rule: "rgpd",
		label: "Google Ads / DoubleClick - violation RGPD",
	},
	{
		regex: /analytics\.tiktok\.com|tiktok\.com\/i18n\/pixel/gi,
		rule: "rgpd",
		label: "TikTok Pixel - violation RGPD",
	},
	{
		regex: /static\.cloudflareinsights\.com/gi,
		rule: "rgpd",
		label: "Cloudflare Web Analytics - violation RGPD",
	},
	{
		regex:
			/code\.jquery\.com|maxcdn\.bootstrapcdn\.com|stackpath\.bootstrapcdn\.com/gi,
		rule: "rgpd",
		label: "CDN jQuery/Bootstrap (US) - violation RGPD",
	},
	{
		regex: /\.amazonaws\.com/gi,
		rule: "rgpd",
		label: "AWS (US) - violation RGPD potentielle",
	},
	// RGPD - analytics, A/B testing, CRM, chat, CDN
	{
		regex: /matomo\.cloud|cdn\.matomo\.cloud/gi,
		rule: "rgpd",
		label: "Matomo Cloud (vérifier hébergement) - risque RGPD",
	},
	{
		regex: /plausible\.io/gi,
		rule: "rgpd",
		label: "Plausible (cloud) - risque RGPD",
	},
	{
		regex: /cdn\.amplitude\.com|api\.amplitude\.com|api2\.amplitude\.com/gi,
		rule: "rgpd",
		label: "Amplitude - violation RGPD",
	},
	{
		regex: /cdn\.heapanalytics\.com|heapanalytics\.com/gi,
		rule: "rgpd",
		label: "Heap Analytics - violation RGPD",
	},
	{
		regex: /cdn\.optimizely\.com/gi,
		rule: "rgpd",
		label: "Optimizely - violation RGPD",
	},
	{
		regex: /widget\.crisp\.chat|client\.crisp\.chat/gi,
		rule: "rgpd",
		label: "Crisp Chat - risque RGPD",
	},
	{
		regex: /embed\.tawk\.to/gi,
		rule: "rgpd",
		label: "Tawk.to - violation RGPD",
	},
	{
		regex: /js\.driftt\.com|driftt\.com/gi,
		rule: "rgpd",
		label: "Drift - violation RGPD",
	},
	{
		regex: /js\.hs-scripts\.com|js\.hsforms\.net|track\.hubspot\.com/gi,
		rule: "rgpd",
		label: "HubSpot - violation RGPD",
	},
	{
		regex: /munchkin\.marketo\.net/gi,
		rule: "rgpd",
		label: "Marketo - violation RGPD",
	},
	{
		regex: /js\.pardot\.com|pi\.pardot\.com/gi,
		rule: "rgpd",
		label: "Pardot (Salesforce) - violation RGPD",
	},
	{
		regex: /static\.zdassets\.com|zendesk\.com\/embeddable/gi,
		rule: "rgpd",
		label: "Zendesk Widget - violation RGPD",
	},
	{
		regex: /www\.gstatic\.com|ssl\.gstatic\.com/gi,
		rule: "rgpd",
		label: "Google gstatic - risque RGPD",
	},
	{
		regex: /ajax\.googleapis\.com/gi,
		rule: "rgpd",
		label: "Google Hosted Libraries - violation RGPD",
	},
	{
		regex: /use\.typekit\.net|use\.fontawesome\.com|kit\.fontawesome\.com/gi,
		rule: "rgpd",
		label: "Adobe Fonts / FontAwesome CDN (US) - risque RGPD",
	},
	{
		regex: /s\.pinimg\.com|ct\.pinterest\.com/gi,
		rule: "rgpd",
		label: "Pinterest Tag - violation RGPD",
	},
	{
		regex: /sc-static\.net|tr\.snapchat\.com/gi,
		rule: "rgpd",
		label: "Snapchat Pixel - violation RGPD",
	},
	{
		regex: /analytics\.twitter\.com|static\.ads-twitter\.com/gi,
		rule: "rgpd",
		label: "Twitter Ads - violation RGPD",
	},
	{
		regex: /bat\.bing\.com/gi,
		rule: "rgpd",
		label: "Bing Ads (UET) - violation RGPD",
	},
	{
		regex: /script\.crazyegg\.com/gi,
		rule: "rgpd",
		label: "Crazy Egg - violation RGPD",
	},
	{
		regex: /cdn\.mouseflow\.com/gi,
		rule: "rgpd",
		label: "Mouseflow - violation RGPD",
	},
	{
		regex: /fullstory\.com|fs\.js/gi,
		rule: "rgpd",
		label: "FullStory - violation RGPD",
	},
	{
		regex: /cdn\.usefathom\.com/gi,
		rule: "rgpd",
		label: "Fathom Analytics - risque RGPD",
	},
	{
		regex: /cdn\.cookielaw\.org|onetrust\.com/gi,
		rule: "rgpd",
		label: "OneTrust (vérifier conf.) - info RGPD",
	},
	{
		regex: /widget\.trustpilot\.com/gi,
		rule: "rgpd",
		label: "Trustpilot Widget - risque RGPD",
	},
	{
		regex: /platform-api\.sharethis\.com|addthis\.com/gi,
		rule: "rgpd",
		label: "ShareThis / AddThis - violation RGPD",
	},
	// Sécurité - secrets exposés
	{
		regex: /(?:api[_-]?key|apikey|API_KEY)\s*[=:]\s*['"`][^'"`]{8,}['"`]/gi,
		rule: "security",
		label: "Clé API en clair",
	},
	{
		regex: /sk-[a-zA-Z0-9]{20,}/g,
		rule: "security",
		label: "Clé OpenAI en clair",
	},
	{
		regex: /AIza[0-9A-Za-z\-_]{20,}/g,
		rule: "security",
		label: "Clé Google API en clair",
	},
	{
		regex: /(?:password|passwd|pwd)\s*[=:]\s*['"`][^'"`]+['"`]/gi,
		rule: "security",
		label: "Mot de passe en clair",
	},
	{
		regex: /(?:secret|token|jwt)\s*[=:]\s*['"`][^'"`]{8,}['"`]/gi,
		rule: "security",
		label: "Secret / token en clair",
	},
	{
		regex: /sk_live_[0-9a-zA-Z]{20,}/g,
		rule: "security",
		label: "Clé Stripe live en clair",
	},
	{
		regex: /AWS_ACCESS_KEY_ID|AWS_SECRET_ACCESS_KEY/gi,
		rule: "security",
		label: "Clé AWS en clair",
	},
	// Sécurité - tokens, clés, connexions, certificats
	{
		regex: /AKIA[0-9A-Z]{16}/g,
		rule: "security",
		label: "AWS Access Key ID en clair",
	},
	{
		regex: /gh[pousr]_[A-Za-z0-9]{36,}/g,
		rule: "security",
		label: "Token GitHub en clair",
	},
	{
		regex: /xox[baprs]-[0-9A-Za-z-]{10,}/g,
		rule: "security",
		label: "Token Slack en clair",
	},
	{
		regex: /SG\.[A-Za-z0-9_-]{16,}\.[A-Za-z0-9_-]{16,}/g,
		rule: "security",
		label: "Clé SendGrid en clair",
	},
	{
		regex: /sk_test_[0-9a-zA-Z]{20,}/g,
		rule: "security",
		label: "Clé Stripe test en clair",
	},
	{
		regex: /rk_live_[0-9a-zA-Z]{20,}/g,
		rule: "security",
		label: "Clé restreinte Stripe live en clair",
	},
	{
		regex: /AC[a-z0-9]{32}/g,
		rule: "security",
		label: "Twilio Account SID en clair",
	},
	{
		regex: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g,
		rule: "security",
		label: "Clé privée en clair",
	},
	{
		regex:
			/(?:mongodb(?:\+srv)?|postgres(?:ql)?|mysql|redis):\/\/[^\s'"]*:[^\s'"@]+@/gi,
		rule: "security",
		label: "Chaîne de connexion BDD avec identifiants",
	},
	{
		regex: /Bearer\s+[A-Za-z0-9\-._~+/]{20,}/g,
		rule: "security",
		label: "Bearer token en clair",
	},
	{
		regex: /glpat-[0-9A-Za-z\-_]{20,}/g,
		rule: "security",
		label: "Token GitLab en clair",
	},
	{
		regex: /npm_[A-Za-z0-9]{36}/g,
		rule: "security",
		label: "Token npm en clair",
	},
	// Sécurité - clés cloud, paiement, messagerie, signature
	{
		regex: /ya29\.[0-9A-Za-z\-_]+/g,
		rule: "security",
		label: "OAuth Google Access Token en clair",
	},
	{
		regex: /ghs_[A-Za-z0-9]{36}/g,
		rule: "security",
		label: "Token GitHub App en clair",
	},
	{
		regex: /dckr_pat_[A-Za-z0-9\-_]{20,}/g,
		rule: "security",
		label: "Token Docker Hub en clair",
	},
	{
		regex: /shpat_[a-fA-F0-9]{32}/g,
		rule: "security",
		label: "Token Shopify en clair",
	},
	{
		regex: /sq0(?:atp|csp)-[0-9A-Za-z\-_]{22,}/g,
		rule: "security",
		label: "Token Square en clair",
	},
	{
		regex: /access_token\$production\$[0-9a-z]{16}\$[0-9a-f]{32}/g,
		rule: "security",
		label: "Token Braintree en clair",
	},
	{
		regex: /key-[0-9a-zA-Z]{32}/g,
		rule: "security",
		label: "Clé Mailgun en clair",
	},
	{
		regex: /xkeysib-[a-f0-9]{64}-[A-Za-z0-9]{16}/g,
		rule: "security",
		label: "Clé Brevo/Sendinblue en clair",
	},
	{
		regex: /SK[a-f0-9]{32}/g,
		rule: "security",
		label: "Twilio API Key SID en clair",
	},
	{
		regex: /(?:r|p)k_live_[0-9a-zA-Z]{24,}/g,
		rule: "security",
		label: "Clé Stripe live en clair",
	},
	{
		regex: /[0-9a-f]{32}-us[0-9]{1,2}/g,
		rule: "security",
		label: "Clé Mailchimp en clair",
	},
	{
		regex: /EAACEdEose0cBA[0-9A-Za-z]+/g,
		rule: "security",
		label: "Token Facebook en clair",
	},
	{
		regex: /1\/\/[0-9A-Za-z\-_]{30,}/g,
		rule: "security",
		label: "Refresh Token Google en clair",
	},
	{
		regex: /-----BEGIN PGP PRIVATE KEY BLOCK-----/g,
		rule: "security",
		label: "Clé privée PGP en clair",
	},
	{
		regex: /(?:client[_-]?secret)\s*[=:]\s*['"`][^'"`]{8,}['"`]/gi,
		rule: "security",
		label: "Client secret OAuth en clair",
	},
	{
		regex: /(?:private[_-]?key)\s*[=:]\s*['"`][^'"`]{16,}['"`]/gi,
		rule: "security",
		label: "Clé privée en variable",
	},
	{
		regex:
			/(?:auth[_-]?token|access[_-]?token)\s*[=:]\s*['"`][^'"`]{16,}['"`]/gi,
		rule: "security",
		label: "Token d'accès en clair",
	},
	{
		regex:
			/(?:db[_-]?pass(?:word)?|database[_-]?password)\s*[=:]\s*['"`][^'"`]+['"`]/gi,
		rule: "security",
		label: "Mot de passe BDD en clair",
	},
	{
		regex: /basic\s+[A-Za-z0-9+/=]{16,}/gi,
		rule: "security",
		label: "Authentification Basic en clair",
	},
	{
		regex: /https?:\/\/[^\s'"]*:[^\s'"@]+@[^\s'"]+/gi,
		rule: "security",
		label: "Identifiants dans une URL",
	},
	{
		regex: /hooks\.slack\.com\/services\/T[0-9A-Z]+\/B[0-9A-Z]+\/[0-9A-Za-z]+/g,
		rule: "security",
		label: "Webhook Slack en clair",
	},
	{
		regex: /discord(?:app)?\.com\/api\/webhooks\/[0-9]+\/[A-Za-z0-9\-_]+/g,
		rule: "security",
		label: "Webhook Discord en clair",
	},
	{
		regex: /ntn_[0-9A-Za-z]{40,}|secret_[0-9A-Za-z]{40,}/g,
		rule: "security",
		label: "Token Notion en clair",
	},
	{
		regex: /(?:DefaultEndpointsProtocol|AccountKey)=[^;'"\s]+/g,
		rule: "security",
		label: "Chaîne de connexion Azure Storage en clair",
	},
	{
		regex: /figd_[A-Za-z0-9\-_]{40,}/g,
		rule: "security",
		label: "Token Figma en clair",
	},
	// RGPD - fonts, captcha alternatifs, e-commerce, vidéo, cartes
	{
		regex: /api\.mapbox\.com|api\.tiles\.mapbox\.com/gi,
		rule: "rgpd",
		label: "Mapbox (US) - risque RGPD",
	},
	{
		regex: /maps\.googleapis\.com\/maps\/api\/staticmap/gi,
		rule: "rgpd",
		label: "Google Static Maps - violation RGPD",
	},
	{
		regex: /js\.hcaptcha\.com|hcaptcha\.com\/1/gi,
		rule: "rgpd",
		label: "hCaptcha - risque RGPD",
	},
	{
		regex: /challenges\.cloudflare\.com\/turnstile/gi,
		rule: "rgpd",
		label: "Cloudflare Turnstile - risque RGPD",
	},
	{
		regex: /wistia\.com|fast\.wistia\.(?:net|com)/gi,
		rule: "rgpd",
		label: "Wistia - violation RGPD",
	},
	{
		regex: /content\.jwplatform\.com|cdn\.jwplayer\.com/gi,
		rule: "rgpd",
		label: "JW Player - violation RGPD",
	},
	{
		regex: /dailymotion\.com\/embed/gi,
		rule: "rgpd",
		label: "Dailymotion embed - risque RGPD",
	},
	{
		regex: /w\.soundcloud\.com\/player/gi,
		rule: "rgpd",
		label: "SoundCloud embed - risque RGPD",
	},
	{
		regex: /open\.spotify\.com\/embed/gi,
		rule: "rgpd",
		label: "Spotify embed - risque RGPD",
	},
	{
		regex: /platform\.instagram\.com|instagram\.com\/embed/gi,
		rule: "rgpd",
		label: "Instagram embed - violation RGPD",
	},
	{
		regex: /assets\.calendly\.com|calendly\.com\/assets/gi,
		rule: "rgpd",
		label: "Calendly - violation RGPD",
	},
	{
		regex: /js\.chargebee\.com/gi,
		rule: "rgpd",
		label: "Chargebee - risque RGPD",
	},
	{
		regex: /checkout\.paypal\.com|www\.paypalobjects\.com/gi,
		rule: "rgpd",
		label: "PayPal - risque RGPD",
	},
	{
		regex: /js\.braintreegateway\.com/gi,
		rule: "rgpd",
		label: "Braintree - violation RGPD",
	},
	{
		regex: /pay\.google\.com|gpay/gi,
		rule: "rgpd",
		label: "Google Pay - risque RGPD",
	},
	{
		regex: /static\.klaviyo\.com|a\.klaviyo\.com/gi,
		rule: "rgpd",
		label: "Klaviyo - violation RGPD",
	},
	{
		regex: /cdn\.taboola\.com/gi,
		rule: "rgpd",
		label: "Taboola - violation RGPD",
	},
	{
		regex: /cdn\.outbrain\.com/gi,
		rule: "rgpd",
		label: "Outbrain - violation RGPD",
	},
	{
		regex: /sentry\.io|browser\.sentry-cdn\.com/gi,
		rule: "rgpd",
		label: "Sentry (vérifier conf. PII) - risque RGPD",
	},
	{
		regex: /js\.sentry-cdn\.com|o[0-9]+\.ingest\.sentry\.io/gi,
		rule: "rgpd",
		label: "Sentry ingest - risque RGPD",
	},
	{
		regex: /cdn\.logrocket\.io|cdn\.lr-ingest\.io/gi,
		rule: "rgpd",
		label: "LogRocket - violation RGPD",
	},
	{
		regex: /js\.datadog-browser-agent|browser-intake-datadoghq\.com/gi,
		rule: "rgpd",
		label: "Datadog RUM - risque RGPD",
	},
	{
		regex: /widget\.manychat\.com/gi,
		rule: "rgpd",
		label: "ManyChat - violation RGPD",
	},
	{
		regex: /api\.gravatar\.com|gravatar\.com\/avatar/gi,
		rule: "rgpd",
		label: "Gravatar (Automattic US) - risque RGPD",
	},
	{
		regex: /s\.w\.org|wp\.com|stats\.wp\.com/gi,
		rule: "rgpd",
		label: "WordPress.com / Jetpack - risque RGPD",
	},
	{
		regex: /vitals\.vercel-insights\.com|va\.vercel-scripts\.com/gi,
		rule: "rgpd",
		label: "Vercel Analytics - risque RGPD",
	},
	{
		regex: /unsplash\.com|images\.unsplash\.com/gi,
		rule: "rgpd",
		label: "Unsplash (US) - risque RGPD mineur",
	},
	{
		regex: /i\.imgur\.com|imgur\.com/gi,
		rule: "rgpd",
		label: "Imgur (US) - risque RGPD mineur",
	},
	// Sécurité - clés de services
	{
		regex: /sntrys_[A-Za-z0-9_=]{40,}/g,
		rule: "security",
		label: "Token Sentry en clair",
	},
	{
		regex: /dop_v1_[a-f0-9]{64}/g,
		rule: "security",
		label: "Token DigitalOcean en clair",
	},
	{
		regex: /hvs\.[A-Za-z0-9]{20,}/g,
		rule: "security",
		label: "Token HashiCorp Vault en clair",
	},
	{
		regex: /pscale_(?:pw|tkn)_[A-Za-z0-9\-_.]{20,}/g,
		rule: "security",
		label: "Token PlanetScale en clair",
	},
	{
		regex: /sbp_[a-f0-9]{40}/g,
		rule: "security",
		label: "Token Supabase en clair",
	},
	{
		regex: /flwSECK_TEST|FLWSECK-[a-f0-9]{12}/gi,
		rule: "security",
		label: "Clé Flutterwave en clair",
	},
	{
		regex: /sk_[a-z]+_[A-Za-z0-9]{20,}/g,
		rule: "security",
		label: "Clé secrète générique (sk_) en clair",
	},
	{
		regex: /lin_api_[A-Za-z0-9]{40,}/g,
		rule: "security",
		label: "Token Linear en clair",
	},
	{
		regex: /sk-ant-[A-Za-z0-9\-_]{20,}/g,
		rule: "security",
		label: "Clé API Anthropic en clair",
	},
	{
		regex: /AIzaSy[A-Za-z0-9\-_]{33}/g,
		rule: "security",
		label: "Clé Google API (format strict) en clair",
	},
	{
		regex: /firebaseio\.com|firebaseapp\.com/gi,
		rule: "security",
		label: "Endpoint Firebase exposé (vérifier règles)",
	},
	// Sécurité - code potentiellement dangereux (XSS / injection)
	{
		regex: /\beval\s*\(/g,
		rule: "security",
		label: "Usage de eval() - risque injection",
	},
	{
		regex: /new\s+Function\s*\(/g,
		rule: "security",
		label: "new Function() - risque injection",
	},
	{
		regex: /\.innerHTML\s*\+?=/g,
		rule: "security",
		label: "Affectation innerHTML - risque XSS",
	},
	{
		regex: /document\.write\s*\(/g,
		rule: "security",
		label: "document.write() - risque XSS",
	},
	{
		regex: /dangerouslySetInnerHTML/g,
		rule: "security",
		label: "dangerouslySetInnerHTML (React) - risque XSS",
	},
	{
		regex: /v-html\s*=/g,
		rule: "security",
		label: "v-html (Vue) - risque XSS",
	},
	{
		regex: /setTimeout\s*\(\s*['"`]/g,
		rule: "security",
		label: "setTimeout avec string - risque eval implicite",
	},
	{
		regex: /\bexec(?:Sync)?\s*\(|child_process/g,
		rule: "security",
		label: "Exécution de commande système - risque RCE",
	},
	{
		regex:
			/(?:NODE_TLS_REJECT_UNAUTHORIZED|rejectUnauthorized)\s*[=:]\s*(?:['"`]?0['"`]?|false)/gi,
		rule: "security",
		label: "Vérification TLS désactivée",
	},
	{
		regex: /Access-Control-Allow-Origin['"`]?\s*[=:,]\s*['"`]\*/gi,
		rule: "security",
		label: "CORS wildcard (*) - risque sécurité",
	},
	{
		regex: /http:\/\/(?!localhost|127\.0\.0\.1|www\.w3\.org)/gi,
		rule: "security",
		label: "Connexion HTTP non chiffrée",
	},
	{
		regex: /md5|sha1\b/gi,
		rule: "security",
		label: "Hash faible (MD5/SHA1) - vérifier usage",
	},
];

function scanFile(filePath) {
	const content = fs.readFileSync(filePath, "utf8");
	const lines = content.split("\n");
	const results = [];

	for (const rule of LOCAL_RULES) {
		const regex = new RegExp(rule.regex.source, rule.regex.flags);
		let match;
		while ((match = regex.exec(content)) !== null) {
			// Calcule le numéro de ligne (1-indexé) de l'occurrence
			const lineNumber = content.slice(0, match.index).split("\n").length;
			const rawLine = lines[lineNumber - 1];
			const lineContent = rawLine === undefined ? "" : rawLine.trim();
			results.push({
				file: filePath,
				rule: rule.rule,
				label: rule.label,
				line: lineNumber,
				match: match[0],
				lineContent,
			});
			// Évite une boucle infinie avec les regex à correspondance vide
			if (match[0] === "") {
				regex.lastIndex += 1;
			}
		}
	}

	return results;
}

function scanDirectory(directoryPath) {
	const results = [];
	const files = fs.readdirSync(directoryPath);

	for (const file of files) {
		const fullPath = path.join(directoryPath, file);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			if (!excludedDirectories.has(fullPath) && !isGitignored(fullPath)) {
				results.push(...scanDirectory(fullPath));
			}
		} else if (
			stat.isFile() &&
			!excludedFiles.has(fullPath) &&
			!isGitignored(fullPath)
		) {
			results.push(...scanFile(fullPath));
		}
	}

	return results;
}

// Exécution du scanner si le script est exécuté directement
if (process.argv.length < 3) {
	console.error("Usage: node scanner.mjs <path>");
	process.exit(1);
}

// oxlint-disable-next-line prefer-destructuring
const targetPath = process.argv[2];
let scanResults = [];

if (fs.existsSync(targetPath)) {
	const stat = fs.statSync(targetPath);
	if (stat.isDirectory()) {
		scanResults = scanDirectory(targetPath);
	} else if (
		stat.isFile() &&
		!excludedFiles.has(targetPath) &&
		!isGitignored(targetPath)
	) {
		scanResults = scanFile(targetPath);
	}
} else {
	console.error(`Le chemin spécifié n'existe pas: ${targetPath}`);
	process.exit(1);
}

// Affiche un avertissement si des erreurs sont ignorées dans le projet
const ignoredErrors = loadIgnoredErrors();
if (ignoredErrors.length > 0) {
	console.log(
		`📌 ${ignoredErrors.length} erreur(s) ignorée(s) dans ce projet.\n`,
	);
}

// Filtre les erreurs déjà autorisées dans le fichier des erreurs ignorées
const remainingResults = scanResults.filter(
	(result) => !isIgnoredError(result),
);

// Affiche une erreur détectée par le scanner
function displayResult(result) {
	console.log(`Fichier: ${result.file}`);
	console.log(`Ligne: ${result.line}`);
	console.log(`Règle: ${result.rule}`);
	console.log(`Label: ${result.label}`);
	console.log(`Occurrence: ${result.match}`);
	if (result.lineContent) {
		console.log(`Contexte: ${result.lineContent}`);
	}
	console.log("-----------------------------");
}

// Affiche une erreur en mode showErrors : label puis lien cliquable vers le fichier
function displayResultShowErrors(result) {
	const absolutePath = path.resolve(result.file);
	console.log(result.label);
	console.log(`  ${absolutePath}:${result.line}`);
	console.log("");
}

// Affichage des résultats
if (remainingResults.length > 0) {
	console.log("Secrets et informations sensibles détectés:\n");

	// En mode showErrors, on passe en mode non-interactif et on affiche
	// uniquement le label de l'erreur et un lien cliquable vers le fichier.
	if (showMode) {
		for (const result of remainingResults) {
			displayResultShowErrors(result);
		}
		process.exit(1);
	}

	// En mode interactif (TTY), on affiche chaque erreur progressivement et on
	// propose de désactiver le scan de cette erreur.
	if (process.stdin.isTTY) {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		// Traite les erreurs une à une, de façon récursive, pour demander à
		// l'utilisateur s'il souhaite désactiver le scan de chacune.
		const processResults = async (results, index, stillFailing) => {
			if (index >= results.length) {
				rl.close();
				if (stillFailing) {
					// Dans le cas où des secrets ou information sensible sont détectés
					// et non ignorés, on renvoie un code d'erreur
					process.exit(1);
				}
				return;
			}

			const result = results[index];
			displayResult(result);
			const answer = await rl.question(
				"Désactiver le scan de cette erreur ? (o/N) ",
			);
			const normalized = answer.trim().toLowerCase();
			if (normalized === "o" || normalized === "oui" || normalized === "y") {
				addIgnoredError(result);
				console.log(`🗄️ Erreur ajoutée à la liste des erreurs ignorées.\n`);
				await processResults(results, index + 1, stillFailing);
			} else {
				await processResults(results, index + 1, true);
			}
		};

		await processResults(remainingResults, 0, false);
	} else {
		// En mode non interactif (CI, pipe), on affiche toutes les erreurs et on
		// renvoie un code d'erreur.
		for (const result of remainingResults) {
			displayResult(result);
		}
		// Dans le cas où des secrets ou information sensible sont détectés, on renvoie un code d'erreur
		process.exit(1);
	}
} else {
	console.log(
		"✅ Aucun secret ou information sensible détecté dans le projet.",
	);
}
