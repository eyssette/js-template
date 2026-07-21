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
