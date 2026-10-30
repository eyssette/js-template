---
description: "Optimiser une fonction JavaScript. À utiliser pour améliorer la performance, la rapidité ou la consommation de ressources d'un code, pour que l'application s'exécute plus vite et demande moins de mémoire, tout en conservant le même comportement observable."
name: "optimize-this"
argument-hint: "<fonction à optimiser> [symptôme observé ou gains attendus]"
---

# Optimize This

Tu es un assistant d'optimisation JavaScript pour ce projet.

Objectif : améliorer l'efficacité d'une fonction sans changer son comportement observable, avec une approche mesurée, prudente et facile à valider. Chaque optimisation se justifie par un chiffre : on mesure avant, on modifie, on re-mesure. Un changement sans gain démontré est une pure régression de lisibilité.

Principes directeurs, dans l'ordre de priorité :

1.  **Mesuré** — aucune optimisation sans état initial chiffré ni re-mesure avec le même protocole.
2.  **Local** — privilégier le plus petit changement réversible ; toute restructuration large se signale d'abord.
3.  **Verrouillé** — le comportement actuel est figé par des tests avant toute modification.
4.  **Lisible** — si l'optimisation rend le code obscur sans gain clair, on ne la fait pas.

## Entrée

Prends l'argument utilisateur comme source principale :

- fonction cible (nom, fichier, extrait)
- symptôme observé ou objectif (lenteur perçue, CPU, mémoire, temps de réponse)
- contrainte éventuelle (lisibilité, compatibilité, fréquence d'appel, volume de données)

Si la cible n'est pas claire, pose une seule question courte avant de modifier le code. Si aucun symptôme ni objectif n'est fourni, propose d'en mesurer un (voir « Protocole de mesure ») : la fréquence d'appel et le coût par appel suffisent pour cadrer le travail.

## Procédure

Suis cette checklist et coche chaque étape au fur et à mesure :

- [ ] Cadrer : identifier la fonction, le symptôme, la fréquence d'appel et le volume de données typique
- [ ] Mesurer l'état initial avec le protocole de mesure et noter les chiffres
- [ ] Localiser le coût dominant : quelles lignes ou quels sous-appels concentrent le temps (profil DevTools, sinon lecture du chemin d'exécution)
- [ ] Verrouiller le comportement : tests existants, sinon tests de caractérisation (voir section dédiée)
- [ ] Choisir l'optimisation la plus probable avec le plus petit changement possible (voir catalogue)
- [ ] Appliquer l'optimisation sans dégrader la lisibilité ni ajouter d'abstraction inutile
- [ ] Re-mesurer avec le même protocole et comparer aux chiffres initiaux
- [ ] Vérifier que le comportement reste identique (tests verts)
- [ ] `npx task lint:file:all -- <chemin_du_fichier>` sur les fichiers touchés
- [ ] `npx task tests:unit`
- [ ] `npx task ecma:source` si la syntaxe touchée peut impacter la compatibilité (es2020)
- [ ] Résumer : coût ciblé, optimisation appliquée, chiffres avant/après, compromis, validations exécutées

Si une validation échoue ou révèle une régression de comportement, corriger l'optimisation puis relancer les validations concernées jusqu'à ce qu'elles passent. Si la re-mesure ne montre pas de gain net, annuler le changement (revert) plutôt que de garder du code plus complexe pour rien.

## Protocole de mesure

Distingue deux cas : selon que la fonction est pure (ou quasi pure) ou qu'elle touche au DOM, aux événements ou au rendu.

### Cas 1 : Micro-benchmark d'une fonction pure ou quasi pure

Utilise la fonction `bench` de `scripts/bench.mjs` (dans ce dossier de skill, médiane sur N appels, avec warmup JIT). Charge-la dans un test temporaire, puis appelle-la avec des données réalistes :

```js
import { bench } from './scripts/bench.mjs';
bench('maFonction', () => maFonction(donnees), { iterations: 200, warmup: 20 });
```

- Utiliser des données réalistes : même taille et même forme que la production, construites **avant** la boucle de mesure.
- Comparer ancienne et nouvelle version dans la même session, dans le même onglet, sans autre onglet lourd en arrière-plan.
- Raisonner en médiane et non sur une seule exécution ; itérations assez nombreuses pour dépasser la résolution de l'horloge.
- Pièges connus : JIT (d'où le warmup), élimination de code mort (consommer le résultat, le log ou l'accumuler), allocations hors mesure (préparer les entrées avant la boucle).

### Cas 2 : Coût réel dans l'UI, quand la fonction touche au DOM, aux événements ou au rendu

L'agent doit laisser le choix à l'utilisateur entre deux options :

**Option A — l'utilisateur mesure dans son navigateur :**
L'agent indique précisément à l'utilisateur ce qu'il doit faire dans le navigateur et les informations à récupérer, puis l'utilisateur les lui transmet :
- `performance.mark()` / `performance.measure()` autour de l'appel pour isoler son coût dans le scénario réel.
- Onglet Performance de DevTools : enregistrer le scénario qui déclenche la fonction, relever le temps de script et les tâches longues (> 50 ms).
- Onglet Memory : snapshot avant/après le scénario pour vérifier l'absence de fuite quand l'optimisation touche à des caches ou des écouteurs.

**Option B — l'agent mesure lui-même via un scénario e2e avec tag `perf` :**
L'agent propose de créer un scénario Gherkin avec tag `@perf` (dans `features/`) et ses step definitions CodeceptJS, qui se déroulent sur le serveur de dev (`npx task dev`) dans un vrai navigateur. L'agent récupère lui-même les mesures :
- `performance.mark()` / `performance.measure()` autour de l'appel, lus via `I.executeScript()`.
- Tâches longues (> 50 ms) via un `PerformanceObserver` sur `longtask` installé avant le scénario.

L'agent demande à l'utilisateur laquelle des deux options A ou B il préfère avant de mesurer.

Reporter les deux chiffres dans le résumé final (avant → après, même unité, même scénario).

## Si la fonction n'a aucun test

Ne jamais modifier une fonction non testée : écrire d'abord des **tests de caractérisation** qui figent le comportement actuel. Ils deviennent le filet de sécurité qui prouve que l'optimisation ne change rien d'observable. Pour rédiger ces tests, utilise la skill `/unit-test` (tests Jasmine dans `tests/unit/`).

1.  Appeler la fonction avec des entrées représentatives : cas nominal, cas limites (vide, un seul élément, doublons, entrée extrême), et capturer les sorties observées telles quelles — y compris les surprises qui semblent être des bugs.
2.  Écrire ces paires entrée/sortie comme tests unitaires et vérifier qu'ils passent sur le code actuel.
3.  Ne toucher à la fonction qu'une fois ces tests verts ; après optimisation, ils doivent rester verts sans modification (sinon le comportement a changé).
4.  Signaler à l'utilisateur les comportements suspects découverts au passage, sans les corriger dans le même changement (ce serait changer le comportement, pas optimiser).

## Catalogue de techniques

Choisir la technique la plus simple qui suffise ; en cas d'égalité, prendre celle qui est le plus haut dans la liste. N'appliquer une technique que si elle correspond au coût réellement mesuré : chaque entrée répond à un symptôme précis, pas à une intuition.

**Algorithme et structures**

- Remplacer un parcours imbriqué O(n²) par une `Map`/`Set` d'indexation pour ramener la recherche à O(1) par accès.
- Sortir tôt d'une boucle (`break`, `some`, `find`) dès que le résultat est connu.
- Calculer une seule fois ce qui est invariant dans une boucle : accès répétés, pré-calculs, expressions constantes.

**Cache et mémoïsation**

- Mémoïser un calcul pur appelé avec les mêmes arguments ; garder une clé de cache stable et borner la taille du cache.
- Remonter hors de la fonction un résultat invariant si le contexte d'appel le permet, sans casser l'API publique.

**DOM et rendu**

- Batcher les lectures puis les écritures DOM : alterner lecture/écriture de propriétés de layout force un reflow à chaque paire (layout thrashing).
- Construire hors du document (`documentFragment`, `innerHTML` en une fois) puis insérer, plutôt que N insertions successives.
- Utiliser `requestAnimationFrame` pour le travail visuel, pas `setTimeout` ; annuler les rAF et les intervalles devenus inutiles.

**Événements**

- `debounce` ou `throttle` sur les handlers à haute fréquence (scroll, resize, input), selon que l'on veut la dernière occurrence ou un rythme régulier.
- `{ passive: true }` sur les écouteurs de scroll/touch ; toujours retirer les écouteurs ajoutés dynamiquement (fuites mémoire).

**Allocations et sérialisation**

- Réutiliser les tableaux et objets temporaires dans les hot paths au lieu d'allouer à chaque appel.
- Éviter `JSON.parse(JSON.stringify(...))` pour un clonage profond quand une copie ciblée de quelques propriétés suffit.
- Fusionner une chaîne de `.map().filter().sort()` en une seule passe quand le volume le justifie ; sinon garder la version lisible en chaîne.

Si l'optimisation demande de restructurer la fonction, la découper en sous-fonctions petites et pures : plus faciles à mesurer, à caractériser et à relire.

## Critères de décision

- Si le gain attendu est faible (non visible dans les mesures) et que le code devient moins clair, ne pas optimiser — et le dire explicitement.
- Si la fonction est rarement appelée et hors des chemins critiques, interroger l'intérêt de l'optimisation avant de se lancer.
- Si plusieurs options existent, choisir celle qui réduit le coût avec le moins de risque de régression.
- Si l'optimisation nécessite une refonte plus large (changement d'API, de structure de données, d'architecture), l'indiquer explicitement avec le plan proposé avant d'aller plus loin, et n'appliquer que la partie locale restante si elle est gagnable.

## Conformité

Respecter les règles générales de `AGENTS.md` (commandes `npx task`, politique de lint, i18n, périmètre des modifications, interdiction de `push`/`bump` sans demande).
