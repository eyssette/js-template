---
name: "code"
description: "Écrire du code pour implémenter une fonctionnalité en respectant les bonnes pratiques et les conventions du projet. À utiliser lorsque l'utilisateur demande de créer une application, une fonction, un module, un composant"
argument-hint: "<plan d'action ou fonctionnalité à implémenter>"
---

# Code

Écrit du code applicatif pour ce projet (JS modulaire, ParaGlideJS pour l'i18n, Svelte en option pour la réactivité), en respectant strictement les conventions de `AGENTS.md` et les principes ci-dessous. Toute production de code doit se terminer par une revue via `npx task review:file`.

## 0. Avant de coder

- Reformuler très brièvement ce qui va être fait et où (fichiers/dossiers concernés).
- Si la demande est ambiguë ou a plusieurs interprétations valables : formuler l'hypothèse retenue ou poser la question — ne jamais trancher en silence.
- Écrire le minimum de code qui résout le problème : pas de fonctionnalité, abstraction ou option non demandée.
- Sur du code existant : ne toucher que ce que la tâche exige. Ne pas reformater / refactoriser le code adjacent (Oxfmt/Oxlint s'en chargent). Ne retirer que les imports/variables devenus inutiles à cause du changement ; signaler le code mort préexistant sans le supprimer.
- Prévenir l'utilisateur que toute nouvelle fonction impliquera probablement des tests unitaires et/ou des scénarios e2e (voir §5).

## 1. Emplacement du code (structure du projet)

La structure du projet (chemins des sources, tests, traductions, `dist`…) est décrite dans `AGENTS.md` — s'y référer. Points spécifiques au code :

- Point d'entrée : `app/js/main.mjs` (importe les autres modules JS et les fichiers CSS principaux).
- Architecture modulaire et structure claire, de préférence par dossier/fonctionnalité, ou MVC si cela est pertinent (à faire valider par l'utilisateur si le projet n'a pas encore de structure claire).
- Composants Svelte : de préférence `app/js/components/*.svelte`, mais demander à l'utilisateur si un autre emplacement est souhaité.

## 2. Principes de code à respecter systématiquement

### 2.1 Principes de code JS, CSS et Svelte

- **Imports dynamiques pour les plugins/fonctionnalités optionnelles** : tout module chargé conditionnellement (plugin, fonctionnalité activable, code lourd non utilisé au démarrage) doit être importé via `import()` dynamique, jamais en `import` statique en tête de fichier. Cela inclut les composants Svelte non utilisés systématiquement.
- **Pas de top-level await** : tout `await` doit être à l'intérieur d'une fonction asynchrone (`async function`). Ne jamais faire de `await` au niveau racine d'un module, y compris pour un `import()` dynamique.
- **Compatibilité ECMAScript** : rester compatible avec l'ECMAScript cible (es2020). En cas de doute sur une syntaxe récente, lancer `npx task ecma:source` après écriture.
- **Gestion des événements** : toujours utiliser des écouteurs d'événements (`addEventListener`) dans les fichiers JavaScript, plutôt que des attributs HTML (ex : `onclick`, `onchange`…).
- **Architecture CSS** : ne jamais utiliser de CSS inline, ou alors seulement très rarement, quand ce serait complexifier de faire autrement. Les styles doivent être intégrés dans `app/css/style.css` ou dans un fichier dédié importé via `app/js/main.mjs`. Avant toute création de style, consulter `.plan/DESIGN.md` ; si ce fichier est absent, suggérer sa création via la SKILL `/design-md`. Utiliser la SKILL `/css` pour créer ou vérifier le style CSS produit.
  - ⚠️ `.plan/DESIGN.md` est par défaut ignoré par git : une recherche de fichiers (`file_search`, glob `**/DESIGN.md`) peut ne pas le trouver. Vérifie donc directement le dossier `.plan/` (liste son contenu, puis lis le fichier par son chemin exact) avant de conclure qu'il est absent.

### 2.2 Principes généraux de programmation (rappel)

- **JavaScript modulaire** : fichiers courts, un rôle par fichier, imports/exports explicites (ESM, extension `.mjs`/`.js` selon l'existant). Pas d'objet fourre-tout, pas de fichier god-module, pas de fichier "barrel".
- **KISS** : la solution la plus simple qui fonctionne. Pas de sur-ingénierie.
- **DRY** : factoriser la logique dupliquée dans une fonction/module partagé, mais ne pas factoriser prématurément deux usages qui n'ont pas encore prouvé être identiques.
- **1 fonction = 1 responsabilité** : une fonction fait une seule chose, a un nom qui le dit, et reste testable isolément. Si une fonction fait "et... et...", la découper.
- **Pas de classes** : utiliser des fonctions et des modules, jamais `class`. Préférer la composition de fonctions à l'héritage.
- **Pas de mutation cachée** : privilégier les fonctions pures quand c'est raisonnable ; documenter clairement toute mutation d'un paramètre si elle est nécessaire.
- **Complexité cognitive faible** : préférer les retours anticipés (early return) aux imbrications profondes ; éviter les conditions complexes non nommées (extraire dans une variable/fonction au nom explicite).
- **Nommage** : anglais pour le code (fonctions, variables), français pour les commentaires et la documentation (sauf demande contraire de l'utilisateur).

## 3. Accessibilité et sécurité

Les standards d'accessibilité (WCAG niveau AA) et les garde-fous de sécurité sont décrits dans `AGENTS.md` — s'y référer.

Important pour garantir la sécurité du code produit : validation et échappement systématique des entrées/sorties (protection contre XSS, injection SQL, etc.), aucune exécution de code arbitraire non maîtrisé (eval, exec, désérialisation non sécurisée...), et aucun contournement des mécanismes d'authentification, d'autorisation ou de contrôle d'accès existants, pas de données sensibles codées en dur dans le code (mots de passe, clés API, secrets, etc.).

## 4. Bonnes pratiques générales

- Avant d'écrire du nouveau code, rechercher si l'existant peut être réutilisé et respecter les conventions déjà présentes dans le projet.
- Viser la performance, la lisibilité, la maintenabilité et la testabilité du code.
- Documenter de manière simple les fonctions (pas de JSdoc complexe), en français sauf demande contraire de l'utilisateur, et sans excès ou précisions inutiles. Pas de commentaire inline, après une ligne de code. Commentaire uniquement pour décrire la fonction avant son code, ou pour expliquer un point technique complexe ou la structure de la fonction (avant chaque étape importante de traitement).
- Ne pas ajouter de dépendance, d'abstraction ou de complexité sans nécessité démontrée ; privilégier les solutions natives et simples.
- Ne jamais utiliser des CDN, des scripts externes ou des librairies non gérées par le projet, sauf demande explicite de l'utilisateur.
- Ne jamais utiliser des polices ou des ressources externes non gérées par le projet, sauf demande explicite de l'utilisateur.
- Ne jamais refactoriser du code hors périmètre de la tâche : signaler les améliorations possibles sans les appliquer.
- Éviter les effets de bord inutiles : limiter les variables globales, rendre les dépendances explicites et préférer les fonctions pures quand cela reste simple.
- Utiliser au maximum les objets comme arguments de fonction pour éviter les paramètres positionnels et faciliter l'évolution du code.
- Gérer explicitement les erreurs : ne jamais masquer une erreur avec un `catch` vide et ne pas ignorer silencieusement un cas invalide.
- Ne jamais faire confiance aux données externes : valider les entrées publiques et éviter les injections (`innerHTML`, `eval`, etc.).
- Éviter les valeurs magiques.
- Ne pas exporter une fonction ou créer une API publique si elle n'est pas nécessaire.
- DOM : Limiter les accès répétés et les mises à jours successives du DOM, éviter les sélections identiques plusieurs fois dans une même fonction.

## 5. Internationalisation (ParaGlideJS)

Les conventions d'i18n (ParaGlideJS, messages dans `i18n/messages`, pas de texte codé en dur) sont décrites dans `AGENTS.md` — s'y référer.

Cas particulier pour des textes longs : on peut les importer via `unplugin-raw`. Dans ce cas précis (pour de la documentation, ou un tutoriel, à l'intérieur de l'application par exemple), l'i18n est gérée manuellement — le signaler explicitement à l'utilisateur si ce mécanisme est utilisé.

## 6. Composants Svelte (optionnel)

À utiliser uniquement quand une réactivité fine ou une gestion d'état non triviale le justifie — pas par défaut pour du HTML/CSS/JS simple (KISS). Les conventions Svelte 5 (runes, `customElement`, nommage PascalCase/kebab-case) sont décrites dans `AGENTS.md` — s'y référer. Points spécifiques au skill :

- Le composant reste responsable de sa vue/réactivité ; la logique métier réutilisable hors-UI va dans un module JS classique (séparation des responsabilités).
- Charger le composant via import dynamique s'il n'est pas utilisé systématiquement (cf. §2).

## 7. Tests

Les conventions de tests (unitaires dans `tests/unit`, scénarios Gherkin dans `features` + step definitions, tag `@CURRENT`) sont décrites dans `AGENTS.md` — s'y référer. Points spécifiques au skill :

- Avertir l'utilisateur avant d'ajouter une fonction que des tests seront nécessaires.
- Correctif de bug : écrire d'abord un test qui reproduit le bug, vérifier qu'il échoue, corriger, vérifier qu'il passe.

## 8. Lint

La politique de lint (erreurs vs avertissements, interdiction de désactiver une règle) est décrite dans `AGENTS.md` — s'y référer. Points spécifiques au skill :

- Lint les fichiers touchés d'abord avec `npx task lint:file -- <chemin_du_fichier>` et corriger absolument les erreurs ou avertissements signalés.
- Lint les fichiers touchés ensuite avec `npx task lint:file:all -- <chemin_du_fichier>` et corriger les erreurs ou avertissements signalés (sauf si cela complique inutilement le code ou si l'utilisateur demande de ne pas le faire).

## 9. Séquence de fin de tâche (obligatoire)

Avant de considérer une tâche de code terminée, exécuter dans cet ordre :

- [ ] `npx task lint:file:all -- <fichier>` sur chaque fichier créé/modifié, points corrigés
- [ ] `npx task review:file -- <fichier>` sur chaque fichier créé/modifié, points corrigés
- [ ] `npx task tests:unit` (et `npx task tests:e2e:current` si scénario `@CURRENT`)
- [ ] `npx task ecma:source` si syntaxe potentiellement incompatible touchée
- [ ] Aucune commande `push`/`bump`/`git push`/`--no-verify` lancée sans demande explicite


## 10. Commit (seulement si demandé)

Les conventions de commit (Conventional Commits, scope obligatoire, hooks Husky) sont décrites dans `AGENTS.md` — s'y référer.

Ne pas committer sans demande explicite de l'utilisateur. Par défaut, l'utilisateur gère lui-même les commits et le push.
