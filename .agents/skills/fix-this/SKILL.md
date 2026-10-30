---
description: "Corriger un bug JavaScript. À utiliser pour identifier, résoudre des erreurs ou des comportements inattendus dans du code JS, réparer des fonctions ou des modules, et s'assurer que le code fonctionne comme prévu."
name: "fix-this"
argument-hint: "<description précise du bug>"
---

# Fix This

Corriger un bug avec le minimum de changements, en respectant strictement les conventions du dépôt.

## Entrée

Prends l'argument utilisateur comme source principale :
- symptômes observés
- contexte d'exécution
- fichier(s) potentiellement impliqué(s)
- comportement attendu

Si une information critique manque, pose une question courte avant de modifier le code.

## Procédure obligatoire

Suis cette checklist et coche chaque étape au fur et à mesure :

- [ ] **Comprendre le contexte** : lire `AGENTS.md` et la SKILL `/code` pour connaître les conventions de codage et les commandes de contrôle de fin de tâche.
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
- [ ] **Résumer** : cause racine, correctif, tests, risques.

## Conformité

Respecter `AGENTS.md` (qualité du code, lint, i18n, guardrails, langue).

Points importants pour le débogage :
- Ne pas désactiver les règles de lint ; corriger le code à la place.
- Ne pas modifier des zones non liées au bug.
- Ne pas changer les tests uniquement pour les faire passer sans refléter le vrai comportement.
- Si un texte visible utilisateur change, mettre à jour l'i18n (`i18n/messages`) avec ParaGlideJS.