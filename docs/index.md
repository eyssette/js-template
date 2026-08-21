---
plugins: copycode
style: |
   li {margin-top:0.5em}
   ul, ol {margin-bottom: 1.5em}
   h3 {font-size: 1.15em}
   h4 {font-size: 1.1em}
   h4:not(:first-of-type) {margin-top:3em}
   h5 {font-size: 0.97em; margin-top: 3em;}
   footer a {max-width: 210px;}
---

# JS Template - documentation


:::info 
JS Template est un **environnement de développement JavaScript** pré-configuré et optimisé pour bien démarrer un projet avec de bonnes pratiques et tous les outils nécessaires !
:::


[JS Template](https://forge.apps.education.fr/eyssette/js-template) est un projet créé par [Cédric Eyssette](https://eyssette.forge.apps.education.fr), diffusé sous licence libre MIT.

## Fonctionnalités principales

### En résumé

#### Tout ce qu'il faut pour développer une application web moderne

:::success Qualité du code vérifiée en continue et formatage automatique
L'éditeur de code est configuré pour vérifier en continu la qualité du code (repérer les erreurs, les incohérences et les mauvaises pratiques) et le formater automatiquement à chaque sauvegarde. 
:::

:::success Internationalisation (i18n)
Le template est pré-configuré pour gérer l'internationalisation (i18n).
Votre application peut ainsi être traduite dans plusieurs langues, avec un système de fichiers de messages et un outil de compilation automatique qui permet de gérer facilement les traductions.
:::

:::success Mode PWA (Progressive Web App)
Le template est pré-configuré pour le mode PWA, ce qui permet à l'application d'être installée sur un appareil et de fonctionner hors ligne, avec un système de mise en cache des fichiers.
:::

:::success Intégration de composants Svelte
Si votre projet est un peu plus complexe et nécessite des interfaces plus riches, vous pouvez intégrer des composants Svelte, qui permettent de créer des interfaces réactives et performantes avec une syntaxe simple.
:::

#### Tout ce qu'il faut pour déployer et gérer son projet

:::success Compilation rapide et application automatiquement optimisée
Le code est compilé et optimisé automatiquement pour produire une application finale légère et performante, avec un temps de compilation minimale.
:::

:::success Outils de tests intégrés
L'environnement est pré-configuré pour pouvoir exécuter des tests unitaires (qui vérifient chaque fonction séparément) et des tests _end-to-end_ (qui simulent le parcours d'un utilisateur). Un rapport indique quelles parties du code sont bien couvertes par ces tests.
:::

:::success Automatisation des tâches courantes
Des scripts automatisés permettent de lancer toutes les tâches courantes (serveur de développement, compilation, tests, push, déploiement, vérifications d'accessibilité, de sécurité et de performances) avec un simple commande.
:::

:::success Commits, gestion des versions et génération automatique du CHANGELOG
Le template utilise une convention standard pour les messages de commit, afin de faciliter la compréhension des changements apportés à l'application et de permettre l'automatisation de la gestion des versions.
Quand l'application évolue, on peut faire une montée de version. Le template calcule automatiquement le nouveau numéro de version et génère le CHANGELOG à partir de l'historique des commits.
:::

:::success Génération d'un site de documentation
Vous pouvez écrire la documentation de votre projet dans des fichiers Markdown dans le dossier `docs/`, et le template génère automatiquement un site web de documentation à partir de ces fichiers.
:::

#### Tout ce qu'il faut pour travailler avec des agents IA

:::success Des conventions pour guider les agents IA
Au lieu de laisser les agents IA deviner la structure du projet, le template propose un fichier général préconfiguré (`AGENTS.md`) qui explique les conventions et bonnes pratiques du projet.
Il permet aussi de générer des fichiers de configuration pour définir sa vision générale du projet (`VISION.md`), le design de l'application (`DESIGN.md`), les étapes à suivre (`PLAN.md`), la roadmap du projet (`ROADMAP.md`) afin que les agents IA puissent travailler plus efficacement. 
:::

:::success Des compétences (_SKILLS_) prêtes à l'emploi pour les agents IA
Le template est pré-configuré pour être utilisé avec des agents IA, avec des compétences (_SKILLS_) prêtes à l'emploi pour concevoir l'application, écrire du code, générer des tests, corriger des bugs, rédiger de la documentation …
:::



### Détails techniques

#### Tout ce qu'il faut pour développer une application web moderne

:::technique Qualité du code vérifiée en continue et formatage automatique
L'environnement s'appuie sur [Oxlint](https://oxc.rs/docs/guide/usage/linter) pour le linting JavaScript (analyse statique rapide écrite en Rust), [Stylelint](https://stylelint.io) pour le CSS et [HTML-Validate](https://github.com/validator/validator) pour le HTML. Le formatage est assuré par [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) (également en Rust), configuré pour s'exécuter automatiquement à chaque sauvegarde dans VS Code / VSCodium.
:::

:::technique Internationalisation (i18n)
La couche de traduction est gérée par [ParaGlideJS](https://github.com/paraglidejs/paraglide-js) avec des fichiers de messages dans `i18n/messages`. Pour les longs textes statiques, le plugin [unplugin-raw](https://github.com/antfu/unplugin-raw) permet d'importer directement des fichiers bruts (`.txt`, `.html`, etc.) dans le JavaScript, ce qui facilite la maintenance.
:::

:::technique Mode PWA (Progressive Web App)
Un [Service Worker](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Performance) préconfiguré (`app/sw.mjs`) et un fichier `manifest.webmanifest` sont fournis. Le script de service worker utilise différentes stratégies de cache selon le type de ressources, et il est paramétrable via `swConfig.mjs` pour adapter les URLs à mettre en cache.
:::

:::technique Intégration de composants Svelte
Les composants [Svelte](https://svelte.dev) (fichiers `.svelte`) sont compilés par _Rolldown_ en _Web Components standard_. Ils peuvent ainsi être utilisés directement dans le code HTML/JavaScript de l'application sans framework additionnel, ce qui permet d'enrichir progressivement l'interface avec des composants réactifs.
:::

#### Tout ce qu'il faut pour déployer et gérer son projet

:::technique Compilation rapide et application automatiquement optimisée
Le bundler [Rolldown](https://github.com/rolldown/rolldown) (successeur de Rollup écrit en Rust et beaucoup plus rapide) produit des fichiers JavaScript et CSS optimisés et minifiés.
:::

:::technique Outils de tests intégrés
Les tests unitaires sont exécutés avec [Jasmine](https://jasmine.github.io) et leur couverture est mesurée par [c8](https://github.com/bcoe/c8). Les tests end-to-end reposent sur [CodeceptJS](https://codecept.io) et peuvent être rédigés en langage naturel via la syntaxe [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin) (fichiers `.feature`), ce qui facilite la description des parcours utilisateurs.
:::

:::technique Automatisation des tâches courantes
[Taskfile](https://taskfile.dev) (Task) centralise l'ensemble des scripts du projet dans un fichier `Taskfile.yml` (format YAML). Il permet de lancer en une commande (`task <nom>`) des actions comme le serveur de développement (`dev`), la compilation (`build`), l'exécution des tests (`tests`), la vérification de sécurité (`security`), la mesure de performances (`perf`), etc.
:::

:::technique Commits, gestion des versions et génération automatique du CHANGELOG
[Husky](https://github.com/typicode/husky) et [Commitlint](https://github.com/conventional-changelog/commitlint) imposent des messages de commit au format *Conventional Commits* avant chaque commit, et [Commitizen](https://github.com/commitizen/cz-cli) génère automatiquement le `CHANGELOG.md` à partir de l'historique quand on fait une montée de version.
:::

:::technique Génération d'un site de documentation
Le template utilise [Markpage](https://markpage.forge.apps.education.fr) pour générer le site de documentation à partir des fichiers Markdown.
:::

#### Tout ce qu'il faut pour travailler avec des agents IA


:::technique Des conventions pour guider les agents IA
Le template utilise plusieurs fichiers Markdown pour guider les agents IA dans la compréhension du projet et de ses conventions. C'est une forme de _context engineering_ qui permet aux agents IA de travailler plus efficacement et de respecter les bonnes pratiques du projet.
Le template suit la convention [AGENTS.md](https://agents.md/) qui s'intégrera au _system prompt_ de l'agent IA pour lui fournir le contexte nécessaire à la compréhension du projet.
On peut aussi générer et utiliser des fichiers de configuration supplémentaires.
- `VISION.md` : décrit la vision générale du projet, les objectifs et les contraintes, de manière simple. On peut bien sûr si on le souhaite utiliser des méthodologies plus complexes et formelles pour créer son cahier des charges, mais le choix d'une vision simple et claire est souvent déjà suffisant pour que les agents IA puissent travailler efficacement.
- `DESIGN.md` : décrit le design de l'application, en suivant la convention [design.md](https://github.com/google-labs-code/design.md), qui permet d'avoir une interface cohérente et de guider les agents IA dans la création des composants CSS et HTML.
- `PLAN.md`, `ROADMAP.md` : décrivent les étapes à suivre pour réaliser le projet, avec des jalons et des objectifs clairs. Ces fichiers permettent de guider les agents IA dans la planification et l'organisation du travail.
:::

:::technique Des compétences (_SKILLS_) prêtes à l'emploi pour les agents IA
Le template suit la convention [AGENTS.md](https://agents.md/) et intègre des dossiers `.agents/skills/` qui contiennent des compétences (_SKILLS_) prêtes à l'emploi pour les agents IA, avec des prompts et instructions détaillés pour chaque compétence. Ces compétences couvrent différents aspects du projet, comme la conception de l'application, l'écriture de code, la génération de tests, la correction de bugs, la rédaction de documentation, etc.
Les SKILLS se fondent, dès que c'est possible sur des scripts et outils existants, afin de guider l'agent IA et de ne pas tout faire reposer sur de l'IA générative. Cela permet d'avoir un contrôle plus précis sur le résultat final, de réduire les risques d'erreurs ou de dérives, et de réduire la dépendance à l'IA générative pour des tâches qui peuvent être automatisées de manière fiable avec des scripts et outils existants.
:::





## Créer un projet avec ce template

### 0\. Prérequis

Avant de commencer, il faut avoir installé sur sa machine :

- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/) ou [VSCodium](https://vscodium.com/)
- [Node.js](https://nodejs.org/) (version ≥ 22)
- [npm](https://www.npmjs.com/) (version 8 minimum, ≥ 10 recommandée)

**Astuce** : pour éviter les problèmes de compatibilité de version, il est recommandé d'installer [Volta](https://www.voltajs.com/) ou un outil plus moderne comme [Mise](https://mise.jdx.dev/), afin d'avoir toujours le même environnement de développement quelles que soient la personne et la machine utilisée.

### 1\. Initialiser le projet

Récupérer le template, avec `git clone` ou en téléchargeant l'archive ZIP.

Lancer le script d'initialisation, à la racine du projet :

```bash
bash init.sh
```

Ce script pose quelques questions pour configurer le projet avec vos informations personnelles et vos paramètres, puis installe les dépendances.

:::warning Lancer ce script au tout début, une seule fois !

Sans ce script, vous êtes encore dans le template et non pas dans votre projet personnalisé.

Ce script doit être lancé une seule fois, avant de commencer à coder.

Il ne faut plus le relancer ensuite.
:::

### 2\. Installer les extensions recommandées pour l'éditeur


Ce projet est configuré pour être utilisé avec l’éditeur de code [VS Code](https://code.visualstudio.com/) ou [VSCodium](https://vscodium.com/).

Plusieurs extensions sont recommandées pour vérifier la qualité du code, le formater automatiquement et faciliter le débogage.

Une notification devrait apparaître dans l’éditeur pour proposer d’installer automatiquement les extensions recommandées.

Si ce n’est pas le cas, il faut aller dans le menu `Extensions` de l’éditeur, puis cliquer sur le filtre `Recommended` ou bien taper `@recommended` dans la barre de recherche pour voir les extensions recommandées et les installer.

:::info Extensions recommandées

- [OXC](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) : Lint et formatage du code javascript avec [Oxlint](https://oxc.rs/docs/guide/usage/linter) et [Oxfmt](https://oxc.rs/docs/guide/usage/formatter)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) : Vérification du CSS
- [HTML-Validate](https://marketplace.visualstudio.com/items?itemName=html-validate.vscode-html-validate) : Vérification du HTML
- [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) : Gestion de la syntaxe Svelte pour les composants
- [Cognitive Complexity Show](https://marketplace.visualstudio.com/items?itemName=ampcpmgp.cognitive-complexity-show) : Affichage de la complexité cognitive des fonctions
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) et [Code Spell Checker French](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-french) : Vérification orthographique en français pour les fichiers texte
- [Cucumber Autocomplete](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) : Autocomplétion des steps [Cucumber](https://cucumber.io/) (pour décrire les features qui sont la base des tests end-to-end)

:::

### 3\. Comprendre la structure du projet

#### Arborescence des dossiers

##### Dossiers principaux

```tree
.
├── app/              # Code source de l'application
│   ├── js/           # Code JavaScript
│   ├── css/          # Code CSS
│   └── pwa/          # Fichiers pour le mode PWA (Progressive Web App)
├── dist/             # Compilation de l'application (build)
├── docs/             # Documentation du projet (Markdown)
├── features/         # Scénarios Gherkin pour les tests end-to-end
├── i18n/             # Fichiers pour l’internationalisation (i18n)
├── node_modules/     # Dépendances Node.js (installées par npm)
├── scripts/          # Scripts pour les tâches automatisées
└── tests/
    ├── unit/         # Tests unitaires avec Jasmine
    └── e2e/          # Implémentation E2E avec CodeceptJS
```


##### Dossiers de configuration

```tree
.
├── .agents/          # Compétences (SKILLS) pour les agents IA
├── .gitlab/          # Configuration de templates pour GitLab
├── .husky/           # Hooks Git (qualité du code et commits)
└── .vscode/          # Configuration de l'éditeur VSCode ou VSCodium
```

##### Dossiers générés par des tâches automatisées ou des SKILLS

```tree
.
├── .plan/         # Vision globale + planification pour le projet
├── .release/      # Brouillon pour une release + archives
├── .report/       # Rapports pour différents outils de tests
└── .roadmap/      # Roadmap proposée pour l'évolution du projet
├── .task/         # Données internes pour Taskfile
```

##### Fichiers de configuration principaux

```tree
.
.commitlintrc.mjs          # pour les messages de commit (Commitlint)
.cz.toml                   # pour la gestion des versions (Commitizen)
.editorconfig              # pour le formatage du code
.gitattributes             # Configuration Git
.gitignore                 # Fichiers et dossiers à ignorer par Git
.gitlab-ci.yml             # Pipeline GitLab
.htmlvalidate.json         # Vérification du HTML (HTML-Validate)
.oxfmtrc.json              # Formatage du JavaScript (Oxfmt)
AGENTS.md                  # Convention pour les agents IA
codecept.conf.js           # pour les tests end-to-end (CodeceptJS)
oxlint.config.mjs          # Vérification du JavaScript (Oxlint)
package.json               # Dépendances et scripts Node.js
package-lock.json          # Version exacte des dépendances Node.js
rolldown.config.mjs        # pour la compilation du code (Rolldown)
stylelint.config.mjs       # Vérification du CSS (Stylelint)
Taskfile.yml               # Tâches automatisées avec Task
```

##### Fichiers principaux du projet

```tree
.
CHANGELOG.md           # Historique des changements du projet
CONTRIBUTING.md        # Guide pour contribuer au projet
init.sh                # Script d'initialisation du projet
LICENSE                # Licence du projet
README.md              # Présentation du projet
VERSION                # Version actuelle du projet
```


### 4\. Commencer à coder


Le template est pensé pour un JavaScript modulaire, avec des imports/exports explicites.

L’intérêt est de découper le code en petits fichiers plus simples à lire, à tester et à faire évoluer.

Il est recommandé d’organiser les fichiers de manière logique, par exemple selon un modèle MVC (voir ci-dessous), ou selon les fonctionnalités de l’application.

:::info collapsible Le modèle MVC (Modèle-Vue-Contrôleur)

Le modèle MVC (Modèle-Vue-Contrôleur) est une architecture logicielle qui sépare les responsabilités dans une application :

- Le **Modèle** gère les données et la logique métier.
- La **Vue** est responsable de l’affichage.
- Le **Contrôleur** coordonne les actions entre le Modèle et la Vue (par exemple, lorsqu’un utilisateur interagit avec l’interface).

:::


Le fichier principal est `app/js/main.mjs`. C’est le point d’entrée de l’application : il importe les autres fichiers JavaScript nécessaires au fonctionnement de l’application, mais aussi les styles CSS principaux.

Ces styles peuvent être répartis dans plusieurs fichiers : ils seront regroupés automatiquement en un seul ensemble, dans l’ordre des imports, puis minifiés par l’outil de build.



## Flux de travail au quotidien

### Extensions & tâches automatisées

L'éditeur de code est configuré pour faciliter le travail de développement avec des extensions utiles et des réglages adaptés au projet.

Toutes les tâches répétitives sont automatisées avec [Task](https://taskfile.dev/) et définies dans `Taskfile.yml` :

Toutes ces tâches se lancent dans un terminal avec `task <nom_de_la_tâche>` (si [Task](https://taskfile.dev/) est installé globalement, [voir les instructions](https://taskfile.dev/installation/)) ou avec `npx task <nom_de_la_tâche>`.

Il est recommandé d'utiliser le terminal intégré à l'éditeur de code (qui se trouve par défaut en bas de l'éditeur) pour lancer les tâches, afin de rester dans le même environnement de travail.

### Coder <aside>Fonctionnalités principales</aside>

On code en javascript modulaire, avec des imports/exports explicites. Le code est vérifié au fur et à mesure qu'on l'édite, et formaté automatiquement à chaque sauvegarde (avec [Oxfmt](https://oxc.rs/docs/guide/usage/formatter)).

Une extension ([Cognitive Complexity Show](https://marketplace.visualstudio.com/items?itemName=ampcpmgp.cognitive-complexity-show)) affiche directement dans le code la complexité cognitive des fonctions, pour repérer facilement celles qui mériteraient d'être simplifiées.

Mais surtout, trois outils surveillent la qualité du code en continu, chacun sur son domaine :

- [Oxlint](https://oxc.rs/docs/guide/usage/linter) pour le JavaScript,
- [Stylelint](https://stylelint.io/) pour le CSS,
- [HTML-Validate](https://html-validate.org/) pour le HTML.

Ces *linters* détectent les erreurs, les incohérences et les mauvaises pratiques directement dans l'éditeur : les erreurs apparaissent dans le panneau de problèmes, et les plus graves sont soulignées dans le code. Les règles par défaut sont exigeantes, ce qui pousse à adopter de bonnes pratiques — et pour un agent IA, ces messages précis permettent de se concentrer directement sur la correction plutôt que sur le diagnostic.

:::details Comment désactiver une règle de lint ?
Pour une exception ponctuelle : clic droit sur l'erreur dans VS Code / VSCodium → « Désactiver la règle pour cette ligne » ou « ... pour ce fichier ».

Pour changer une règle globalement, modifier `oxlint.config.mjs` (JS), `stylelint.config.mjs` (CSS) ou `.htmlvalidate.json` (HTML).

⚠️ Il n'est pas recommandé de désactiver une règle sans une bonne raison précise.
:::

### Coder <aside>Fonctionnalités plus avancées</aside>

#### Gérer l'internationalisation (i18n)

**Internationalisation (i18n)** : la gestion des traductions est assurée automatiquement par [ParaGlideJS](https://paraglidejs.com/), déjà préconfiguré. Les fichiers de traduction se trouvent dans `i18n/messages`, et `app/js/main.mjs` montre un exemple d'utilisation ([documentation de ParaGlideJS](https://paraglidejs.com/basics)).

Pour les textes plus longs, le plugin [unplugin-raw](https://github.com/unplugin/unplugin-raw/) permet de les importer directement dans le JavaScript plutôt que dans des variables peu lisibles (exemple dans `app/js/main.js`). Dans ce cas, l'internationalisation doit être gérée manuellement.

#### Gérer le mode PWA (Progressive Web App)

**Mode PWA (Progressive Web App)** : l'application est préconfigurée pour être installable et fonctionner hors ligne. Le service worker (`app/sw.mjs`) gère déjà la mise en cache des fichiers, et peut être adapté aux besoins du projet.

:::details Personnaliser le mode PWA
À faire en priorité :

- `app/pwa/manifest.webmanifest` : nom et description de l'application (déjà fait si `init.sh` a été utilisé), couleurs, liens vers les icônes.
- Les 4 icônes du dossier `app/pwa`.
- `app/pwa/service-worker/swConfig.mjs` : vérifier les fichiers à mettre en cache pour le mode hors ligne :
  - `CRITICAL_PRECACHE_URLS` : fichiers essentiels au fonctionnement hors ligne,
  - `NON_CRITICAL_PRECACHE_URLS` : fichiers non essentiels, mis en cache pour améliorer l'expérience hors ligne.

D'autres réglages sont disponibles dans `swConfig.mjs`, mais ne sont pas nécessaires pour un usage standard.

**Usage avancé** : on peut forcer une stratégie de cache spécifique pour une requête donnée, via un paramètre d'URL `?cache_strategy=STRATEGY` ou un header `X-Cache-Strategy: STRATEGY`.
:::

#### Intégrer des composants Svelte

[Svelte](https://svelte.dev/) est un framework JavaScript moderne pour créer des interfaces réactives et performantes avec une syntaxe simple. Ce template permet d'intégrer des composants Svelte : ils sont automatiquement compilés en composants Web (*Web Components*), utilisables directement dans le JavaScript ou le HTML de l'application.

Pour un premier exemple, voir `app/js/components/DemoSvelte.svelte` et `app/js/main.mjs`. Pour aller plus loin, consulter la [documentation de Svelte](https://sveltefr.dev/tutorial/svelte/welcome-to-svelte).


### Lancer le serveur de développement et déboguer

On peut lancer un serveur de développement local, avec compilation à la volée et rechargement automatique du navigateur avec la commande :

```bash
task dev
```

Pour le débogage, une configuration est déjà fournie pour VSCode / VSCodium dans `.vscode/launch.json` : elle permet de lancer l'application dans le navigateur intégré à l'éditeur, de poser des points d'arrêt (*breakpoints*), d'inspecter les variables et d'exécuter le code pas à pas.

Par défaut, le serveur de développement ne lance pas le service worker qui permet le fonctionnement en mode PWA. Pour le vérifier ou le déboguer, utiliser plutôt :

```bash
task dev:sw
```

### Tester et vérifier son code

On peut faire plusieurs types de tests et vérifications sur le code, pour s'assurer qu'il est correct, performant, sécurisé et conforme aux standards.

#### Lint (Vérification de la qualité du code)

La vérification du code est assurée automatiquement et en continu, avec affichage des erreurs dans l'éditeur. Mais on peut aussi lancer une vérification complète à tout moment.

Pour voir toutes les erreurs et incohérences dans le code, utiliser la commande :

```bash
task lint:all
```

Pour voir uniquement les erreurs bloquantes dans le code source, utiliser la commande :

```bash
task lint:source
```

#### Taille des modules

On peut visualiser le poids de chaque module du projet, afin de repérer les modules trop lourds et d'optimiser le code si nécessaire. Pour cela, utiliser la commande :

```bash
task size
```

#### Tests unitaires

Les tests unitaires vérifient que chaque fonction du code fonctionne correctement, indépendamment des autres fonctions. Ils sont écrits avec [Jasmine](https://jasmine.github.io/) et leur couverture est mesurée avec [c8](https://github.com/bcoe/c8).

On écrit les tests dans le dossier `tests/unit/`, avec un fichier de test par fichier de code source. Les fichiers de test doivent se terminer par `.spec.mjs` et suivre la même structure de dossiers que le code source.

Pour lancer les tests unitaires, utiliser la commande :

```bash
task tests:unit
```

Pour mesurer la couverture des tests unitaires, utiliser la commande :

```bash
task coverage
```

Le rapport de couverture est généré dans `.report/coverage` et s'ouvre automatiquement dans un navigateur dès qu'il est prêt.


#### Tests end-to-end

Les tests end-to-end (E2E) vérifient que l'application fonctionne correctement du point de vue de l'utilisateur, en simulant des interactions avec l'interface.

Ils sont écrits avec [CodeceptJS](https://codecept.io/) et peuvent être rédigés en langage naturel via la syntaxe [Gherkin](https://cucumber.io/docs/gherkin/).

On écrit les tests end-to-end en Gherkin dans le dossier `features/`, avec un fichier `.feature` par scénario. Chaque scénario décrit une fonctionnalité de l'application et les étapes à suivre pour la tester.

Ces scénarios sont ensuite implémentés dans le dossier `tests/e2e/`. On peut marquer certains scénarios avec `@CURRENT` pour les exécuter uniquement si nécessaire.

Pour lancer les tests end-to-end, utiliser les commandes :

```bash
task tests:e2e
```

Pour lancer uniquement les tests end-to-end marqués `@CURRENT`, utiliser la commande :

```bash
task tests:e2e:current
```
#### Conformité ECMAScript

On peut vérifier que le code respecte bien le standard ECMAScript ciblé par le projet, avec les commandes suivantes :

```bash
task ecma:dist     # vérifie le code compilé (dist)
task ecma:source    # vérifie le code source
task ecma           # lance les deux vérifications
```

Pour changer le standard ECMAScript ciblé, modifier la variable `ECMA_VERSION` dans `rolldown.config.mjs`, dans `Taskfile.yml`, et dans la variable `env` de `oxlint.config.mjs`.


#### Accessibilité

On peut vérifier l'accessibilité de l'application avec [pa11y](https://pa11y.org/), un outil qui analyse les pages web et détecte les problèmes d'accessibilité.

Pour lancer la vérification d'accessibilité, lancer d'abord le serveur de développement (`task dev`), puis utiliser ces commandes :

```bash
task a11y             # vérifie la page principale (index.html)
task a11y --/page1     # vérifie une page spécifique du projet
task a11y --URL         # vérifie une page web externe
```

#### Performances

On peut mesurer les performances de l'application avec [Lighthouse](https://github.com/GoogleChrome/lighthouse#using-the-node-cli).

Pour lancer la mesure de performances, lancer d'abord le serveur de développement (`task dev`), puis utiliser la commande :

```bash
task perf
```

#### Sécurité

On peut vérifier la sécurité de l'application avec plusieurs outils : [npm audit](https://docs.npmjs.com/cli/v9/commands/npm-audit), [Semgrep](https://github.com/semgrep/semgrep), [Bearer](https://www.bearer.com/), [Trivy](https://github.com/aquasecurity/trivy).

Pour lancer les vérifications de sécurité, utiliser les commandes suivantes :

```bash
task security:audit      # vulnérabilités des dépendances (npm audit)
task security:semgrep     # analyse statique du code (semgrep)
task security:bearer       # analyse de sécurité (bearer)
task security:trivy         # analyse de sécurité (trivy)
task security                # toutes les vérifications en une commande
```


#### Compression des images

On peut compresser les images pour réduire leur taille et améliorer les performances de l'application. Le template est pré-configuré pour utiliser [pngquant](https://pngquant.org/) pour les images PNG, [jpegoptim](https://github.com/tjko/jpegoptim) pour les images JPEG et [SVGO](https://svgo.dev/) pour les images SVG (à installer au préalable) :

```bash
task images:compress
```

### Pousser ses modifications et déployer son application

#### Convention de commit utilisée par le projet

Les messages de commit doivent suivre la convention [Conventional Commits](https://www.conventionalcommits.org/fr).


:::info La convention _Conventional Commits_
- Pour une nouvelle fonctionnalité : `feat(scope): description`
- Pour une correction de bug ou une amélioration mineure : `fix(scope): description`
- Pour de la maintenance ou de la configuration : `chore: description`
- Pour de la documentation : `docs: description`
- Pour des corrections qui ne doivent pas apparaître dans le CHANGELOG (corrections typographiques par exemple) : `edit: description`
:::

:::info Le scope
Le `scope` est un mot-clé qui permet de préciser la partie du projet concernée par le commit. Il peut être le nom d'un fichier, d'un module, d'une fonctionnalité ou d'une section du projet.
Il est obligatoire pour `feat` et `fix`, optionnel, mais recommandé pour les autres types de commit.
:::

:::info Faire évoluer l'application vers une nouvelle version majeure
On peut ajouter un point d'exclamation `!` après le type de commit pour indiquer qu'il s'agit d'un changement majeur qui fait évoluer l'application vers une nouvelle version majeure.

Par exemple : `feat(scope)!: description`

Généralement, on l'utilise seulement avec `feat`, mais on peut aussi l'utiliser avec un autre type de commit si on estime que le changement est suffisamment important pour justifier une nouvelle version majeure.
:::

#### Pousser ses modifications sur les dépôts Git

Pour pousser ses modifications sur son ou ses dépôts Git, il est recommandé d'utiliser la commande `task push`.


```bash
task push
```

Avant de pousser les modifications, plusieurs vérifications sont effectuées automatiquement via des hooks Husky et des tâches automatisées : vérification de la qualité du code (`task lint:all`), conformité au standard ECMAScript ciblé (`task ecma`), exécution des tests unitaires (`task test:unit`) et end-to-end (`task test:e2e`).

Le push se fait sur les dépôts Git configurés (variable `GIT_REPO_NAMES` dans `Taskfile.yml`), et qui ont été initialisés lors de l'exécution du script `init.sh`.

#### Compilation et déploiement automatisés

Lorsqu'on pousse les modifications sur un dépôt GitLab, comme celui de la Forge des Communs Numériques Éducatifs, un pipeline préconfiguré s'exécute automatiquement pour compiler et déployer l'application.

Défini dans `.gitlab-ci.yml`, le pipeline est organisé en plusieurs étapes : vérification de la qualité du code, tests unitaires et end-to-end, puis compilation et déploiement.

La compilation est assurée par [Rolldown](https://rolldown.rs/) et [ParaGlideJS](https://paraglidejs.com/), qui produisent des fichiers JavaScript et CSS optimisés et minifiés, ainsi que les fichiers de traduction.

Les fichiers compilés sont également compressés via le pipeline pour réduire leur taille et améliorer les performances de l'application.

### Faire une montée de version

Le template est configuré pour utiliser la convention [Semantic Versioning](https://semver.org/lang/fr/) pour la gestion des versions de l'application.

:::info La convention _Semantic Versioning_
Cette convention utilise trois nombres séparés par des points pour indiquer la version de l'application : `MAJOR.MINOR.PATCH` (exemple : 1.2.5).

- **Major** : version majeure, qui indique des changements importants ou incompatibles avec les versions précédentes.
- **Minor** : version mineure, qui indique des ajouts de fonctionnalités ou des améliorations importantes (et compatibles avec les versions précédentes),
- **Patch** : version patch, qui indique des corrections de bugs ou des améliorations mineures,
:::

Quand on a fait plusieurs modifications et qu'on veut publier une nouvelle version de l'application, on peut faire une montée de version avec la commande `task bump`.

Cette commande nécessite l'installation de [Commitizen](https://commitizen-tools.github.io/commitizen/#installation).


:::info Ce que fait `task bump`
Quand on lance `task bump`, plusieurs actions sont effectuées automatiquement :

1. calcul automatique de la nouvelle version,
2. création d'un tag Git correspondant,
3. mise à jour du numéro de version dans `.cz.toml`, `VERSION`, `package.json`, `package-lock.json` et dans `app/pwa/service-worker/swConfig.mjs` (configuration du service worker pour le mode PWA)
4. génération automatique du `CHANGELOG.md` avec les changements depuis la version précédente.
:::


:::info Calcul automatique de la nouvelle version
La nouvelle version est calculée ainsi :
- S'il y a un commit avec un point d'exclamation `!`, la version majeure est incrémentée (exemple : 1.2.5 → 2.0.0).
- Sinon, s'il y a un commit de type `feat`, la version mineure est incrémentée (exemple : 1.2.5 → 1.3.0).
- Sinon, s'il y a un commit de type `fix`, la version patch est incrémentée (exemple : 1.2.5 → 1.2.6).
- Sinon, la version reste inchangée.
:::


Pour que les tags soient poussés sur le dépôt Git, utiliser `task push` (de préférence) après avoir monté la version, ou directement `git push origin && git push origin --tags`



### Travailler avec des agents IA

#### Convention AGENTS.md

Le projet est configuré pour être utilisé avec des agents IA, en suivant la convention `AGENTS.md` :

- **`AGENTS.md`** joue le rôle d'un `README.md` à destination des agents IA : il explique les conventions et bonnes pratiques du projet.
- **`.agents/skills/<skill_name>`** contient les compétences (`SKILLS`) de l'agent, chacune avec ses prompts et instructions.

Si l'outil d'agent IA utilisé ne suit pas la convention `AGENTS.md`, il suffit généralement de copier les fichiers de configuration dans la structure attendue par cet outil.

#### Des SKILLS préconfigurées pour le projet

Dans la plupart des outils d'agents IA, il est possible d'utiliser des commandes pour appeler ces SKILLS, en utilisant tout simplement le nom de la compétence, qui correspond au nom du dossier dans `.agents/skills/`.

Par exemple : `/fix-this` pour corriger un bug, ou `/roadmap` pour générer un plan d'évolution du projet.

Voici les SKILLS préconfigurés pour ce projet :

:::info SKILLS disponibles
- `code` : écrire du code en respectant les conventions du projet
- `css` : écrire ou vérifier du code CSS
- `design-md` : écrire ou améliorer un fichier `DESIGN.md`
- `documentation` : générer de la documentation technique ou utilisateur
- `e2e-test` : générer des tests end-to-end pour une fonctionnalité
- `fix-this` : corriger un bug dans le code
- `optimize-this` : optimiser le code pour les performances
- `refactor-this` : refactoriser le code existant
- `release-draft` : générer un brouillon de release
- `review-this` : générer une revue de code
- `roadmap` : générer un plan d'évolution du projet
- `think-and-plan` : aider à la réflexion et à la planification d'une nouvelle fonctionnalité
- `unit-test` : générer des tests unitaires pour une fonction
:::
