# JS Template

Un environnement de développement préconfiguré pour démarrer un projet JavaScript avec de bonnes pratiques.

## Ce que ce template apporte

### Les fonctions principales

Ce template propose un environnement de développement complet :

- Compilation avec Rolldown (JS + CSS optimisés et minifiés)
- Tests unitaires avec Jasmine
- Tests end-to-end avec Gherkin + CodeceptJS
- Qualité de code avec ESLint + Prettier
- Workflow de versionning et changelog automatisé avec Husky + Commitlint + Commitizen
- Intégration continue dans Gitlab

### Automatisation des tâches

Les tâches courantes sont automatisées avec [Task](https://taskfile.dev/) et permettent de :

- Lancer un serveur de développement local avec rechargement automatique en cas de modifications du code
- Lancer les tâches de test, de lint, de compilation et de montée de version
- Vérifier les versions des dépendances (avec npm outdated) et la conformité du code à la version ECMAScript utilisée (avec es-check)
- Vérifier l’accessibilité de l’application (avec pa11y-ci)
- Mesurer les performances de l’application (avec lighthouse)
- Compresser des images (avec pngquant, jpegoptim et svgo)
- Vérifier la sécurité de l'application (avec npm audit, semgrep et trivy)

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

On peut changer les paramètres de formatage dans le fichier `.vscode/settings.json`, et dans les fichiers de configuration de Prettier et ESLint (`prettier.config.mjs` et `eslint.config.mjs`).

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

### Accessibilité

On peut vérifier l’accessibilité de l’application, grâce à pa11y-ci, avec la commande suivante :

```bash
# Vérifier l'accessibilité de la page principale de l'application (index.html)
task a11y
```

ou 

```bash
# Vérifier l'accessibilité de l'application sur un fichier HTML spécifique
task a11y --/page1
```

```bash
# Vérifier l'accessibilité d'une page web externe
task a11y --URL
```

### Performances

On peut mesurer les performances en local ou en ligne de son application, avec lighthouse.

Il faut d'abord installer lighthouse sur sa machine, avec la commande suivante :

```bash
npm install -g lighthouse
```

Si on veut mesurer les performances en local, il faut d'abord avoir lancé le serveur de développement avec la commande `task dev`.

On peut mesurer les performances de l’application avec lighthouse, grâce à la commande suivante :

```bash
# Mesurer les performances de l'application
task perf
```

La tâche va inviter à choisir entre les deux options suivantes :
1. Mesurer les performances de l’application sur un ordinateur de bureau (desktop)
2. Mesurer les performances de l’application sur un appareil mobile (mobile)

Elle demandera ensuite d’indiquer l’URL de la page à analyser
- si l’URL est vide, la page principale de l’application (index.html) sera analysée
- si l’URL est un chemin relatif (qui commence par `/`), la page correspondante dans le projet sera analysée
- si l'URL est une URL externe, la page correspondante sera analysée

#### Raccourcis

- `task perf:desktop` : mesurer les performances de `index.html` sur un ordinateur de bureau
- `task perf:mobile` : mesurer les performances de `index.html` sur un appareil mobile
- `task perf:MODE -- /page1` : mesurer les performances de `/page1` (MODE = `desktop` ou `mobile`)
- `task perf:MODE -- URL` : mesurer les performances d’une page externe (MODE = `desktop` ou `mobile`)

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

### Sécurité

On peut vérifier la sécurité de l'application avec les commandes suivantes :

```bash
# Vérifier les vulnérabilités des dépendances avec npm audit
task security:audit
```

```bash
# Vérifier la sécurité du code avec semgrep
task security:semgrep
```

```bash
# Vérifier la sécurité de l'application avec trivy
task security:trivy
```

Pour lancer toutes les vérifications de sécurité en une seule commande :

```bash
task security
```

## Licence

Ce projet est sous licence libre MIT.