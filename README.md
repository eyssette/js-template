# JS Template

JS Template est un **environnement de développement JavaScript** pré-configuré et optimisé pour bien démarrer un projet avec de bonnes pratiques et tous les outils nécessaires !

## Documentation

La documentation complète pour utiliser ce template est disponible ici : [documentation de JS Template](https://eyssette.forge.apps.education.fr/js-template/docs)

## Fonctionnalités principales

### Tout ce qu'il faut pour développer une application web moderne

- **Qualité du code vérifiée en continue et formatage automatique** : L'éditeur de code est configuré pour vérifier en continu la qualité du code (repérer les erreurs, les incohérences et les mauvaises pratiques) et le formater automatiquement à chaque sauvegarde. 
-  **Internationalisation (i18n)** : Le template est pré-configuré pour gérer l'internationalisation (i18n). Votre application peut ainsi être traduite dans plusieurs langues, avec un système de fichiers de messages et un outil de compilation automatique qui permet de gérer facilement les traductions.
- **Mode PWA (Progressive Web App)** : Le template est pré-configuré pour le mode PWA, ce qui permet à l'application d'être installée sur un appareil et de fonctionner hors ligne, avec un système de mise en cache des fichiers.
- **Intégration de composants Svelte** : Si votre projet est un peu plus complexe et nécessite des interfaces plus riches, vous pouvez intégrer des composants Svelte, qui permettent de créer des interfaces réactives et performantes avec une syntaxe simple.

### Tout ce qu'il faut pour déployer et gérer son projet

- **Compilation rapide et application automatiquement optimisée** : Le code est compilé et optimisé automatiquement pour produire une application finale légère et performante, avec un temps de compilation minimale.
- **Outils de tests intégrés** : L'environnement est pré-configuré pour pouvoir exécuter des tests unitaires (qui vérifient chaque fonction séparément) et des tests _end-to-end_ (qui simulent le parcours d'un utilisateur). Un rapport indique quelles parties du code sont bien couvertes par ces tests.
- **Automatisation des tâches courantes** : Des scripts automatisés permettent de lancer toutes les tâches courantes (serveur de développement, compilation, tests, push, déploiement, vérifications d'accessibilité, de sécurité et de performances) avec un simple commande.
- **Commits, gestion des versions et génération automatique du CHANGELOG** : Le template utilise une convention standard pour les messages de commit, afin de faciliter la compréhension des changements apportés à l'application et de permettre l'automatisation de la gestion des versions. Quand l'application évolue, on peut faire une montée de version. Le template calcule automatiquement le nouveau numéro de version et génère le CHANGELOG à partir de l'historique des commits.
- **Génération d'un site de documentation** : Vous pouvez écrire la documentation de votre projet dans des fichiers Markdown dans le dossier `docs/`, et le template génère automatiquement un site web de documentation à partir de ces fichiers.


### Tout ce qu'il faut pour travailler avec des agents IA

- **Des conventions pour guider les agents IA** : Au lieu de laisser les agents IA deviner la structure du projet, le template propose un fichier général préconfiguré (`AGENTS.md`) qui explique les conventions et bonnes pratiques du projet. Il permet aussi de générer des fichiers de configuration pour définir sa vision générale du projet (`VISION.md`), le design de l'application (`DESIGN.md`), les étapes à suivre (`PLAN.md`), la roadmap du projet (`ROADMAP.md`) afin que les agents IA puissent travailler plus efficacement. 
- **Des compétences (_SKILLS_) prêtes à l'emploi pour les agents IA** : Le template est pré-configuré pour être utilisé avec des agents IA, avec des compétences (_SKILLS_) prêtes à l'emploi pour concevoir l'application, écrire du code, générer des tests, corriger des bugs, rédiger de la documentation …


## Détails techniques

Tous les outils utilisés dans ce template sont des logiciels libres, et la plupart sont installés automatiquement par le gestionnaire de paquets `npm` (Node.js). 

Consultez la documentation pour plus de détails techniques sur le fonctionnement du template et la manière de l'utiliser: [documentation de JS Template](https://eyssette.forge.apps.education.fr/js-template/docs)


## Licence

[JS-template](https://forge.apps.education.fr/eyssette/js-template) est un projet créé par [Cédric Eyssette](https://eyssette.forge.apps.education.fr), et diffusé sous licence libre MIT.

Il repose sur de nombreux logiciels libres, référencés dans la documentation.

## Remerciements

Merci à : 
- Thomas Sanson, de l'Incubateur de l'Éducation nationale, pour ses nombreux conseils sur un autre projet ([ChatMD](https://forge.apps.education.fr/chatmd/chatmd.forge.apps.education.fr), qui ont permis à celui-ci d'exister !
- Gilles Cormi, pour avoir permis de corriger et améliorer le script d'initialisation et le hook de pré-commit.