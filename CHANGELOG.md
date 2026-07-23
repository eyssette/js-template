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
- **IDE**: ajout d'une extension de syntax highlighting pour le HTML  et le CSS dans des chaînes de caractères en JS

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
