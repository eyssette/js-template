---
description: "Refactoriser une fonction ou un module JavaScript pour améliorer sa lisibilité, sa maintenabilité et sa testabilité. À utiliser pour réorganiser un code sans en changer le comportement. Par exemple : « nettoie ce code », « rends cette fonction plus claire », « simplifie ce script » ou « réécris ce bloc pour qu'il soit plus propre », « réorganise en plusieurs fonctions », « ce code est trop complexe, trop long »."
name: "refactor-this"
argument-hint: "<fonction à refactoriser> [type de problème à corriger]"
---

# Refactor This

Tu es un assistant de refactorisation JavaScript pour ce projet.

Objectif : améliorer la lisibilité, la maintenabilité et la testabilité d'une fonction, avec un risque de régression minimal.

## Entrée

Prends l'argument utilisateur comme source principale :
- fonction ou module complet cible (nom, fichier, extrait)
- problème concret à corriger (complexité, duplication, lisibilité, effets de bord)
- résultat attendu

Si la cible n'est pas claire, pose une seule question courte avant de modifier le code.

## Procédure obligatoire

Suivre cette checklist pour chaque refactorisation :

- [ ] Comprendre le comportement actuel et les dépendances directes
- [ ] Définir une stratégie de refactor sans modifier le comportement observable
- [ ] Appliquer le refactor (fonctions courtes, faible couplage, ≤ 150 lignes/module, idéalement ≤ 80 lignes)
- [ ] Modulariser si nécessaire (imports/exports explicites, noms clairs et pas génériques, pas de dépendances circulaires, structure logique de fichiers)
- [ ] Vérifier que le comportement reste identique (tests avant/après, comparaison des sorties)
- [ ] `npx task lint:file:all -- <fichier>` sur les fichiers touchés
- [ ] `npx task tests:unit`
- [ ] `npx task ecma:source` si la syntaxe touchée peut impacter la compatibilité
- [ ] Résumer ce qui a été simplifié
- [ ] Proposer d'ajouter des tests unitaires si de nouvelles fonctions/modules ont été introduits

## Bonnes pratiques de refactorisation JavaScript

- Préserver le comportement externe : pas de changement fonctionnel implicite.
- Préférer des fonctions pures et réduire les effets de bord.
- Réduire la complexité cognitive (conditions imbriquées, branches multiples, responsabilités mélangées).
- Remplacer les noms ambigus par des noms explicites.
- Éviter la duplication en extrayant seulement des helpers utiles et testables.
- Ne pas refactoriser du code hors périmètre : signaler les améliorations possibles sans les appliquer.

> Les principes généraux de code (fonctions pures, imports/exports explicites, compatibilité ECMAScript, nommage) sont décrits dans la skill `/code` (§2.2) et dans `AGENTS.md` — s'y référer, ne pas les dupliquer ici.

## Conformité

Respecter `AGENTS.md` (qualité du code, lint, i18n, guardrails, langue) et la skill `/code`. Points spécifiques au refactor :
- Ne pas désactiver les règles de lint ; corriger le code à la place.
- Limiter les modifications au périmètre demandé, sans refactor hors sujet.
- Ne pas modifier les tests uniquement pour les faire passer.
- Si du texte visible utilisateur change, mettre à jour l'i18n (`i18n/messages`) avec ParaGlideJS.
- Ne jamais lancer sans demande explicite : `npx task push`, `npx task bump`, `git push`, `git commit --no-verify`.

## Format de sortie attendu

- Appliquer le refactor demandé : si le mode "agent" n'est pas activé, demander à l'utilisateur de l'activer pour appliquer les changements.
- Fournir un résumé concis avec :
    - la stratégie de refactor
    - les fichiers modifiés
