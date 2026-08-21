# JS Template

JS Template est un **environnement de développement JavaScript** pré-configuré et optimisé pour bien démarrer un projet avec de bonnes pratiques et tous les outils nécessaires !

## Documentation

La documentation complète pour utiliser ce template est disponible ici : [documentation de JS Template](https://eyssette.forge.apps.education.fr/js-template/docs)


## Fonctionnalités principales

### Tout ce qu'il faut pour développer une application web moderne

**Qualité du code vérifiée en continue et formatage automatique** 
L'éditeur de code est configuré pour vérifier en continu la qualité du code (repérer les erreurs, les incohérences et les mauvaises pratiques) et le formater automatiquement à chaque sauvegarde. 

<details><summary>Détails techniques</summary>
L'environnement s'appuie sur <a href="https://oxc.rs/docs/guide/usage/linter">Oxlint</a> pour le linting JavaScript (analyse statique rapide écrite en Rust), <a href="https://stylelint.io/">Stylelint</a> pour le CSS et <a href="https://html-validate.org/">HTML-Validate</a> pour le HTML. Le formatage est assuré par <a href="https://oxc.rs/docs/guide/usage/formatter">Oxfmt</a> (également en Rust), configuré pour s'exécuter automatiquement à chaque sauvegarde dans VS Code / VSCodium.
</details>


**Internationalisation (i18n)**
Le template est pré-configuré pour gérer l'internationalisation (i18n).
Votre application peut ainsi être traduite dans plusieurs langues, avec un système de fichiers de messages et un outil de compilation automatique qui permet de gérer facilement les traductions.


<details><summary>Détails techniques</summary>
La couche de traduction est gérée par <a href="https://paraglidejs.com/">ParaGlideJS</a> avec des fichiers de messages dans `i18n/messages`. Pour les longs textes statiques, le plugin <a href="https://github.com/unplugin/unplugin-raw/">unplugin-raw</a> permet d'importer directement des fichiers bruts (`.txt`, `.html`, etc.) dans le JavaScript, ce qui facilite la maintenance.
</details>


**Mode PWA (Progressive Web App)**
Le template est pré-configuré pour le mode PWA, ce qui permet à l'application d'être installée sur un appareil et de fonctionner hors ligne, avec un système de mise en cache des fichiers.

<details><summary>Détails techniques</summary>
Un <a href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API">Service Worker</a> préconfiguré (`app/sw.mjs`) et un fichier `manifest.webmanifest` sont fournis. Le script de service worker utilise différentes stratégies de cache selon le type de ressources, et il est paramétrable via `swConfig.mjs` pour adapter les URLs à mettre en cache.
</details>


**Intégration de composants Svelte**
Si votre projet est un peu plus complexe et nécessite des interfaces plus riches, vous pouvez intégrer des composants Svelte, qui permettent de créer des interfaces réactives et performantes avec une syntaxe simple.

<details><summary>Détails techniques</summary>
Les composants <a href="https://svelte.dev/">Svelte</a> (fichiers `.svelte`) sont compilés par _Rolldown_ en _Web Components standard_. Ils peuvent ainsi être utilisés directement dans le code HTML/JavaScript de l'application sans framework additionnel, ce qui permet d'enrichir progressivement l'interface avec des composants réactifs.
</details>


### Tout ce qu'il faut pour déployer et gérer son projet

**Compilation rapide et application automatiquement optimisée**
Le code est compilé et optimisé automatiquement pour produire une application finale légère et performante, avec un temps de compilation minimale.

<details><summary>Détails techniques</summary>
Le bundler <a href="https://rolldown.rs/">Rolldown</a> (successeur de Rollup écrit en Rust et beaucoup plus rapide) produit des fichiers JavaScript et CSS optimisés et minifiés.
</details>


**Outils de tests intégrés**
L'environnement est pré-configuré pour pouvoir exécuter des tests unitaires (qui vérifient chaque fonction séparément) et des tests _end-to-end_ (qui simulent le parcours d'un utilisateur). Un rapport indique quelles parties du code sont bien couvertes par ces tests.

<details><summary>Détails techniques</summary>
Les tests unitaires sont exécutés avec <a href="https://jasmine.github.io/">Jasmine</a> et leur couverture est mesurée par <a href="https://github.com/bcoe/c8">c8</a>. Les tests end-to-end reposent sur <a href="https://codecept.io/">CodeceptJS</a> et peuvent être rédigés en langage naturel via la syntaxe <a href="https://cucumber.io/docs/gherkin/">Gherkin</a> (fichiers `.feature`), ce qui facilite la description des parcours utilisateurs.
</details>


**Automatisation des tâches courantes**
Des scripts automatisés permettent de lancer toutes les tâches courantes (serveur de développement, compilation, tests, push, déploiement, vérifications d'accessibilité, de sécurité et de performances) avec un simple commande.

<details><summary>Détails techniques</summary>
<a href="https://taskfile.dev/">Taskfile</a> (Task) centralise l'ensemble des scripts du projet dans un fichier `Taskfile.yml` (format YAML). Il permet de lancer en une commande (`task <nom>`) des actions comme le serveur de développement (`dev`), la compilation (`build`), l'exécution des tests (`tests`), la vérification de sécurité (`security`), la mesure de performances (`perf`), etc.
</details>


**Commits, gestion des versions et génération automatique du CHANGELOG**
Le template utilise une convention standard pour les messages de commit, afin de faciliter la compréhension des changements apportés à l'application et de permettre l'automatisation de la gestion des versions.
Quand l'application évolue, on peut faire une montée de version. Le template calcule automatiquement le nouveau numéro de version et génère le CHANGELOG à partir de l'historique des commits.

<details><summary>Détails techniques</summary>
<a href="https://typicode.github.io/husky/">Husky</a> et <a href="https://commitlint.js.org/">Commitlint</a> imposent des messages de commit au format *Conventional Commits* avant chaque commit, et <a href="https://commitizen-tools.github.io/commitizen/">Commitizen</a> génère automatiquement le `CHANGELOG.md` à partir de l'historique quand on fait une montée de version.
</details>

**Génération d'un site de documentation**
Vous pouvez écrire la documentation de votre projet dans des fichiers Markdown dans le dossier `docs/`, et le template génère automatiquement un site web de documentation à partir de ces fichiers.

<details><summary>Détails techniques</summary>
Le template utilise <a href="https://markpage.forge.apps.education.fr">Markpage</a> pour générer le site de documentation à partir des fichiers Markdown.
</details>


### Tout ce qu'il faut pour travailler avec des agents IA

**Des conventions pour guider les agents IA**
Au lieu de laisser les agents IA deviner la structure du projet, le template propose un fichier général préconfiguré (`AGENTS.md`) qui explique les conventions et bonnes pratiques du projet.
Il permet aussi de générer des fichiers de configuration pour définir sa vision générale du projet (`VISION.md`), le design de l'application (`DESIGN.md`), les étapes à suivre (`PLAN.md`), la roadmap du projet (`ROADMAP.md`) afin que les agents IA puissent travailler plus efficacement. 

<details><summary>Détails techniques</summary>
Le template utilise plusieurs fichiers Markdown pour guider les agents IA dans la compréhension du projet et de ses conventions. C'est une forme de _context engineering_ qui permet aux agents IA de travailler plus efficacement et de respecter les bonnes pratiques du projet.
Le template suit la convention [AGENTS.md](https://agents.md/) qui s'intégrera au _system prompt_ de l'agent IA pour lui fournir le contexte nécessaire à la compréhension du projet.
On peut aussi générer et utiliser des fichiers de configuration supplémentaires.
- `VISION.md` : décrit la vision générale du projet, les objectifs et les contraintes, de manière simple. On peut bien sûr si on le souhaite utiliser des méthodologies plus complexes et formelles pour créer son cahier des charges, mais le choix d'une vision simple et claire est souvent déjà suffisant pour que les agents IA puissent travailler efficacement.
- `DESIGN.md` : décrit le design de l'application, en suivant la convention [design.md](https://github.com/google-labs-code/design.md), qui permet d'avoir une interface cohérente et de guider les agents IA dans la création des composants CSS et HTML.
- `PLAN.md`, `ROADMAP.md` : décrivent les étapes à suivre pour réaliser le projet, avec des jalons et des objectifs clairs. Ces fichiers permettent de guider les agents IA dans la planification et l'organisation du travail.
</details>


**Des compétences (_SKILLS_) prêtes à l'emploi pour les agents IA**
Le template est pré-configuré pour être utilisé avec des agents IA, avec des compétences (_SKILLS_) prêtes à l'emploi pour concevoir l'application, écrire du code, générer des tests, corriger des bugs, rédiger de la documentation …

<details><summary>Détails techniques</summary>
Le template suit la convention [AGENTS.md](https://agents.md/) et intègre des dossiers `.agents/skills/` qui contiennent des compétences (_SKILLS_) prêtes à l'emploi pour les agents IA, avec des prompts et instructions détaillés pour chaque compétence. Ces compétences couvrent différents aspects du projet, comme la conception de l'application, l'écriture de code, la génération de tests, la correction de bugs, la rédaction de documentation, etc.
Les SKILLS se fondent, dès que c'est possible sur des scripts et outils existants, afin de guider l'agent IA et de ne pas tout faire reposer sur de l'IA générative. Cela permet d'avoir un contrôle plus précis sur le résultat final, de réduire les risques d'erreurs ou de dérives, et de réduire la dépendance à l'IA générative pour des tâches qui peuvent être automatisées de manière fiable avec des scripts et outils existants.
</details>


## Crédits et licence


[JS-template](https://forge.apps.education.fr/eyssette/js-template) est un projet créé par [Cédric Eyssette](https://eyssette.forge.apps.education.fr), et diffusé sous licence libre MIT.

Il repose sur de nombreux logiciels libres, référencés dans la documentation.

Merci à Thomas Sanson, de l'Incubateur de l'Éducation nationale, pour ses nombreux conseils !