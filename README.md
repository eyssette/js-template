# JS Template

Un template pour un projet en Javascript fondé sur de bonnes pratiques de développement.

Le template est préconfiguré avec :
- une compilation avec Rollup
- des tests unitaires avec Jasmine
- des tests _end-to-end_ avec CodeceptJS et des _features_ rédigées en Gherkin
- un linter avec ESLint
- une gestion des tâches avec Taskfile
- une intégration continue dans Gitlab

## Prérequis

1. Installer Node.js et npm
2. Installer les dépendances du projet

```bash
npm install
```

## Principes de développement

On écrit son code dans le dossier `app`.
On utilise du javascript modulaire (ESM), avec des `import` et des `export`.
Pour compiler le code, on utilise Rollup et la tâche `task build`.

On écrit les tests dans le dossier `tests` : 
- les tests unitaires dans `tests/unit`
- les tests _end-to-end_ dans `features` en langage naturel avec Gherkin, et leur implémentation dans `tests/e2e`

## Commits

On écrit des messages de commit clairs et structurés selon la convention [Conventional Commits](https://www.conventionalcommits.org/fr).

Principalement, on utilise :
- `feat: `: pour une nouvelle fonctionnalité
- `fix: `: pour une correction de bug, ou une modification mineure
- `chore: ` : pour des modifications dans la configuration, la rédaction du code, la documentation du projet qui n'ajoutent pas de fonctionnalité ou ne corrigent pas de bug.

Si on introduit une modification qui casse la compatibilité avec les versions précédentes, on ajoute `!` après le type de commit, par exemple : `feat!: ` ou `fix!: `.

Après une série de commits, on peut faire une montée de version avec la tâche `task bump` :
- un nouveau tag git correspondant à la nouvelle version sera créé : le nouveau numéro de version est calculé automatiquement d'après les messages de commit selon la convention [Semantic Versioning](https://semver.org/lang/fr/) ;
- le numéro de version sera automatiquement mis à jour dans les fichiers `package.json`, `package-lock.json` et `VERSION` ;
- le changelog sera automatiquement mis à jour dans le fichier `CHANGELOG.md`.



## Commandes utiles

1. Compiler le projet

```bash
task build
```

2. Lancer les tests unitaires

```bash
task tests:unit
```

3. Lancer les tests _end-to-end_

```bash
task tests:e2e
```

4. Lancer le linter

```bash
task lint
```

5. Lancer la vérification du type de Javascript utilisé

```bash
task ecma
```

6. Faire une montée de version

```bash
task bump
```

7. Pousser ces modifications sur le dépôt distant

```bash
task push
```