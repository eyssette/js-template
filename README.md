# JS Template

Ce dépôt vous propose un environnement de développement préconfiguré pour démarrer un projet JavaScript avec de bonnes pratiques et des outils modernes et performants.

Tout est prêt pour coder, tester et compiler votre application dans les meilleurs conditions !

## Ce que ce template apporte

### Les fonctions principales

### Un éditeur de code préconfiguré

Ce template est pensé pour être utilisé avec l’éditeur de code VSCode ou VSCodium, avec des extensions et une configuration prête à l'emploi, qui permet de :

- **Vérifier la qualité** du code (_lint_) en temps réel,
  - avec Oxlint pour le JS,
  - Stylelint pour le CSS
  - HTML-Validate pour le HTML,
- **Formater** automatiquement le code avec Oxfmt au moment de la sauvegarde,
- **Déboguer** son application grâce à un serveur de développement local préconfiguré, qui permet de lancer l’application, de voir les modifications en direct, d’inspecter les variables et l’exécution du code pas à pas.

### Des tâches automatisées pour le développement et la maintenance

Les tâches courantes sont automatisées avec [Task](https://taskfile.dev/) et permettent de :

- **Compiler** automatiquement le code avec Rolldown pour produire des fichiers JavaScript et CSS optimisés et minifiés.
- **Tester** son code en local :
  - en lançant des tests unitaires avec Jasmine,
  - en mesurant la couverture de code avec c8.
  - en lançant des tests end-to-end avec CodeceptJS, que l'on peut écrire de manière plus naturelle avec la syntaxe Gherkin.
    - en vérifiant la conformité du code au standard ECMAScript utilisé
- **Pousser** les modifications sur un ou plusieurs dépôts Git, avec vérification des messages de commits, de la qualité du code et des tests avant le push, calcul automatique de la version et génération du CHANGELOG (grâce à Husky, Commitlint et Commitizen).
- **Déployer** l'application finale sur le web grâce à un pipeline préconfiguré pour Gitlab.
- **Vérifier** l’accessibilité, les performances et la sécurité de l’application.

Les tâches courantes sont définies dans le fichier `Taskfile.yml` et peuvent être lancées avec `task <nom_de_la_tâche>` si Task est installé globalement, ou avec `npx task <nom_de_la_tâche>`.

## Démarrage rapide

### 1) Prérequis

Il faut avoir installé sur votre machine :

- VSCode ou VSCodium
- Node.js (version >=22)
- npm (version 8 au minimum, version >=10 recommandée)

<details>
<summary>Recommandation : utiliser Volta pour gérer les versions de Node.js et npm</summary>

Quand on travaille avec Node.js et npm, il est important d’utiliser les bonnes versions pour éviter les erreurs de compatibilité.

[Volta](https://www.voltajs.com/) permet d'installer Node et npm et de gérer automatiquement la bonne version pour chaque projet.

Je vous recommande donc d'installer Volta sur votre machine, puis d’installer Node.js et npm avec Volta, en suivant les instructions sur le site officiel.

</details>

### 2) Installer les dépendances

À la racine du projet, lancer dans un terminal la commande suivante :

```bash
npm install
```

### 3) Développer et tester

Coder dans `app/js` et `app/css`, puis lancer la commande suivante pour compiler et surveiller les changements, dans un serveur de développement local :

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

- `app` : code source de l'application
- `dist` : fichiers générés (build)
- `features` : scénarios Gherkin pour les tests end-to-end
- `scripts` : scripts pour les différentes tâches automatisées
- `tests/unit` : tests unitaires avec Jasmine
- `tests/e2e` : implémentation des scénarios end-to-end avec CodeceptJS

Les dossiers qui commencent par un point sont des dossiers de configuration

- `.gitlab` : configuration de templates pour Gitlab
- `.husky` : hooks Git pour vérifier les commits et la qualité du code
- `.vscode` : configuration de l'éditeur VS Code / VSCodium

## Éditeur (VS Code / VSCodium)

### Extensions recommandées

Le projet propose automatiquement des extensions utiles via `.vscode/extensions.json`.

- OXC : Lint et formatage du code javascript avec Oxlint et Oxfmt
- Stylelint : Vérification du CSS
- HTML-Validate : Vérification du HTML
- Cognitive Complexity Show : Affiche la complexité cognitive des fonctions
- Code Spell Checker et Code Spell Checker French : Vérification orthographique en français pour les fichiers texte
- Cucumber Autocomplete : Autocomplétion des steps Cucumber (pour décrire les features qui sont la base des tests end-to-end)

### Debugger l'application

Un fichier de configuration pour debugger l’application avec VSCode est disponible dans `.vscode/launch.json`.

Il permet de lancer l’application dans le navigateur web intégré et de déboguer le code JavaScript, avec des points d’arrêt (breakpoints), qui permettent l’inspection des variables et l’exécution pas à pas du code.

### Tâches prêtes à l'emploi

- Tâche build par défaut : `Build`
- Tâche tests par défaut : `Test`

Raccourcis utiles :

- `Ctrl+Shift+B` : lancer la tâche de build
- commande `Run Test Task` : lancer la tâche de test

### Formatage et lint

Oxfmt formate le code lors de la sauvegarde du fichier (configuration dans `.oxfmtrc.json`).

Oxlint vérifie la qualité du code Javascript (configuration dans `oxlint.config.mjs`).
Stylelint vérifie la qualité du code CSS.
HTML-Validate vérifie la qualité du code HTML.

- Les erreurs de lint sont affichées dans le panneau de problèmes de VSCode, ce qui permet de surveiller la qualité de son code en temps réel.
- Les erreurs peuvent être non bloquantes (warnings) ou bloquantes (errors).
- Les erreurs bloquantes doivent être corrigées avant de pousser le code sur le dépôt Git.
- On peut décider d'ignorer certaines erreurs de lint du javascript, en les désactivant soit pour un fichier entier, soit pour une ligne spécifique, soit pour tous les fichiers (dans les fichier de configuration d'Oxlint : `oxlint.config.mjs`).

L'extension `Cognitive Complexity Show` permet d'afficher la complexité cognitive des fonctions dans le code.

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

Les hooks Husky vérifient automatiquement le format des commits avec Commitlint, la qualité du code et les règles de formatage avant chaque commit avec Oxlint et Oxfmt.

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

### Lint (qualité du code)

```bash
# Vérification de l'absence d'erreurs dans le code
task lint
```

```bash
# Affichage de toutes les erreurs, même non bloquantes, dans le code
task lint:all
```

```bash
# Validation du code HTML avec html-validate
task html-validate
```

### Tests unitaires et tests end-to-end

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

### Conformité du code au standard ECMAScript utilisé

```bash
# Vérifier que le code compilé dans le dossier dist est conforme au standard ECMAScript utilisé
task ecma:dist
```

```bash
# Vérifier que le code source est conforme au standard ECMAScript utilisé
task ecma:source
```

```bash
# Lancer les deux vérifications de conformité ECMAScript en une seule commande
task ecma
```

Si on veut changer le standard ECMAScript utilisé, il faut modifier la variable `ECMA_VERSION` dans le fichier `rolldown.config.mjs`, dans le fichier `Taskfile.yml`, dans la variable `env` dans le fichier `oxlint.config.mjs`.

### Rapport de couverture des tests unitaires

Un rapport de couverture permet de savoir quelles parties du code sont couvertes par les tests unitaires et quelles parties ne le sont pas.

```bash
# Lancer un rapport de couverture des tests unitaires
task coverage
```

Le rapport de couverture est généré dans le dossier `.report/coverage` et peut être consulté dans un navigateur web.

Par défaut, il est ouvert automatiquement dès la fin de la génération du rapport.

### Push sur les dépôts Git

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

### Taille des différents modules

On peut visualiser la taille des différents modules du projet avec la commande suivante :

```bash
# Visualiser la taille des différents modules du projet
task size
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
# Vérifier la sécurité du code avec bearer
task security:bearer
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
