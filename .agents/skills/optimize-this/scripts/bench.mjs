// oxlint-disable no-console
/**
 * Micro-benchmark d'une fonction JavaScript.
 *
 * À utiliser pour mesurer le coût d'une fonction pure ou quasi pure dans le
 * navigateur (console DevTools) ou dans un test temporaire. Le code visé
 * s'exécute dans le navigateur : mesurer dans le navigateur.
 *
 * Usage :
 *   import { bench } from './bench.mjs';
 *   bench('maFonction', () => maFonction(donnees), { iterations: 200, warmup: 20 });
 *
 * Raisonner en médiane et non sur une seule exécution ; itérations assez
 * nombreuses pour dépasser la résolution de l'horloge. Préparer les entrées
 * réalistes AVANT la boucle de mesure (allocations hors mesure).
 *
 * @param {string} label  Libellé affiché dans la sortie.
 * @param {() => unknown} fn  Fonction à mesurer.
 * @param {{ iterations?: number, warmup?: number }} [options]
 *   `iterations` : nombre de mesures (défaut 200) ;
 *   `warmup` : nombre d'appels de chauffe pour laisser le JIT compiler (défaut 20).
 */

const defaultIterations = 200;
const defaultWarmup = 20;
const numberOfDecimals = 3;

export function bench(
	label,
	fn,
	{ iterations = defaultIterations, warmup = defaultWarmup } = {},
) {
	// laisser le JIT compiler
	for (let index = 0; index < warmup; index += 1) {
		fn();
	}
	const times = [];
	for (let index = 0; index < iterations; index += 1) {
		const t0 = performance.now();
		fn();
		times.push(performance.now() - t0);
	}
	// oxlint-disable-next-line id-length
	times.sort((a, b) => a - b);
	// oxlint-disable-next-line no-magic-numbers
	const median = times[Math.floor(times.length / 2)];
	console.log(
		`${label} : médiane ${median.toFixed(numberOfDecimals)} ms sur ${iterations} appels`,
	);
}
