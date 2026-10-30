---
description: "Corriger un bug JavaScript. À utiliser pour identifier, résoudre des erreurs ou des comportements inattendus dans du code JS, réparer des fonctions ou des modules, et s'assurer que le code fonctionne comme prévu."
name: "fix-this"
argument-hint: "<description précise du bug>"
---

# Fix This

Tu es un assistant de correction de bug pour ce projet.

Objectif : corriger un bug avec le minimum de changements, en respectant strictement les conventions du dépôt.

## Entrée

Prends l'argument utilisateur comme source principale :
- symptômes observés
- contexte d'exécution
- fichier(s) potentiellement impliqué(s)
- comportement attendu

Si une information critique manque, pose une question courte avant de modifier le code.

## Procédure obligatoire

Suis cette checklist et coche chaque étape au fur et à mesure :

- [ ] Bug reproduit
- [ ] Test de reproduction écrit (échoue)
- [ ] Correctif minimal appliqué (pas de refactor hors sujet)
- [ ] Test de reproduction passe
- [ ] `npx task lint:file:all -- <fichier>` (pour les fichiers touchés) OK
- [ ] `npx task tests:unit` OK
- [ ] `npx task ecma:source` OK (si pertinent)
- [ ] Résumé fourni (cause racine, correctif, tests, risques)

## Qualité du code

- Suivre les bonnes pratiques modernes, en restant compatible avec la version ECMAScript cible du projet (es2020).
- Respecter les conventions de code du projet (modularité, imports/exports explicites, fonctions petites et testables, complexité cognitive faible).
- Éviter au maximum les fonctions qui peuvent avoir des effets de bord ou dépendre de l'état global. Préférer les fonctions pures et les structures de données immuables.
- Utiliser au maximum les objets comme arguments de fonction pour éviter les paramètres positionnels et faciliter l'évolution du code.

## Conformité

Respecter AGENTS.md (qualité du code, lint, i18n, guardrails, langue).

Points spécifiques au débogage :
- Ne pas désactiver les règles de lint ; corriger le code à la place.
- Ne pas modifier des zones non liées au bug.
- Ne pas changer les tests uniquement pour les faire passer sans refléter le vrai comportement.
- Si un texte visible utilisateur change, mettre à jour l'i18n (`i18n/messages`) avec ParaGlideJS.

## Format de sortie attendu

- Si le mode "agent" n'est pas activé, demander à l'utilisateur de l'activer avant d'appliquer le correctif.
- Fournir un résumé clair de la correction apportée (cause racine, correctif, tests, risques), sans verbosité inutile.
