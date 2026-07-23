# JS Template

Un environnement de développement préconfiguré pour démarrer un projet JavaScript avec de bonnes pratiques.

## Ce que ce template apporte

- Compilation avec Rolldown (JS + CSS optimisés et minifiés)
- Tests unitaires avec Jasmine
- Tests end-to-end avec Gherkin + CodeceptJS
- Qualité de code avec ESLint + Prettier
- Automatisation des tâches avec Taskfile
- Workflow de versionning et changelog automatisé avec Husky + Commitlint + Commitizen
- Intégration continue dans Gitlab

## Démarrage rapide

### 1) Prérequis

Il faut avoir installé sur votre machine :

- Node.js (version >=22)
- npm (version 8 au minimum, version >=10 recommandée)

### 2) Installer les dépendances

À la racine du projet, lancer dans un terminal la commande suivante :

```bash
npm install
```

### 3) Développer et tester

Coder dans `app/js` et  `app/css`, puis lancer la commande suivante pour compiler et surveiller les changements, dans un serveur de développement local :

```bash
task dev
```

Avant de pousser vos modifications, vérifier que tout est correct avec :

```bash
task tests
```

et

```bash
task lint
```

Pour générer le build final, lancer :

```bash
task build
```

## Programmation JavaScript et CSS

Ce template est pensé pour programmer en JavaScript modulaire, avec une gestion explicite des imports et des exports. L’intérêt est de découper le code en petits fichiers plus simples à lire, à tester et à faire évoluer.

Il est recommandé d’organiser les fichiers de manière logique, par exemple selon un modèle MVC (voir ci-dessous), ou selon les fonctionnalités de l’application.

<details>
<summary>Le modèle MVC</summary>

Le modèle MVC (Modèle-Vue-Contrôleur) est une architecture logicielle qui sépare les responsabilités dans une application :

- Le **Modèle** gère les données et la logique métier.
- La **Vue** est responsable de l’affichage.
- Le **Contrôleur** coordonne les actions entre le Modèle et la Vue (par exemple, lorsqu’un utilisateur interagit avec l’interface).

</details>

Le fichier principal est `app/js/main.mjs`. C’est le point d’entrée de l’application : il importe les autres fichiers JavaScript nécessaires au fonctionnement de l’application, mais aussi les styles CSS principaux.

Ces styles peuvent être répartis dans plusieurs fichiers : ils seront regroupés automatiquement en un seul ensemble, dans l’ordre des imports, puis minifiés par l’outil de build.


## Structure du projet

- `.husky` : hooks Git pour vérifier les commits et la qualité du code
- `.vscode` : configuration de l'éditeur VS Code / VSCodium
- `app` : code source de l'application
- `dist` : fichiers générés (build)
- `features` : scénarios Gherkin pour les tests end-to-end
- `tests/unit` : tests unitaires avec Jasmine
- `tests/e2e` : implémentation des scénarios end-to-end avec CodeceptJS

## Éditeur (VS Code / VSCodium)

### Extensions recommandées

Le projet propose automatiquement des extensions utiles (Prettier, ESLint, Gherkin, etc.) via `.vscode/extensions.json`.

### Tâches prêtes à l'emploi

- Tâche build par défaut : `Build`
- Tâche tests par défaut : `Test`

Raccourcis utiles :

- `Ctrl+Shift+B` : lancer la tâche de build
- commande `Run Test Task` : lancer la tâche de test

### Formatage et lint

- Prettier est configuré comme formateur par défaut.
- Le formatage à la sauvegarde est activé.
- ESLint vérifie la qualité du code.
- L'extension `Cognitive Complexity Show` permet d'afficher la complexité cognitive des fonctions dans le code.

On peut changer les paramètres de formatage dans le fichier `.vscode/settings.json`, et dans les fichiers de configuration de Prettier et ESLint (`.prettierrc` et `eslint.config.mjs`).

## Commits, versions et changelog

### Conventions de commit

Les messages de commits doivent suivre les conventions [Conventional Commits](https://www.conventionalcommits.org/fr).

Exemples :

- `feat(scope): description` : nouvelle fonctionnalité
- `fix(scope): description` : correction de bug ou modification mineure
- `chore: description` : tâches de maintenance ou de configuration
- `docs: description` : documentation

Le scope est obligatoire pour les commits de type `feat` et `fix`, mais optionnel pour les autres types.

Pour une rupture de compatibilité ou une montée de version majeure, ajouter `!` après le type et le scope, par exemple : `feat(scope)!: description`.

Les hooks Husky vérifient automatiquement le format des commits avec Commitlint, la qualité du code et les règles de formatage avant chaque commit avec ESLint.

### Autres types de commit
- On peut utiliser d'autres types de commit, comme `style`, `refactor`, `perf`, `test`, `build` ou `ci`.
- Le type `edit` est également disponible pour des corrections typographiques dans le code ou la documentation (ces modifications n'apparaissent pas dans le CHANGELOG).

La configuration des types de commit peut être modifiée dans `commitlint.config.cjs` et dans `.cz.toml`.

### Monter une version

Prérequis : installer [Commitizen](https://commitizen-tools.github.io/commitizen/#installation).

On peut automatiquement, avec Commitizen, monter la version du projet et générer le CHANGELOG, avec la commande suivante :

```bash
task bump
```

1. La nouvelle version est calculée automatiquement en suivant la convention [Semantic Versioning](https://semver.org/lang/fr/).
2. Un tag Git est créé pour cette version.
3. Les fichiers `VERSION`, `package.json` et `package-lock.json` sont mis à jour.
4. `CHANGELOG.md` est mis à jour avec les changements depuis la version précédente.

Règle de calcul de version :

- `feat` -> version mineure (ex: de 1.2.5 à 1.3.0)
- `fix` -> version patch (ex: de 1.3.0 à 1.3.1)
- `BREAKING CHANGE` ou `!` -> version majeure (ex: de 1.3.1 à 2.0.0)

Pour que les tags soient poussés sur le dépôt Git, il faut soit utiliser la commande `task push` après avoir monté la version (voir ci-dessous), soit utiliser la commande git : 

```bash
git push origin && git push origin --tags
```

## Commandes complémentaires

### Tests

```bash
# Lancer uniquement les tests unitaires
task tests:unit
```

```bash
# Lancer uniquement les tests end-to-end
task tests:e2e
```

```bash
# Lancer uniquement les tests e2e marqués @CURRENT
task tests:e2e:current
```

```bash
# Lancer uniquement la conformité du Javascript au standard utilisé
task ecma
```

### Pousser les modifications sur le dépôt Git

```bash
# Pousser les modifications sur le dépôt Git
task push
```

Cette commande :
- vérifie que le code est conforme au standard utilisé
- vérifie que les tests unitaires et end-to-end passent
- pousse les modifications sur les différents dépôts Git configurés dans le projet

Il faut changer la variable `GIT_REPO_NAMES` dans le fichier `Taskfile.yml` pour indiquer les dépôts Git sur lesquels pousser les modifications.


### Compression des images

Une tâche de compression des images est disponible pour réduire la taille des images du projet.

Elle utilise plusieurs outils, qu'il faut installer sur votre machine :
- pngquant pour les images PNG
- jpegoptim pour les images JPEG
- svgo pour les images SVG

```bash
# Compresser les images du projet
task images:compress
```

## Licence

Ce projet est sous licence libre MIT.