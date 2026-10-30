---
name: "code"
description: "Écrire du code pour implémenter une fonctionnalité en respectant les bonnes pratiques et les conventions du projet. À utiliser lorsque l'utilisateur demande de créer une application, une fonction, un module, un composant"
argument-hint: "<plan d'action ou fonctionnalité à implémenter>"
---

# Code

Implémenter la demande de l'utilisateur de bout en bout : comprendre le comportement attendu, s'intégrer à l'architecture existante, écrire le minimum de code nécessaire, vérifier le résultat et rendre compte honnêtement des contrôles effectués.

La priorité est, dans cet ordre :

1. satisfaire le besoin exprimé et les critères d'acceptation ;
2. préserver le comportement existant hors du périmètre demandé ;
3. respecter les instructions et conventions du projet ;
4. produire un code simple, lisible, sûr, testable et maintenable ;
5. vérifier le résultat avec les contrôles disponibles.

Ne jamais considérer une tâche comme terminée simplement parce que le code a été écrit.

`AGENTS.md` fait autorité sur les conventions détaillées (structure, nommage, Svelte, i18n, tests, lint, accessibilité, sécurité, langue) : s'y référer plutôt qu'improviser.

## 0. Avant de coder

- Si la demande relève d'une skill dédiée, utiliser la skill correspondante : bug à corriger → `/fix-this` ; problème de performance → `/optimize-this` ; refactorisation → `/refactor-this`.
- Lire `AGENTS.md` et les éventuels fichiers d'instructions applicables aux dossiers concernés.
- Explorer les modules, composants, styles, traductions et tests liés à la fonctionnalité ; réutiliser l'existant plutôt que réécrire.
- Vérifier l'état Git pour préserver les modifications préexistantes de l'utilisateur.
- Limiter les modifications au périmètre demandé : pas de refactor, renommage ou formatage de code non concerné.
- Identifier les fichiers à modifier et les contrôles nécessaires.
- Demande ambiguë ou plusieurs interprétations valables : énoncer brièvement l'hypothèse retenue ou poser la question — ne jamais trancher en silence.

## 1. Structure du projet

Chemins des sources, tests, traductions, `dist`… : décrits dans `AGENTS.md`. Point d'entrée : `app/js/main.mjs` (importe les autres modules JS et les fichiers CSS principaux).

## 2. JavaScript

- **Modules ESM (`.mjs`)** organisés par dossier/fonctionnalité (ou MVC si pertinent — à faire valider par l'utilisateur si le projet n'a pas encore de structure claire). Pas d'objet fourre-tout, pas de god-module, pas de fichier « barrel ».
- **Import dynamique** pour tout module chargé conditionnellement (plugin, fonctionnalité activable, code lourd non utilisé au démarrage, composant Svelte non systématique) : `import()`, jamais d'import statique en tête de fichier.
- **Pas de classes** : fonctions et modules, composition plutôt qu'héritage.
- **Pas de top-level `await`** : tout `await` se trouve dans une fonction `async`, y compris pour un `import()` dynamique.
- **es2020 maximum** ; en cas de doute sur une syntaxe récente, lancer `npx task ecma:source` après écriture.
- **Événements** via `addEventListener`, jamais d'attributs HTML (`onclick`, `onchange`…).

## 3. CSS

- Pas de CSS inline ; exception rarissime, uniquement si l'alternative compliquerait le code — la justifier.
- Styles dans `app/css/style.css` ou dans un fichier dédié importé via `app/js/main.mjs`.
- Utiliser la SKILL `/css` pour créer ou vérifier les styles.
- Avant toute création ou modification de styles, consulter `.plan/DESIGN.md` et les styles existants.
    - ⚠️ `.plan/DESIGN.md` est ignoré par git : une recherche de fichiers peut ne pas le trouver. Lister directement le contenu de `.plan/` et lire le fichier par son chemin exact avant de conclure qu'il est absent.

## 4. Svelte

- Utiliser un composant Svelte uniquement si une réactivité fine ou une gestion d'état non triviale le justifie — pas par défaut pour du HTML/CSS/JS simple. Conventions Svelte 5 (runes, `customElement`, nommage) : voir `AGENTS.md`.
- Le composant gère la vue et la réactivité ; la logique métier réutilisable hors UI va dans un module JS classique.
- Import dynamique si le composant n'est pas utilisé systématiquement.
- Emplacement par défaut : `app/js/components/*.svelte` ; demander à l'utilisateur pour tout autre emplacement.

## 5. Qualité et sécurité

- Écrire le minimum de code qui résout le problème : pas de fonctionnalité, d'abstraction ou d'option non demandée.
- 1 fonction = 1 responsabilité, nom explicite ; early returns plutôt qu'imbrications profondes ; extraire les conditions complexes dans une variable ou une fonction nommée.
- Factoriser la duplication avérée dans une fonction partagée, sans factoriser prématurément deux usages pas encore prouvés identiques.
- Privilégier les fonctions pures quand c'est raisonnable ; documenter clairement toute mutation d'un paramètre.
- Passer des objets plutôt que des paramètres positionnels ; pas de valeur magique ; pas de variable globale inutile, dépendances explicites.
- Ne pas exporter une fonction ni créer une API publique sans nécessité.
- DOM : éviter les sélections répétées et les mises à jour successives dans une même fonction.
- Ne jamais masquer une erreur (`catch` vide) ni ignorer silencieusement un cas invalide.
- **Sécurité** : toute donnée externe est non fiable — valider et échapper les entrées/sorties (XSS, injection SQL, prudence avec `innerHTML`) ; aucune exécution de code arbitraire (`eval`, `exec`, désérialisation non sécurisée) ; aucun contournement des mécanismes d'authentification, d'autorisation ou de contrôle d'accès ; aucun secret codé en dur.
- Aucune dépendance, CDN, script, police ou ressource externe non gérés par le projet, sauf demande explicite de l'utilisateur.
- **Accessibilité** : WCAG niveau AA, conventions dans `AGENTS.md`.
- Commenter de manière simple, en français (sauf demande contraire), toujours avant le code et jamais en fin de ligne : décrire une fonction, ou expliquer un point technique complexe ou une étape importante du traitement. Pas de JSDoc complexe.

## 6. Internationalisation

Conventions i18n (ParaGlideJS, messages dans `i18n/messages`, aucun texte codé en dur) : voir `AGENTS.md`.

Exception pour les textes longs (documentation, tutoriel dans l'application) importés via `unplugin-raw` : i18n gérée manuellement — signaler explicitement ce mécanisme à l'utilisateur lorsqu'il est utilisé.

## 7. Tests, lint et fin de tâche

Conventions de tests (unitaires dans `tests/unit`, scénarios Gherkin dans `features` + step definitions, tag `@CURRENT`) et politique de lint : voir `AGENTS.md`.

- Avertir l'utilisateur avant d'ajouter une fonction que des tests seront nécessaires.
- Linter chaque fichier touché : d'abord `npx task lint:file -- <fichier>`, puis `npx task lint:file:all -- <fichier>`. Corriger absolument les erreurs et avertissements, sans jamais désactiver une règle. Seule exception, pour `lint:file:all` : ne pas insister si la correction complique inutilement le code ou si l'utilisateur demande de ne pas le faire.

Séquence obligatoire avant de considérer la tâche terminée :

-  `npx task lint:file:all -- <fichier>` sur chaque fichier créé/modifié, points corrigés
-  `npx task review:file -- <fichier>` sur chaque fichier créé/modifié, points corrigés
-  `npx task tests:unit` (et `npx task tests:e2e:current` si un scénario `@CURRENT` est concerné)
-  `npx task ecma:source` si une syntaxe potentiellement incompatible a été touchée

Rendre compte des contrôles effectués et de leurs résultats dans la réponse finale.

## 8. Git

- Aucune commande `push`, `bump`, `git push` ou `--no-verify` sans demande explicite.
- Ne jamais committer sans demande explicite : par défaut, l'utilisateur gère lui-même les commits et le push.