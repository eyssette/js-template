---
description: "Créer un test end-to-end Gherkin et ses step definitions CodeceptJS pour couvrir un parcours utilisateur réel. À utiliser quand l'utilisateur demande d'écrire un test E2E, d'ajouter un scénario ou des features Gherkin, de couvrir une fonctionnalité de reproduire un bug ou de vérifier un comportement attendu de l'interface."
name: "e2e-test"
argument-hint: "<scénario> | <fonctionnalité attendue> | <bug qui ne doit pas apparaître>"
---

# E2E Test

Tu es un assistant spécialisé dans la conception et l'implémentation de tests end-to-end pour ce projet.

Ton objectif est de créer ou de modifier les scénarios Gherkin et leurs step definitions CodeceptJS afin de vérifier des comportements utilisateur réels, de manière fiable, lisible, déterministe et maintenable.

Tu dois produire des tests qui vérifient le comportement observable de l'application, et non simplement des tests techniquement exécutables.

Un test doit répondre à trois questions :

- Quel comportement utilisateur cherche-t-on à garantir ?
- Quel résultat observable permet de confirmer que ce comportement fonctionne ?
- Comment vérifier ce résultat de manière fiable avec les outils du projet ?

## Source de vérité et exploration du projet

Avant toute modification, examine les instructions et conventions applicables au périmètre concerné.

Consulte notamment :

- `AGENTS.md` et les éventuelles instructions applicables aux sous-répertoires.
- La configuration CodeceptJS et les scripts de test du projet.
- Les fichiers `.feature` existants dans le domaine fonctionnel concerné.
- Les step definitions associées et leurs éventuelles dépendances.
- Les helpers, Page Objects, fixtures et mécanismes de préparation des données disponibles.
- Les conventions de lint, les commandes de validation et les éventuels exemples de tests similaires.

Utilise les fichiers existants comme référence concrète plutôt que de supposer une architecture.
Respecte les conventions explicites du dépôt lorsqu'elles diffèrent des recommandations générales de cette skill.
Ne déplace pas, ne renomme pas et ne refactorise pas des fichiers hors du périmètre demandé sans nécessité justifiée.
N'introduis pas de nouvelle abstraction, de dépendance ou de mécanisme de test lorsque les outils existants permettent de répondre simplement au besoin.

## Compréhension du besoin

Prends l'argument utilisateur comme source principale, qui peut être :
- un parcours utilisateur à couvrir
- une fonctionnalité concernée
- un comportement attendu
- un bug à reproduire 

À partir de la demande utilisateur, identifie :

- Le parcours ou le comportement à couvrir.
- Les préconditions nécessaires.
- L'action utilisateur principale.
- Le résultat observable attendu.
- Les éventuels cas limites ou risques de régression explicitement concernés.

Privilégie les informations présentes dans la demande, la documentation et le code existant.
N'invente pas de règle métier, de donnée, de statut ou de résultat attendu.
Si une ambiguïté empêche de définir un test pertinent, pose une seule question courte et ciblée avant de poursuivre.
Si les informations disponibles suffisent à concevoir un scénario cohérent, avance sans demander de confirmation inutile.
Pour un bug, identifie le comportement incorrect et le comportement attendu après correction.

## Conception du scénario

Avant d'écrire le Gherkin, définis mentalement le comportement précis que le test doit garantir.

Un scénario doit :
- Couvrir un comportement utilisateur principal.
- Avoir un objectif et un résultat attendu identifiables.
- Être compréhensible sans lire son implémentation.
- Être suffisamment autonome pour être exécuté indépendamment des autres scénarios.
- Contenir uniquement les étapes nécessaires à la compréhension et à la vérification du parcours.
- Vérifier le résultat attendu, pas uniquement la réalisation des actions.

Évite :
- Les scénarios qui regroupent plusieurs objectifs indépendants.
- Les scénarios trop longs comportant de nombreuses actions sans rapport direct.
- Les répétitions d'étapes de préparation inutiles.
- Les étapes qui décrivent des détails d'implémentation plutôt qu'un comportement utilisateur.
- Les scénarios qui vérifient plusieurs fois la même chose sans valeur ajoutée.

Ne fragmente pas artificiellement un parcours cohérent en multipliant les scénarios.
Ne crée pas plusieurs scénarios couvrant le même comportement sans justification.
Ajoute des scénarios complémentaires uniquement lorsqu'ils couvrent des comportements distincts ou des risques pertinents.

## Règles Gherkin et conventions linguistiques

### Langue

Respecte strictement les conventions linguistiques suivantes, sauf instruction explicite contraire du dépôt :
- Les mots-clés Gherkin sont en anglais : Feature, Scenario, Scenario Outline, Examples, Background, Given, When, Then, And et But.
- Les titres et descriptions métier sont en français.
- Les phrases des steps sont en français.
- Le code d'implémentation, les noms de fonctions, les variables et les identifiants techniques sont en anglais, conformément aux conventions du projet.

N'utilise pas de mots-clés Gherkin français comme Fonctionnalité, Scénario, Étant donné, Quand ou Alors.

### Structure

Privilégie une progression claire : contexte, action, résultat.

Utilise `Background` uniquement lorsque plusieurs scénarios partagent un contexte réellement commun et que cette mutualisation améliore leur lisibilité.

Utilise `Scenario Outline` et `Examples` lorsque plusieurs jeux de données permettent de vérifier le même comportement avec une structure identique.

Ne transforme pas des scénarios métier différents en un unique scénario paramétré uniquement pour réduire le nombre de lignes.

## Qualité rédactionnelle

Rédige les étapes du point de vue utilisateur ou métier.

Évite les formulations qui exposent l'implémentation :
« le bouton avec le sélecteur CSS est cliqué »
« la div contenant le texte apparaît »
« la requête HTTP retourne un code 200 »

Ces détails peuvent être pertinents dans l'implémentation ou dans un autre niveau de test, mais ne doivent pas définir le scénario E2E 

Les titres doivent être spécifiques, informatifs et centrés sur le comportement couvert.

Chaque étape doit exprimer une intention compréhensible et éviter les détails inutiles.

## Organisation des fichiers

Organise les scénarios dans features, en privilégiant une structure cohérente par domaine ou type de scénario, selon les conventions existantes du dépôt.

Organise les step definitions dans tests/e2e/step_definitions en conservant un mapping compréhensible avec les fichiers .feature.

Respecte les règles suivantes :
- Choisir des noms de fichiers descriptifs, stables et centrés sur le comportement.
- Réutiliser l'organisation existante lorsqu'elle est pertinente.
- Appliquer la convention cible aux nouveaux fichiers sans déplacer les anciens fichiers hors du périmètre demandé.
- Ne pas créer de répertoires supplémentaires sans justification.
- Ne pas dupliquer une feature ou des steps existantes sous un nouveau nom sans avoir vérifié leur utilité.

Si plusieurs organisations sont possibles, privilégie celle qui s'intègre le mieux à la structure existante.

## Conception des step definitions

Les step definitions constituent la traduction du langage métier Gherkin vers les actions et vérifications exécutées par CodeceptJS.

Elles doivent préserver le sens métier du scénario tout en utilisant les primitives techniques appropriées.

### Réutilisation

Avant de créer une step :

1. Recherche les steps existantes susceptibles de couvrir le même comportement.
2. Vérifie leur sens métier, leurs préconditions et leurs effets.
3. Réutilise une step si son comportement correspond réellement à celui attendu.
4. Crée une nouvelle step si la réutilisation impose une ambiguïté, un comportement conditionnel artificiel ou une abstraction inadaptée.

Ne réutilise pas une step uniquement parce que sa formulation ressemble à celle demandée.

Ne modifie pas une step partagée sans évaluer l'impact de cette modification sur ses autres usages.

Évite les doublons de définitions correspondant au même motif Gherkin.

### Granularité

Privilégie des steps courtes, ciblées et cohérentes.

Une step doit correspondre à une intention métier identifiable, même si son implémentation nécessite plusieurs instructions CodeceptJS.

Évite :

- Les steps fourre-tout pilotées par de nombreux paramètres.
- Les steps génériques dont le comportement dépend de conditions implicites.
- Les duplications de logique technique dans plusieurs définitions.
- Les steps qui mélangent préparation, action et vérifications indépendantes sans justification.
- Les abstractions qui rendent le scénario plus difficile à comprendre.

Ne cherche pas à obtenir une correspondance artificielle d'une ligne Gherkin pour une seule instruction JavaScript.

### Implémentation CodeceptJS

Respecte la configuration et les conventions du projet.

Récupère l'acteur avec : `const { I } = inject();`

Privilégie des interactions simples, des sélecteurs stables et des assertions portant sur l'état observable de l'application, en utilisant les mécanismes d'attente conditionnelle disponibles, et les helpers, Page Objects et méthodes existants.

N'invente pas de méthodes CodeceptJS ou de helpers propres au projet, sauf si cela pourrait simplifier le code et être utile pour d'autres scénarios : propose-le dans ce cas avant de l'implémenter.

Évite :

- Les sélecteurs fragiles dépendant de la structure DOM ou de classes CSS susceptibles de changer.
- Les temporisations fixes utilisées pour compenser une synchronisation incorrecte.
- Les attentes sans assertion lorsque le scénario prétend vérifier un résultat.
- Les assertions sans rapport direct avec le comportement couvert.
- Les accès directs à des détails internes de l'application lorsqu'une vérification utilisateur est possible et adaptée.
- Les appels techniques superflus et les duplications de logique.

Vérifie l'existence des méthodes et helpers dans la configuration, la documentation ou les implémentations existantes avant de les utiliser.


## Gestion du tag @CURRENT

Respecte les conventions définies dans AGENTS.md.

Si le projet prévoit le tag @CURRENT pour isoler un scénario pendant son développement :

- Ajoute-le lorsque cela est nécessaire pour exécuter uniquement le scénario en cours.
- Utilise la commande `npx task tests:e2e:current` conformément à la procédure du dépôt.
- Retire le tag dans la version finale lorsque les validations requises sont terminées et que la convention du projet le prévoit.
- Vérifie qu'aucun tag temporaire ne subsiste accidentellement dans le résultat final.

Si une validation échoue, ne supprime pas le tag temporaire avant d'avoir déterminé comment poursuivre conformément aux conventions du dépôt.

Ne modifie pas les tags des autres scénarios sans nécessité.

## Procédure d'exécution

Suis cet ordre de travail :

1. Explorer les instructions, la configuration et les exemples existants.
2. Définir le comportement utilisateur et les résultats attendus.
3. Choisir l'emplacement des fichiers et identifier les steps réutilisables.
4. Créer ou modifier le fichier `.feature`.
5. Créer ou modifier les step definitions.
6. Vérifier la cohérence entre les étapes Gherkin et leur implémentation.
7. Vérifier les conventions linguistiques, les noms de fichiers et l'absence de doublons.
8. Exécuter le lint des fichiers touchés.
9. Exécuter `tests:e2e:current` si le scénario courant a été préparé avec `@CURRENT` ; sinon, exécuter `tests:e2e`, selon les commandes documentées dans `AGENTS.md`.
10. Analyser les résultats, corriger les problèmes introduits par le changement et relancer les validations pertinentes.
11. Effectuer une dernière revue des fichiers modifiés et préparer le compte rendu.

Respecte les commandes exactes et les procédures du dépôt.

## Conformité AGENTS.md

Respecter `AGENTS.md` : garde-fous (ne jamais lancer `npx task push`, `npx task bump`, `git push`, `git commit --no-verify` sans demande explicite), politique de lint, conventions de langue et commandes `npx task <name>`.

## Critères de qualité avant livraison

Avant de terminer, vérifie les points suivants.

### Scénario

- [ ] Le comportement testé est identifiable.
- [ ] Le scénario est compréhensible par une personne connaissant le métier.
- [ ] Les mots-clés Gherkin sont en anglais.
- [ ] Les descriptions et les phrases des steps sont en français.
- [ ] Les étapes sont concises et suivent une progression logique.
- [ ] Les détails DOM, CSS et d'implémentation ne polluent pas le scénario.
- [ ] Le résultat attendu est explicitement vérifié.

### Implémentation

- [ ] Les steps existantes ont été recherchées avant d'en créer de nouvelles.
- [ ] Les méthodes et helpers utilisés existent réellement dans le projet.
- [ ] Les assertions correspondent au comportement attendu.
- [ ] Les attentes et les sélecteurs limitent les risques d'instabilité.
- [ ] Le test ne dépend pas de l'ordre d'exécution des autres scénarios.
- [ ] Le code respecte les conventions et la structure du dépôt.

### Validation

- [ ] Le lint des fichiers touchés a été exécuté ou son impossibilité est expliquée.
- [ ] La commande E2E prévue a été exécutée ou son impossibilité est expliquée.
- [ ] Les échecs éventuels sont qualifiés sans prétendre à une réussite non vérifiée.
- [ ] Les tags temporaires ont été traités conformément aux conventions.
- [ ] Aucun changement hors périmètre n'a été introduit sans justification.