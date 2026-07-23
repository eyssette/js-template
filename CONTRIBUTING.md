# Contribuer à ce projet

Merci de vouloir contribuer !
Ce document explique simplement comment proposer des améliorations pour ce projet.

Avant tout, n'hésitez pas à consulter le fichier [README.md](README.md) pour comprendre le projet et son fonctionnement, et à contacter les responsables du projet si vous avez des questions ou des propositions.

## Prérequis

- Node.js >= 22
- npm >= 8 (>= 10 recommandé)

## Récupérer le projet et installer les dépendances

Créer un nouveau dossier en local et lancer les commandes suivantes dans un terminal :

```bash
git clone <url-du-projet> .
npm install
```

## Workflow recommandé

1. Créer une branche depuis `main`.
2. Développer, puis lancer les vérifications en local.
3. Faire des commits clairs avec la convention du projet.
4. Ouvrir une Merge Request avec une description précise.

## Vérifications avant de proposer une MR

Lancer :

```bash
task build
```

Commandes utiles :

```bash
task lint
task tests:unit
task tests:e2e
task tests:e2e:current
task ecma
```

## Commits

Le projet suit Conventional Commits.

Exemples :

- `feat(scope): description`
- `fix(scope): description`
- `docs: description`
- `chore: description`

Rappels :

- Le `scope` est obligatoire pour `feat` et `fix`.
- Utiliser `!` pour signaler une rupture de compatibilité.
- Les hooks Husky exécutent automatiquement les contrôles.

## Qualité des contributions

Pour faciliter la revue :

- Préférer des MR petites et ciblées.
- Ajouter ou mettre à jour les tests quand le comportement change.
- Mettre à jour la documentation si nécessaire.
- Garder un code lisible et cohérent avec le style existant.

## Signaler un problème ou proposer une idée

Dans votre ticket (issue), merci d'inclure :

- le contexte
- les étapes pour reproduire (si bug)
- le résultat attendu
- le résultat observé

Merci pour votre contribution.
