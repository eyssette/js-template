---
description: "Corriger un bug JavaScript. À utiliser pour identifier, résoudre des erreurs ou des comportements inattendus dans du code JS, réparer des fonctions ou des modules, et s'assurer que le code fonctionne comme prévu."
name: "fix-this"
argument-hint: "<description précise du bug>"
---

# Fix This

Objectif : Diagnostiquer et corriger un bug JavaScript avec le minimum de changements nécessaires, en respectant strictement l'architecture, les conventions et les contraintes du dépôt.

Principe fondamental : comprendre avant de modifier, reproduire avant de corriger et vérifier avant de conclure.

## Entrée

Utiliser l'argument utilisateur comme source principale d'information :

- Symptômes observés et messages d'erreur.
- Comportement attendu et comportement réellement obtenu.
- Contexte d'exécution (navigateur, environnement, page, parcours utilisateur).
- Fichiers, fonctions ou modules potentiellement concernés.
- Conditions particulières permettant de déclencher le bug.
- Éventuelles régressions apparues après une modification récente.

Ne pas demander à l'utilisateur des informations déjà disponibles dans le dépôt.

Si une information indispensable manque et ne peut pas être déduite du code, poser une question courte avant de poursuivre.

## Procédure obligatoire

Suis cette checklist et coche chaque étape au fur et à mesure :

- [ ] **Comprendre le contexte** : lire `AGENTS.md` et charger la SKILL `/code` pour connaître les conventions de codage et les commandes de contrôle de fin de tâche.
- [ ] **Reproduire le bug** : comprendre la cause racine avant de toucher au code. Poser des questions si nécessaire pour clarifier le contexte et les conditions de reproduction.
- [ ] **Écrire un test de reproduction** qui échoue (unitaire dans `tests/unit`, ou scénario Gherkin avec tag `@CURRENT`).
  - Charger la SKILL correspondante pour les conventions de test : 
    - `unit-test` pour les tests unitaires
    - `e2e-test` pour les tests end-to-end
- [ ] **Appliquer un correctif minimal** : uniquement ce qui corrige le bug, sans refactor hors sujet.
- [ ] **Vérifier** que le test de reproduction passe, puis lancer les contrôles de fin de tâche (lint, tests, ecma) définis dans `AGENTS.md`.
  - [ ] `npx task format:file -- <fichier>` (pour les fichiers touchés) OK
  - [ ] `npx task lint:file:all -- <fichier>` (pour les fichiers touchés) OK
  - [ ] `npx task tests:unit` OK
  - [ ] `npx task tests:e2e` OK (si pertinent)
  - [ ] `npx task ecma:source` OK (si pertinent)
  - [ ] `npx task security:scan:file -- <file_path>` sur chaque fichier touché : s'arrêter et prévenir l'utilisateur si un secret ou une information sensible est détecté, proposer une solution pour corriger le problème, et ne pas continuer tant que l'utilisateur n'a pas validé la correction.
- [ ] **Résumer** : cause racine, correctif, tests, risques.

## Conformité

Respecter `AGENTS.md` (qualité du code, lint, i18n, guardrails, langue).

Points importants pour le débogage :
- Ne pas désactiver les règles de lint ; corriger le code à la place.
- Ne pas modifier des zones non liées au bug.
- Ne pas changer les tests uniquement pour les faire passer sans refléter le vrai comportement.
- Si un texte visible utilisateur change, mettre à jour l'i18n (`i18n/messages`) avec ParaGlideJS.