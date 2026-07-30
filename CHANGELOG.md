## 3.2.2 (2026-07-30)

### Fix

- **test**: correctif pour le serveur de test afin d'éviter url.parse()
- **lint**: ajout d'une tâche pour afficher seulement dans le lint les erreurs bloquantes sur tous les fichiers
- **lint**: règles pour le lint (max 3 paramètres pour une fonction, et réassignation d'un paramètre signalée)

### Chore

- mise à jour des fichiers de configuration codeceptJS en ESM
- ajout d'un mot autorisé pour cSpell
- pin des versions de Node et NPM avec Volta

### Docs

- amélioration de la description initiale
- ajout recommandation pour utilisation de Volta (gestion des versions Node et npm

### Refactor

- **lint**: fonction plus générale pour modifier la sévérité des règles d'un plugin

## 3.2.1 (2026-07-29)

### Fix

- **lint**: ajout de règles du plugin "oxc"
- **lint**: ajout des plugins par défaut (dont "oxc") + "promise"
- **lint**: maximum de lignes pour une fonction fixé à 150
- **playwright**: retour à une version antérieure de Playwright + hack si le téléchargement des navigateurs ne fonctionne plus

### Chore

- ajout d'un mot autorisé pour cSpell

### Docs

- mise à jour et organisation plus claire du CONTRIBUTING
- explication du mode pour debugger
- précisions pour le lint dans l'IDE
- distinction des dossiers principaux et des dossiers de configuration (qui commencent par un point)
- précision sur l'IDE à installer et qui est préconfiguré

## 3.2.0 (2026-07-28)

### Feat

- **IDE**: configuration du mode DEBUG

### Fix

- **build**: paramètre corrigé pour minify

### CI

- correctif pour le job ecma-dist pour qu'il ait les artefacts du job prepare et du job build
- décomposition du stage "code" en plusieurs jobs : format-check, lint, ecma-source

## 3.1.1 (2026-07-28)

### Fix

- **task**: les tâches pour formater les fichiers s'appliquent à tous les fichiers
- **ecma**: tâches pour vérifier la conformité ECMA soit sur les fichiers sources, soit sur les fichiers compilés dans "dist"
- **ecma**: build dans la version ECMAscript souhaitée
- **IDE**: ajout de l'extension pour la validation du HTML

### CI

- meilleure prise en compte de la vérification ECMA et optimisation (les tests unitaires peuvent être lancés en parallèle, sans attendre le build)

### Chore

- utilisation de constantes pour définir la version ECMA utilisée
- **IDE**: on force l'utilisation d'OXC pour le HTML, le CSS, le Javascript et le Markdown
- mise à jour package-lock.json
- **lint**: ajout paramètre eslint/no-param-reassign

### Docs

- précision sur les tâches pour la vérification ECMA du code source et du code compilé + comment on peut changer le standard utilisé

### Perf

- **build**: minification avec option mangle pour renommer les variables et fonctions avec des noms très courts

## 3.1.0 (2026-07-28)

### Feat

- **lint**: validation du HTML avec html-validate
- **ci**: organisation de la CI en plusieurs stages + optimisation

### Fix

- **ci**: stage de déploiement amélioré
- **ci**: conservation des modules nodes dans des artefacts pour les rendre disponibles dans chaque stage
- **task**: ajout d'une tâche de check du format
- **lint**: mode SHOW_MAIN_ERRORS_ONLY pour le lint plutôt que ERRORS_ONLY
- **husky**: désactivation des contraintes de nombre de lignes ou de caractères pour les commits
- **husky**: le message indique la cause de l'erreur si le commit n'a pas été accepté

### Chore

- **deploy**: déplacement du script de compression dans un dossier .config/deploy
- **lint**: ajout de règles Eslint pour Oxlint

## 3.0.3 (2026-07-28)

### Fix

- **lint**: constante ajoutée pour définir les fichiers à ignorer
- **lint**: règles spécifiques pour le dossier des tests unitaires
- **lint**: règle no-undef ajoutée dans les règles de base
- **lint**: amélioration de la gestion des catégories dans la configuration d'Oxlint

### Chore

- **lint**: simplification de la configuration du defaultFormater dans l'IDE
- **lint**: ajout de commentaires pour expliquer la configuration du lint
- **lint**: constante pour définir les règles de lint pour le dossier "test"
- **lint**: utilisation de "env" plutôt que globals pour les variables globales + configuration es2020 pour les fichiers dans app
- **lint**: correctif pour les erreurs de lint
- **lint**: configuration pour la catégorie "pedantic" à propos du nombre maximum de lignes pour une fonction
- message d'information plus adéquat en cas d'impossibilité de lancer les tests e2e
- ajout d'une description pour une tâche
- **lint**: précisions pour les tâches de lint

## 3.0.2 (2026-07-27)

### Fix

- **security**: correctif de sécurité pour corriger les points relevés par Bearer

### Chore

- **lint**: correction des erreurs de lint
- **lint**: amélioration des règles de lint (no-magic-number autorise -0, 0 et 1 + règle pour les imports dans les tests)
- **lint**: amélioration règles oxlint pour les tests
- **lint**: amélioration du lint (règles de base + snakeCase pour les fichiers tests)
- **lint**: lint des fichiers de configuration du build
- ajout règle no-unused-vars
- **lint**: règles pour les imports
- **lint**: unicorn-file-name-case pour tous les fichiers
- ajout d'un mot autorisé pour cspell
- **task**: ajout d'une tâche pour examiner la sécurité du code avec Bearer
- update package-lock.json
- **IDE**: fix de certains paramètres pour l'extension OXC

### Refactor

- simplification de l'écriture des constantes
- **build**: déplacement dans des modules de la logique de création du plugin de minification des fichiers CSS + des accès sécurisés aux fichiers

## 3.0.1 (2026-07-27)

### Fix

- **IDE**: nom corrigé pour une extension

### Chore

- task simplifiée pour l'installation de Playwright
- update package-lock.json

## 3.0.0 (2026-07-27)

### Fix

- **task**: gestion du cas où les tests ne peuvent pas être lancés (possibilité de ne pas bloquer le push malgré tout)
- **IDE**: suppression d'une extension qui ne fonctionnait pas bien (pour la coloration syntaxique dans les variables texte)
- **build**: récupération des fichiers CSS importés, sans commenter puis décommenter le contenu de main.mjs

### Chore

- suppression de paquets inutiles depuis le passage à Rolldown
- mise à jour du format via oxfmt
- ajout d'une tâche format:staged pour le hook git pre-commit
- tâche "format" dans Taskfile
- printWidth configuré à 80 pour oxfmt
- update package-lock.json
- **IDE**: suppression de settings inutiles
- suppression de post-ccs, inutile depuis le passage à rolldown
- update package-lock.json

### Docs

- précision sur "task" vs "npx task"

### Perf

- **lint**: migration de ESlint vers Oxlint et de Prettier vers Oxfmt

## 2.3.0 (2026-07-24)

### Feat

- **task**: ajout d'une tâche pour voir la taille des différents modules dans le fichier compilé
- **gitlab**: ajout de templates pour les issues, le service desk, et pour le déploiement de l'application dans un autre dépôt
- **tests**: tâche pour créer un rapport de couverture de code (coverage) avec c8

### Fix

- **vscode**: ajout de l'extension code-spell-checker pour la correction de l'orthographe dans les fichiers de type texte
- **css**: ajout de Stylelint pour la vérification du CSS

### Chore

- **Taskfile**: ajout d'une description pour chaque tâche

### Docs

- explications pour la tâche de visualisation de la taille des modules
- amélioration de la formulation
- explications pour la couverture de code avec c8

## 2.2.0 (2026-07-24)

### Feat

- **perf**: ajout d'une tâche pour mesurer les performances (avec Lighthouse)
- **security**: ajout de tâches pour vérifier la sécurité de l'application
- **a11y**: tâche pour vérifier l'accessibilité

### Fix

- **build**: sécurisation de la récupération des fichiers CSS
- **build**: config rollwodnwcorrigée pour permettre le rebuild en mode dev (avec prise en compte des fichiers CSS)
- **ecma**: cohérence version ECMA visée (2020)

### Chore

- ajout de "silent: true" pour certaines tâches

### Docs

- explications pour les tâches de mesure de performance avec Lighthouse
- distinction des fonctions principales et de l'automatisation des tâches + précision sur les tâches automatisées

## 2.1.3 (2026-07-23)

### Fix

- **lint**: exclusion pour le lint des fichiers et dossiers qui sont dans le .gitignore
- **app**: ajout d'un fichier robots.txt par défaut
- **lint**: configuration de prettier dans prettier.config.mjs plutôt que .prettierrc

## 2.1.2 (2026-07-23)

### Fix

- **build**: amélioration de la sécurité pour la récupération des fichiers CSS sans globSync
- **build**: sécurisation de la récupération des fichiers CSS sans globSync

### Docs

- ajout d'un fichier CONTRIBUTING
- ajout de la référence à la licence
- ajout documentation pour la tâche de compression des images
- précision pour l'installation de Commitizen pour la tâche "bump"

## 2.1.1 (2026-07-23)

### Fix

- **lint**: ajout des règles de @e18e/eslint-plugin en mode "warning"
- **build**: sécurisation du bundle des fichiers CSS

### Chore

- **lint**: regex dans une constante

## 2.1.0 (2026-07-23)

### Feat

- **css**: gestion des imports CSS et bundle avec minification dans le fichier CSS principal

### Fix

- **lint**: utilisation du plugin @stylistic
- **lint**: règles unicorn désactivées pour un fichier de configuration CodeceptJS
- **rolldown**: config simplifiée et sécurisée pour la récupération des fichiers CSS
- **task**: ajout d'une tâche pour vérifier les dépendances

### Chore

- précision des versions de node et npm à utiliser

### Docs

- précisions sur le javascript modulaire et l'import des fichiers CSS

## 2.0.3 (2026-07-23)

### Fix

- **ci**: actualisation de la version de node pour pouvoir faire le build de l'application
- **tests**: patch pour l'installation de playwright quand certains navigateurs ne peuvent pas être installés
- **lint**: ajout du plugin unicorn pour ESlint

### Chore

- ajout de .npm dans .gitignore
- précision de la fonction de chaque extension
- corrections erreurs ESlint pour le serveur de test

### Docs

- précision sur l'extension de calcul de la complexité des fonctions
- précision sur la manière de pousser les tags git
- amélioration partie sur la montée de version
- réécriture plus claire et plus précise de la documentation
- petites améliorations de la documentation

## 2.0.2 (2026-07-22)

### Fix

- **codceptJS**: mise à jour du fichier de configuration
- **vscode**: config debug avec vscode
- **task**: ajout d'un dépôt remote

### Chore

- **lint**: fichier .eslintignore deprecated
- mise à jour des dépendances
- **lint**: pas de camel-case imposé pour les variables de configuration de Jasmine
- règle eslint inutile

### Test

- fix typo

## 2.0.1 (2026-07-22)

### Fix

- **e2e**: mode verbose pour les tests e2e:current
- **lint**: intégration des constantes de codeceptjs pour éviter les erreurs no-undef
- **e2e**: option bail:true pour arrêter les tests e2e dès que l'un des tests plante

### Chore

- update package-lock.json

## 2.0.0 (2026-07-22)

### Fix

- **eslint**: fix pour la prise en charge des variables node
- **rollup**: ajout d'un délai pour permettre le livereload
- **IDE**: ajout d'une extension de syntax highlighting pour le HTML et le CSS dans des chaînes de caractères en JS

### Perf

- **build**: migration de rollup à rolldown + lightningcss

## 1.4.0 (2026-07-22)

### Feat

- **rollup**: ajout d'un serveur de développement + amélioration de la configuration

### Fix

- **rollup**: amélioration config du serveur de développement
- **lint**: amélioration config ESlint
- **rollup**: minification des noms de variable
- **e2e**: le serveur de test autorise tous les fichiers dans le dossier "dist"

### Docs

- mise à jour de la documentation (serveur de développement)

## 1.3.0 (2026-07-21)

### Feat

- **complexity**: ajout d'une extension pour calculer et afficher automatiquement la complexité des fonctions JS
- **commitlint**: utilisation de commitlint pour vérifier les commits

### Fix

- **commitlint**: possibilité d'avoir un message de commit plus long
- **rollup**: copie de app dans dist
- **cz**: cohérence des types de commit
- **husky**: amélioration du message en cas d'erreur
- **cz**: mise en cohérence des types autorisés de commits

### Chore

- suppression de la version minififiée des styles CSS dans "app"
- ajout d'une tâche pour obtenir l'arborescence du répertoire

### Docs

- mise à jour de la documentation

## 1.2.0 (2026-07-21)

### Feat

- **husky**: configuration de husky pour vérifier les commits

### Fix

- typo pour le script de tests
- **ci**: construction de l'application dans dist, puis déplacement de dist dans public
- déplacement du fichier de configuration du serveur de test e2e dans le dossier de test e2e
- déplacement du build final dans "dist"
- ajout d'ESlint comme package
- tâche server:stop (forcer l'utilisation de bash pour kill le processus)

## 1.1.1 (2026-01-18)

### Fix

- précisions pour la configuration de VSCodium
- ajout d'une recommandation d'extension ESlint

## 1.1.0 (2026-01-04)

### Feat

- ajout de tâches de compression des images

### Fix

- ajout de la définition du plugin codeceptjs
- utilisation de la variable APP_FOLDER pour la tâche de lint
- wildcard possible pour définir la liste des fichiers autorisés
- variable pour la définition du dossier de l'application
- ajout de recommandations d'extensions pour l'IDE
- précisions dans le README sur les prérequis, les principes de développement, les commits, les commandes task

## 1.0.0 (2025-12-13)

### Feat

- **template**: première mise en place du template

### Fix

- **ci**: déplacement de "app" vers racine
- **ci**: création du dossier "public"
