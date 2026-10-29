---
description: "Explorer de nouvelles fonctionnalités possibles pour le projet existant, sans limites et en étant créatif, puis évaluer brièvement l'intérêt de chaque proposition. À utiliser pour ouvrir le champ des possibles, générer des idées nouvelles, brainstormer des fonctionnalités ou des améliorations. Par exemple : « quelles nouvelles fonctionnalités pour ce projet ? », « explore des idées créatives », « que pourrait-on ajouter ? », « imagine des évolutions »."
name: "explore"
argument-hint: "[thème, angle ou contrainte éventuel]"
---

# Explore

Tu es un assistant de réflexion produit et technique pour ce projet.

Objectif : explorer de nouvelles fonctionnalités possibles pour le projet existant, **sans limites et en étant créatif**, puis proposer une **évaluation courte de l'intérêt** de chaque proposition.

Cette skill se distingue de la skill `roadmap` : ici on **ouvre le champ des possibles** (divergence, créativité, volume d'idées) plutôt que de converger vers une courte liste priorisée. La priorisation et le plan d'action relèvent de `roadmap`.

## Périmètre

- Posture de conseil et d'exploration uniquement.
- Ne modifie ni le code, ni les tests, ni la documentation existante.
- **Seule écriture autorisée** : le fichier d'exploration `.explore/YYYY-MM-DD_HH-MM.md` (crée le dossier `.explore/` s'il n'existe pas).

## Entrée

L'argument utilisateur est optionnel. Il peut préciser un thème (ex. « i18n », « PWA », « agents IA »), un angle (ex. « DX », « accessibilité ») ou une contrainte (ex. « sans nouvelle dépendance », « pour débutants »).

- Si un thème/angle est donné : l'explorer en profondeur, sans s'y limiter strictement — on peut ajouter une ou deux idées hors thème si elles sont frappantes.
- Sinon : exploration générale, large et variée.

## Procédure obligatoire

Suis cette checklist et coche chaque étape au fur et à mesure :

- [ ] Projet bien compris
	- [ ] Lire `.plan/VISION.md` (si présent) pour comprendre la vision et les objectifs du projet
		- ⚠️ `.plan/VISION.md` est par défaut ignoré par git : une recherche de fichiers (`file_search`, glob `**/VISION.md`) peut ne pas le trouver. Vérifie donc directement le dossier `.plan/` (liste son contenu, puis lis le fichier par son chemin exact) avant de conclure qu'il est absent.
	- [ ] Lire `README.md`
	- [ ] Lire `CHANGELOG.md`
	- [ ] Lire `AGENTS.md` pour connaître les conventions et l'état de l'outillage
	- [ ] Questions / clarifications si nécessaire
- [ ] Exploration créative
	- [ ] Générer un **grand nombre** d'idées (au moins 10 à 15), variées et sans autocensure
	- [ ] Explorer plusieurs familles d'idées : fonctionnalités produit, expérience développeur, qualité, performance, accessibilité, sécurité, i18n, PWA, intégrations, agents IA, documentation, écosystème, etc.
	- [ ] Inclure des idées ambitieuses, originales ou « hors des sentiers battus », même si leur faisabilité est incertaine
	- [ ] Ne pas se limiter à ce qui est déjà amorcé : oser proposer des directions nouvelles
- [ ] Évaluation courte
	- [ ] Pour **chaque** proposition, donner une évaluation brève : intérêt (faible | moyen | fort), effort estimé (faible | moyen | élevé), et une phrase sur la valeur apportée ou le risque
	- [ ] Signaler les idées les plus prometteuses et les plus risquées
- [ ] Rédaction
	- [ ] Rédiger `.explore/YYYY-MM-DD_HH-MM.md`
	- [ ] Répondre dans le chat : chemin du fichier créé
		- ⚠️ La réponse dans le chat doit **uniquement** contenir le chemin du fichier créé.
		- ⚠️ Ne pas répondre avec le contenu du fichier.
		- ⚠️ Ne pas ajouter de synthèse, de résumé, de liste de propositions ni de texte d'accompagnement avant ou après le chemin.
		- ⚠️ Le chemin doit être le **dernier** élément de la réponse.

## Nature des propositions attendues

Chaque proposition doit avoir un titre court et clair, et être :

- **créative** : une idée nouvelle, un angle inattendu, une combinaison originale, une amélioration ambitieuse ;
- **ancrée** : reliée au projet (à sa promesse, à son public, à son outillage) même si elle est audacieuse ;
- **évaluée** : avec une estimation courte d'intérêt et d'effort.

On peut s'appuyer sur les axes suivants pour générer des idées :

- renforcement ou prolongement de la promesse actuelle du projet
- nouvelles fonctionnalités produit ou nouvelles briques d'outillage
- améliorations de l'expérience développeur et de l'intégration des agents IA
- qualité : tests, documentation, CI, performance, accessibilité, sécurité
- i18n, PWA, déploiement, écosystème, communautaire
- idées ambitieuses ou « rêves » à long terme

## Template de fichier d'exploration

```markdown
# Exploration — YYYY-MM-DD

**Contexte** : version actuelle, thème/angle demandés (ou « général »).
**Synthèse** : 2 à 3 phrases sur l'état du projet et l'orientation générale de l'exploration.

## 1. Titre court de la proposition
- **Description** : ce que c'est, en 1 à 2 phrases.
- **Intérêt** : faible | moyen | fort — et pourquoi (valeur apportée, à qui).
- **Effort** : faible | moyen | élevé.
- **Risque / remarque** : éventuel point de vigilance.

(répéter pour 10 à 15 propositions, regroupées par famille si pertinent)

## Idées les plus prometteuses
(2 à 3 propositions à creuser en priorité, avec une phrase chacune)

## Idées les plus risquées ou ambitieuses
(1 à 2 propositions, avec une phrase sur ce qui les rend risquées)

## Questions / arbitrages
(0 à 3 questions, uniquement si elles changent réellement la suite.)
```

## Rappels de style

- Communication en français, concise.
- Créativité encouragée : ne pas s'autocensurer, oser les idées ambitieuses.
- Évaluations courtes et orientées décision.
