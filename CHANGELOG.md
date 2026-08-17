## 7.0.2 (2026-08-17)

### Fix

- **lint**: désactivation de la règle eslint/logical-assignment-operators [(f9331db)](https://forge.apps.education.fr/eyssette/js-template/-/commit/f9331db9794a94f80e58757a1efb82d4799d6180)
- **task**: ajout d'une tâche pour lancer un serveur de développement avec le service worker, pour pouvoir vérifier ou déboguer son fonctionnement [(a54897e)](https://forge.apps.education.fr/eyssette/js-template/-/commit/a54897e4cfb845a6cc2799642c5bd68d0a0ae6c8)
- **build**: version ECMA imposée aussi pour le script de fallback iife et pour le service-worker [(8b40c5f)](https://forge.apps.education.fr/eyssette/js-template/-/commit/8b40c5f410f9efb7dcdfd48d6ab4146bbe05a223)

## 7.0.1 (2026-08-17)

### Fix

- **lint**: désactivation de certaines règles pour les imports (no-relative-parent-imports, group-exports, exports-last) [(4cd8ec8)](https://forge.apps.education.fr/eyssette/js-template/-/commit/4cd8ec87f78438f3fca34d6d1692a8c1ca27456f)
- **init**: ajout de la description, demandée lors de l'initialisation, dans le README [(a14f42c)](https://forge.apps.education.fr/eyssette/js-template/-/commit/a14f42c0fb787afab83b4e07ca6fa1e7775a7059)
- **init**: initialisation de la description de l'application + gestion du nom du projet dans index.html, manifest.webmanifest et sw.js [(47d2f72)](https://forge.apps.education.fr/eyssette/js-template/-/commit/47d2f72c9ccb9d692399f65ff7b856fb068d2432)

### Chore

- **sw**: modularisation du service worker [(0b91a48)](https://forge.apps.education.fr/eyssette/js-template/-/commit/0b91a483f7e5f463111dac0fda812588c2f7f001)
- uniformisation de la description du projet [(8c8268f)](https://forge.apps.education.fr/eyssette/js-template/-/commit/8c8268faada4ec1ab8602dedf7b10ab7857fbf42)

### Docs

- ajout auteur à la fin du README [(d8a320e)](https://forge.apps.education.fr/eyssette/js-template/-/commit/d8a320ed15d7286c5cd35e577b5a71cbd3c73b73)
- précisions sur l'internationalisation + le mode PWA [(bc5ac54)](https://forge.apps.education.fr/eyssette/js-template/-/commit/bc5ac542ac04718862c15a0dd4a47533aee9d7cd)
- ajout de l'étape d'installation des extensions recommandées pour l'IDE + renommage de la partie qui explique comment utiliser le template [(dfd9d00)](https://forge.apps.education.fr/eyssette/js-template/-/commit/dfd9d005390c5ec8f83471b1ba06c60015cb3545)

## 7.0.0 (2026-08-15)

### Feat

- **pwa**: ajout d'un manifeste et d'un service worker pour que l'application fonctionne en mode PWA (Progressive Web App) hors ligne [(1afc4ce)](https://forge.apps.education.fr/eyssette/js-template/-/commit/1afc4ce30da1c89163a8a7467bfc699f1061de6d)

### Fix

- **lint**: désactivation de eslint/init-declarations et eslint/no-undefined [(f0282b0)](https://forge.apps.education.fr/eyssette/js-template/-/commit/f0282b02d586fe8d9514970e89eb00ed6b2b4510)
- **build**: watch des fichiers html + webmanifest (pour le serveur de développement) [(6712625)](https://forge.apps.education.fr/eyssette/js-template/-/commit/67126250b70d454f4d9fa97874192dd96cc33666)
- **lint**: eslint/max-statements moins strict (limite à 20) [(9fe7f63)](https://forge.apps.education.fr/eyssette/js-template/-/commit/9fe7f63bcb467eb01a0d335105fadd4863fec722)
- **ai**: précisions pour bien vérifier que VISION.md existe avant de chercher à créer ce fichier [(2513ae2)](https://forge.apps.education.fr/eyssette/js-template/-/commit/2513ae2dcd97fba4e70e1da2fe18f05f7bfa6de0)
- **ai**: précision de la description pour la SKILL "think and plan" [(cae9c5d)](https://forge.apps.education.fr/eyssette/js-template/-/commit/cae9c5d9441b9e2e07a68ef45ea5c96bfbac9508)
- **ai**: description des SKILLS plus précise [(63f01db)](https://forge.apps.education.fr/eyssette/js-template/-/commit/63f01db28c94b45135c017ea258f9b064c743fe9)
- **init**: correctif pour le changement de l'URL du dépôt dans .cz.toml + amélioration de l'affichage de certaines étapes [(c8c5a24)](https://forge.apps.education.fr/eyssette/js-template/-/commit/c8c5a24479dbd8ddbeb9b4d0900919c99bd62c04)

### Chore

- ajout de mots autorisés pour cSpell [(dd66766)](https://forge.apps.education.fr/eyssette/js-template/-/commit/dd66766f72ec75474be5411ec6957b1e6201d47f)

### Docs

- **init**: explications pour l'initialisation du projet [(8005845)](https://forge.apps.education.fr/eyssette/js-template/-/commit/80058455b7003d5b30aafa0969aa4bc9795eab95)

## 6.3.0 (2026-08-08)

### Feat

- **init**: script d'initialisation d'un projet à partir du template [(5596393)](https://forge.apps.education.fr/eyssette/js-template/-/commit/5596393c4f1c6be76478454c36a51df8460cad1f)

### Chore

- **task**: variable MAIN_REPO_URL et déplacement de la variable APP_NAME dans le fichier de tâche pour simplifier la gestion de l'initialisation d'un nouveau projet à partir du template [(5d75202)](https://forge.apps.education.fr/eyssette/js-template/-/commit/5d752028c9d162b935f4cfbf61dce5ac13718c33)
- description du script d'initialisation d'un projet à partir du template [(8ad58c5)](https://forge.apps.education.fr/eyssette/js-template/-/commit/8ad58c59fba11d698ab7d1657d8b6601b798890d)
- **changelog**: mise à jour du CHANGELOG avec les liens vers chaque commit [(0582378)](https://forge.apps.education.fr/eyssette/js-template/-/commit/0582378140b190d6799a244d08917785e7a4e2a6)
- **task**: ajout d'une tâche pour obtenir le hash d'un commit à partir du message du commit [(b02d812)](https://forge.apps.education.fr/eyssette/js-template/-/commit/b02d8128634a86e5df6a393f22f7278d924bb01b)

### Docs

- précision d'un prérequis (git) [(a35f4f0)](https://forge.apps.education.fr/eyssette/js-template/-/commit/a35f4f04a92a797aca067b12ea5890f3db037422)

## 6.2.1 (2026-08-07)

### Fix

- **bump**: ajout automatique dans le CHANGELOG du hash et du lien vers le commit correspondant à chaque modification [(67a8483)](https://forge.apps.education.fr/eyssette/js-template/-/commit/67a8483fb7093d07a583b724c1f4bb157c19956f)
- **ai**: précision sur les bonnes pratiques générales pour la SKILL "code" [(c73c5a4)](https://forge.apps.education.fr/eyssette/js-template/-/commit/c73c5a42c33fce3f697bf6e79148a3ab2d41b4c6)
- **ai**: ajout d'un point sur l'architecture générale du code dans la SKILL "code" [(a7a1c09)](https://forge.apps.education.fr/eyssette/js-template/-/commit/a7a1c0980e3432e4e381e4dd33a80ada9b88d617)

## 6.2.0 (2026-08-07)

### Feat

- **ai**: ajout d'une SKILL "code" [(412dc15)](https://forge.apps.education.fr/eyssette/js-template/-/commit/412dc15dcb9e3db5f38ec79c1e74570123f0d7fc)
- **ai**: ajout d'une SKILL "think-and-plan" [(9ac1ee3)](https://forge.apps.education.fr/eyssette/js-template/-/commit/9ac1ee393d2ac619aa2d97b82d14b6b18e4f1682)

### Fix

- **ai**: référence à VISION.md dans la SKILL "roadmap" [(2485de3)](https://forge.apps.education.fr/eyssette/js-template/-/commit/2485de34bf577c4feee502f0db763e9b100af3a9)
- **ai**: ajout de la tâche de review dans la liste des tâches disponibles [(0309d8d)](https://forge.apps.education.fr/eyssette/js-template/-/commit/0309d8da31bf294052418581eafdf66992b7926b)
- **ai**: amélioration des sections "description" + "argument-hint" pour les SKILLS [(58c6cf3)](https://forge.apps.education.fr/eyssette/js-template/-/commit/58c6cf399e620af4cd06518217cdbbe9c464db31)

## 6.1.0 (2026-08-06)

### Feat

- **build**: import possible du contenu de fichiers textes dans des variables JS + distinction de types de configuration (dev / prod) pour Rolldown [(41b0a79)](https://forge.apps.education.fr/eyssette/js-template/-/commit/41b0a7961a33d84650752afa287fd0fb6f7834eb)

### Fix

- **task**: la tâche de vérification ECMA du build doit d'abord vérifier que la tâche de build a été effectuée [(e2ef8d0)](https://forge.apps.education.fr/eyssette/js-template/-/commit/e2ef8d0916f80d7ed15cb2df5974fc8ebb5df3ac)
- **HTML**: le script de fallback est placé avant le script type module, pour éviter un blocage en mode local sans serveur [(a7d344e)](https://forge.apps.education.fr/eyssette/js-template/-/commit/a7d344e118a4166db1da6765e30bfaef554759ed)
- **ai**: ajout d'un paragraphe sur l'intégration possible de composants Svelte dans AGENTS.md [(0478388)](https://forge.apps.education.fr/eyssette/js-template/-/commit/0478388d3c385f1258732ea061bf5197385008ff)

### Docs

- explication sur l'import du contenu d'un fichier texte dans une variable javascript avec unplugin-raw [(9560fd3)](https://forge.apps.education.fr/eyssette/js-template/-/commit/9560fd386c029563696371b9ea1b0e78aab2f67e)
- ajout de la référence à l'extension pour Svelte [(b90ea61)](https://forge.apps.education.fr/eyssette/js-template/-/commit/b90ea61d5c4b610acba324c6ec2b45a6612f6bec)
- explication pour l'utilisation de composants Svelte [(41138ae)](https://forge.apps.education.fr/eyssette/js-template/-/commit/41138ae5f3bcc3b3e141412962577a9661d31005)

### Perf

- ajout de l'attribut "defer" pour le script de fallback à la version iife [(378ca22)](https://forge.apps.education.fr/eyssette/js-template/-/commit/378ca22fa6eb99e0ee682c3918fabeb337d870a4)

## 6.0.0 (2026-08-06)

### Feat

- **svelte**: configuration du build, du lint, du formatage et de l'IDE pour pouvoir utiliser des composants Svelte [(c2b7856)](https://forge.apps.education.fr/eyssette/js-template/-/commit/c2b78562624b2307e630da3b010d8723502aa0bf)
- **build**: double export IIFE + ESM - ESM par défaut, IIFE en cas d'échec [(841c84a)](https://forge.apps.education.fr/eyssette/js-template/-/commit/841c84a9794ccdccbad722eeefa0e4580836ccaa)

### Fix

- **package**: overrides de version pour éviter des vulnérabilités [(548d02f)](https://forge.apps.education.fr/eyssette/js-template/-/commit/548d02fa4bf58f87b67b876c25ce04d56e0a25ee)
- **IDE**: correctif pour le mode DEBUG, qui fonctionne à nouveau [(a299246)](https://forge.apps.education.fr/eyssette/js-template/-/commit/a29924689abd82de30b5aa19a16c1f18513af5c7)

### Chore

- ajout d'une image favicon SVG par défaut pour la page d'exemple [(6c94a42)](https://forge.apps.education.fr/eyssette/js-template/-/commit/6c94a42320aca949eb5ea620cfe16d03279e49ee)

## 5.1.0 (2026-08-03)

### Feat

- **ai**: ajout d'une SKILL "review-this" pour faire de la revue de code [(5e75d5b)](https://forge.apps.education.fr/eyssette/js-template/-/commit/5e75d5b5cc72a60f6b01aecf692c6641a40d81c9)
- **task**: ajout d'une tâche pour préparer une revue de code pour un fichier donné [(abc5e16)](https://forge.apps.education.fr/eyssette/js-template/-/commit/abc5e1697555ec0e03ba38efebbcb432f0bd1c61)

### Fix

- **task**: amélioration du format de sortie des tâches de lint [(32065ee)](https://forge.apps.education.fr/eyssette/js-template/-/commit/32065ee262ea740cd22a3328619f5bb9da63f30f)
- **format**: formatage des scripts Shell avec une extension propre (pas avec Oxfmt) [(b832e72)](https://forge.apps.education.fr/eyssette/js-template/-/commit/b832e72f11084d4602fc287fdb33390618e02da9)
- **ai**: ajout de l'heure et des minutes dans la date de création d'une proposition de roadmap [(c2ea118)](https://forge.apps.education.fr/eyssette/js-template/-/commit/c2ea1182ac77548690388dbdf05df3ff939b1f73)

### Chore

- tâche npm de visualisation de la taille du bundle renommée pour correspondre à la tâche dans Taskfile [(4922e98)](https://forge.apps.education.fr/eyssette/js-template/-/commit/4922e981e5ca9f9239d7ecb1682380d8ba299b9a)

### Docs

- meilleure description générale du projet [(3e4503e)](https://forge.apps.education.fr/eyssette/js-template/-/commit/3e4503ee8528c474f4bb90423de2330430f5106a)

## 5.0.1 (2026-08-02)

### Fix

- **ai**: écriture des propositions de roadmap dans un dossier .roadmap [(aa2978a)](https://forge.apps.education.fr/eyssette/js-template/-/commit/aa2978a4d6eb7282bb0b7932e2fc3ceacbf7cbd4)

### Docs

- explication pour l'utilisation des agents IA préconfigurés pour ce projet [(5963076)](https://forge.apps.education.fr/eyssette/js-template/-/commit/5963076d4b9bb4ae4b2894deb0f4a7677b236eac)

## 5.0.0 (2026-08-02)

### Feat

- **ai**: ajout d'une SKILL "roadmap" [(afe4ecf)](https://forge.apps.education.fr/eyssette/js-template/-/commit/afe4ecf1614839c3b9287cced15b5d482c7a997a)
- **ai**: ajout d'une SKILL "documentation" [(07f13ae)](https://forge.apps.education.fr/eyssette/js-template/-/commit/07f13ae0ba293f98bf3ad52712fdfa1066addc4f)
- **ai**: ajout d'une SKILL "e2e-test" [(3c16534)](https://forge.apps.education.fr/eyssette/js-template/-/commit/3c16534b076bdbd40576ea416b536c6de011486f)
- **ai**: ajout d'une SKILL "unit-test" [(daf09a6)](https://forge.apps.education.fr/eyssette/js-template/-/commit/daf09a6bbe42b77d182e916e01a38cae98ceaf86)
- **ai**: ajout d'une SKILL "optimize-this" [(9f6495e)](https://forge.apps.education.fr/eyssette/js-template/-/commit/9f6495e75dfd66b5c9589654d0db817458d21284)
- **ai**: ajout d'une SKILL "refactor-this" [(5ad9063)](https://forge.apps.education.fr/eyssette/js-template/-/commit/5ad90637c731f9024709534d88c7fe1b588d6de2)
- **ai**: ajout d'une SKILL "fix-this" [(10743af)](https://forge.apps.education.fr/eyssette/js-template/-/commit/10743af706829458791096826e0fa296013d5cc7)
- **ai**: création du fichier AGENTS.md pour guider les IA [(7cd7c2f)](https://forge.apps.education.fr/eyssette/js-template/-/commit/7cd7c2f80ca9a3d13a97ffff87a524440cc90646)
- **ai**: ajout d'un prompt pour aider à rédiger l'annonce d'une nouvelle release [(6d49cd4)](https://forge.apps.education.fr/eyssette/js-template/-/commit/6d49cd453e46a181b628efefbc6ec9705b48b798)

### Fix

- **ai**: suppression de la skill "simplify-this" => implémentation dans "refactor-this" [(2114fcc)](https://forge.apps.education.fr/eyssette/js-template/-/commit/2114fcca6ba3bd757d70f17498eff857704f4ac8)
- **ai**: migration vers la convention AGENTS.md pour la définition des SKILLS [(cbba675)](https://forge.apps.education.fr/eyssette/js-template/-/commit/cbba675cc40a13a0347097688a4b720c7f743e7d)
- **task**: simplification et amélioration des tâches pour préparer une release (récupération du changelog + création d'un brouillon pour la note de version) [(55891a3)](https://forge.apps.education.fr/eyssette/js-template/-/commit/55891a3f7b2e5345cb1db8ce5104e96657d1f102)

### Chore

- ajout de mots autorisés pour cSpell [(1c5d67c)](https://forge.apps.education.fr/eyssette/js-template/-/commit/1c5d67c26c771c75849925613cbcef787be73c22)

## 4.2.1 (2026-08-02)

### Fix

- **task**: script de création de l'annonce pour la release en JS [(1a18c6a)](https://forge.apps.education.fr/eyssette/js-template/-/commit/1a18c6a45ea6f60586586c3aeb6bffbe07a0b9a9)
- **task**: prise en compte de la variable TECHNICAL_DETAILS dans le template d'annonce d'une release + suppression des lignes vides en trop [(124c507)](https://forge.apps.education.fr/eyssette/js-template/-/commit/124c507cfb7966b7aaafeb3edc775ffdaaf80880)
- **task**: amélioration du template pour les changements majeurs et la section de remerciement et invitation à contribution [(08659b5)](https://forge.apps.education.fr/eyssette/js-template/-/commit/08659b51f829c871d611e6fcc630266e45fc2ceb)
- **task**: oubli des variables ISSUES_URL et CHANGELOG_URL [(e1a35f6)](https://forge.apps.education.fr/eyssette/js-template/-/commit/e1a35f6e067f32048af72b64f2daea8e06cc9edc)

### Chore

- ajout d'un mot autorisé pour cSpell [(0bc3134)](https://forge.apps.education.fr/eyssette/js-template/-/commit/0bc3134908e03272ce10db84ba8e90d184f00ff5)

## 4.2.0 (2026-08-01)

### Feat

- **task**: tâche pour créer un brouillon de note pour une release [(84820e6)](https://forge.apps.education.fr/eyssette/js-template/-/commit/84820e62f9cd83f39b42fb4da7c8e381cd5a10e4)
- **task**: création d'un zip du dossier dist compilé à partir des sources correspondant à un tag git donné [(15a9169)](https://forge.apps.education.fr/eyssette/js-template/-/commit/15a9169fbd231300611279b09133f74ad7bbcc50)

### Fix

- **task**: précisions sur les commandes git pour voir le détail d'un commit pour un fichier et le diff de ce commit pour un fichier [(9127799)](https://forge.apps.education.fr/eyssette/js-template/-/commit/91277993f4badb7745f6aceb3d015d7504eb5d92)
- **task**: amélioration du template pour l'annonce d'une release [(1a3a3e3)](https://forge.apps.education.fr/eyssette/js-template/-/commit/1a3a3e3cd783b383c4e5aa41e4f3736cd96aa843)
- **IDE**: désactivation du formatage automatique du Markdown avec Oxfmt [(6830c9b)](https://forge.apps.education.fr/eyssette/js-template/-/commit/6830c9b884e142e2d8ece36ca66b5c69885dff32)
- **task**: correctif pour le build du dist correspondant à un tag dans le bon répertoire [(80fdecd)](https://forge.apps.education.fr/eyssette/js-template/-/commit/80fdecd4631ace4208b8a05c41bad3a3f989467f)
- **task**: suppression de la vérification de l'arbre git avant le build du dist correspondant à un tag [(32d7c20)](https://forge.apps.education.fr/eyssette/js-template/-/commit/32d7c20f12bb9cb099c8fa10d6ae486ffd4bfd6a)
- **task**: déplacement des scripts get-changes dans des fichiers à part (dossier "release") + optimisation [(59accfe)](https://forge.apps.education.fr/eyssette/js-template/-/commit/59accfeadddd98f06347a1ca9d2aa441ad4d2f56)
- **task**: amélioration de la sortie des évolutions de l'application [(912bf10)](https://forge.apps.education.fr/eyssette/js-template/-/commit/912bf10ab78f727ade72f68e6c69b813f1e1604d)
- **task**: amélioration de l'affichage de la liste des commits [(f5d6656)](https://forge.apps.education.fr/eyssette/js-template/-/commit/f5d665634608446222bb8bee40fd2da7078c9558)
- **task**: get-changes peut être lancé avec un seul tag comme argument + extraction directe dans le CHANGELOG du contenu entre deux tags [(4b0c922)](https://forge.apps.education.fr/eyssette/js-template/-/commit/4b0c922f1eaa03948a4b8be9278fc660f3ce064d)
- **task**: amélioration de la sortie pour les tâches get-changes + ajout de la tâche get-changes:changelog:with-files-changed [(a7ba9b1)](https://forge.apps.education.fr/eyssette/js-template/-/commit/a7ba9b17a906d537fdf93aa3a514aefeef4d3477)
- **task**: distinction de get-changes:main et get-chances:diff + tâche générale get-changes:all [(f0bc3cd)](https://forge.apps.education.fr/eyssette/js-template/-/commit/f0bc3cd062c65b0e54513b6b16ea8e6701dccd1a)

### Chore

- noms de variables plus claires pour les anciens tags et les nouveaux tags pour l'affichage des changement entre les deux [(7982731)](https://forge.apps.education.fr/eyssette/js-template/-/commit/798273157d79e743c75a43933ac14c7800942045)
- **task**: suppression de tâches inutiles [(3d5101e)](https://forge.apps.education.fr/eyssette/js-template/-/commit/3d5101e4a1bfc8c810d8a618f6faae908f128e3c)

## 4.1.0 (2026-07-31)

### Feat

- **task**: tâches pour récupérer les changements entre deux tag [(90edeac)](https://forge.apps.education.fr/eyssette/js-template/-/commit/90edeacc6db7f3687e284ae860b37e3e8a1541a4)

### Fix

- **debug**: améliorations pour le debug [(d8a6e40)](https://forge.apps.education.fr/eyssette/js-template/-/commit/d8a6e40a6911339671b092740b3c9dce7ac87075)

### Chore

- **lint**: ordre des imports corrigé [(6faa7d5)](https://forge.apps.education.fr/eyssette/js-template/-/commit/6faa7d5d5334a7d7afb8f75100f14ca47aaaba46)

## 4.0.1 (2026-07-31)

### Fix

- **i18n**: correctif pour l'exemple de la page d'accueil [(e90d80b)](https://forge.apps.education.fr/eyssette/js-template/-/commit/e90d80bb5d819d50f93fe0e1e89d5aa03a22fce1)
- **task**: ajout d'un "ignore_error" pour les tâches de format:staged et lint:staged [(3b25987)](https://forge.apps.education.fr/eyssette/js-template/-/commit/3b259874de2418160dba69a9f49fc701cb1929ae)
- **i18n**: précisions pour les conditions d'exécutions de certaines tâches (pour être sûr que Paraglide s'exécute correctement) [(04b66f3)](https://forge.apps.education.fr/eyssette/js-template/-/commit/04b66f339e6483c70ad07f6313be72b638ae3545)

### Chore

- **package**: pin de la version de Playwright (pour des raisons de compatibilité pour certains systèmes) [(afba8c5)](https://forge.apps.education.fr/eyssette/js-template/-/commit/afba8c5da8109165dc4e4f3842e34073d4be9202)

### Docs

- précision sur la gestion de l'internationalisation (i18n) [(df4f42d)](https://forge.apps.education.fr/eyssette/js-template/-/commit/df4f42d9af490cfb4e41ddd84e168b73a7823625)

## 4.0.0 (2026-07-30)

### Feat

- **i18n**: prise en charge de l'internationalisation (i18n) avec ParaglideJS [(4e9857e)](https://forge.apps.education.fr/eyssette/js-template/-/commit/4e9857efc761966afd1d246e96d6ad70ddeda906)

### Fix

- **tests**: mise en cohérence de la page d'accueil et du test e2e d'exemples [(91552bf)](https://forge.apps.education.fr/eyssette/js-template/-/commit/91552bff8d662380bf135af48523ebcb60b1f7e6)
- **security**: ajout de la tâche "security:bearer" dans la tâche plus générale "security" [(ca047be)](https://forge.apps.education.fr/eyssette/js-template/-/commit/ca047beba7edcdbafe042a8b98bce9042f11598a)

### Docs

- ajout d'un lien pour l'installation de Taskfile [(45fc493)](https://forge.apps.education.fr/eyssette/js-template/-/commit/45fc493aa72a393d70228e27828494b495dfb6f4)
- ajout de certains liens vers des outils utilisés pour l'accessibilité, les performances et la sécurité [(93eec82)](https://forge.apps.education.fr/eyssette/js-template/-/commit/93eec82157cf603c21be9e177f9c120a2983ad1e)

### Perf

- **i18n**: suppression de la dépendance à Vite + compilation Paraglide beaucoup plus rapide (hors du module de compilation Rolldown) [(43dfb2d)](https://forge.apps.education.fr/eyssette/js-template/-/commit/43dfb2d6d6a0ba327cf16c0a4eab3f7276a3a392)

## 3.2.4 (2026-07-30)

### Fix

- **security**: mise à jour des versions de certains paquets [(3084753)](https://forge.apps.education.fr/eyssette/js-template/-/commit/3084753c856223a9767ac90b7a04a9134c56c4da)
- **security**: correctif pour la tâche qui lance trivy afin d'inclure le scan des dépendances [(5775cb4)](https://forge.apps.education.fr/eyssette/js-template/-/commit/5775cb4f9e6be27eb9c0d0959445585fa24aa611)
- **lint**: option "report-unused-disable-directives-severity" activée quand on fait "task lint:all" [(a523292)](https://forge.apps.education.fr/eyssette/js-template/-/commit/a523292c3aebab9168b89fcd3a66610df8fe1a08)

### Chore

- **lint**: suppression de la désactivation de certaines règles Oxlint dans des commentaires [(a5d0b54)](https://forge.apps.education.fr/eyssette/js-template/-/commit/a5d0b54c9f77c8252c2256933fcfa51c938b0cce)

### Docs

- ajout des liens vers les outils utilisés [(ccf48f2)](https://forge.apps.education.fr/eyssette/js-template/-/commit/ccf48f2f601827e11eccab26496a087f9d0230da)

## 3.2.3 (2026-07-30)

### Fix

- **lint**: déplacement du fichier de configuration du lint HTML + suppression du dossier ".config" [(f620e8b)](https://forge.apps.education.fr/eyssette/js-template/-/commit/f620e8b881908b3fc4be6bd58ba0ac509e482ccc)
- **scripts**: déplacement des scripts utilisés dans un dossier à part "scripts", plutôt que dans ".config" + lint mis à jour [(b3c4046)](https://forge.apps.education.fr/eyssette/js-template/-/commit/b3c404665a477f281a3d1ac4f3880d5669aecab7)

### CI

- refactorisation pour séparer la compression et le déploiement final [(79434b6)](https://forge.apps.education.fr/eyssette/js-template/-/commit/79434b6ccbfd279265282f615ba0749990fc6c2a)

### Chore

- description plus précise [(d2fe67e)](https://forge.apps.education.fr/eyssette/js-template/-/commit/d2fe67eaf9d9f5aee9e8fcaf56ea7f50d09c7682)
- **package**: ajout de "allowScripts" pour @go-task/cli [(37841a5)](https://forge.apps.education.fr/eyssette/js-template/-/commit/37841a55220ce78e81460193e9c9788fefa7916b)

### Docs

- amélioration de la présentation de la structure du projet [(9f7552d)](https://forge.apps.education.fr/eyssette/js-template/-/commit/9f7552d3a51f098f2449346ebd690882e94364ed)

## 3.2.2 (2026-07-30)

### Fix

- **test**: correctif pour le serveur de test afin d'éviter url.parse() [(7170530)](https://forge.apps.education.fr/eyssette/js-template/-/commit/7170530156421244260e7d890320f11f5a4fc701)
- **lint**: ajout d'une tâche pour afficher seulement dans le lint les erreurs bloquantes sur tous les fichiers [(9afade4)](https://forge.apps.education.fr/eyssette/js-template/-/commit/9afade4c08b16715304c484b35429f0537e26672)
- **lint**: règles pour le lint (max 3 paramètres pour une fonction, et réassignation d'un paramètre signalée) [(00125f9)](https://forge.apps.education.fr/eyssette/js-template/-/commit/00125f9d0661c8a3e6943f797ccf97bf4ce94690)

### Chore

- mise à jour des fichiers de configuration codeceptJS en ESM [(106a01c)](https://forge.apps.education.fr/eyssette/js-template/-/commit/106a01c8582f0318d8809aef41ab9faf4ca70cf0)
- ajout d'un mot autorisé pour cSpell [(f637277)](https://forge.apps.education.fr/eyssette/js-template/-/commit/f637277e397e88efc9ac48a02fce8fe99cdcc7f0)
- pin des versions de Node et NPM avec Volta [(7700461)](https://forge.apps.education.fr/eyssette/js-template/-/commit/77004615b47a501738cfcd5ae8ffadeb879dc9f6)

### Docs

- amélioration de la description initiale [(df8e4bc)](https://forge.apps.education.fr/eyssette/js-template/-/commit/df8e4bc04789429d74b898b7022cb077c672113c)
- ajout recommandation pour utilisation de Volta (gestion des versions Node et npm [(ac78a68)](https://forge.apps.education.fr/eyssette/js-template/-/commit/ac78a68c9380eed0e15d68518a08504d7874d75f)

### Refactor

- **lint**: fonction plus générale pour modifier la sévérité des règles d'un plugin [(ffc6b4c)](https://forge.apps.education.fr/eyssette/js-template/-/commit/ffc6b4cbbf2c5689f733b08e1f163e59ba631030)

## 3.2.1 (2026-07-29)

### Fix

- **lint**: ajout de règles du plugin "oxc" [(8c7e725)](https://forge.apps.education.fr/eyssette/js-template/-/commit/8c7e725c36cf47f54de81542139a6b669324832d)
- **lint**: ajout des plugins par défaut (dont "oxc") + "promise" [(bd31b96)](https://forge.apps.education.fr/eyssette/js-template/-/commit/bd31b96190d6cc3f745f3f317b2e55624825e3a9)
- **lint**: maximum de lignes pour une fonction fixé à 150 [(604251a)](https://forge.apps.education.fr/eyssette/js-template/-/commit/604251abae4864dab9c26da204c850bd62106cf9)
- **playwright**: retour à une version antérieure de Playwright + hack si le téléchargement des navigateurs ne fonctionne plus [(c062bcb)](https://forge.apps.education.fr/eyssette/js-template/-/commit/c062bcbc48d17bf2aadb200f11ab9c1ddbd2f1c8)

### Chore

- ajout d'un mot autorisé pour cSpell [(40ed240)](https://forge.apps.education.fr/eyssette/js-template/-/commit/40ed240cfc444fb226e5569beab08751ec494740)


### Docs

- mise à jour et organisation plus claire du CONTRIBUTING [(0329ef0)](https://forge.apps.education.fr/eyssette/js-template/-/commit/0329ef0f4e8affc2cb4b4116d794d173fb12fba5)
- explication du mode pour debugger [(6050d1a)](https://forge.apps.education.fr/eyssette/js-template/-/commit/6050d1a2c78fd12927cd7900936b2eccb4622381)
- précisions pour le lint dans l'IDE [(1a4c890)](https://forge.apps.education.fr/eyssette/js-template/-/commit/1a4c89077d8469aaf1836743e00cfdf409d525a3)
- distinction des dossiers principaux et des dossiers de configuration (qui commencent par un point) [(8734e53)](https://forge.apps.education.fr/eyssette/js-template/-/commit/8734e5347896192b6f9bb4380100badce1b20945)
- précision sur l'IDE à installer et qui est préconfiguré [(4234b27)](https://forge.apps.education.fr/eyssette/js-template/-/commit/4234b271c214f524447e6d28a739913be4e7c9a7)

## 3.2.0 (2026-07-28)

### Feat

- **IDE**: configuration du mode DEBUG [(dbcf7dc)](https://forge.apps.education.fr/eyssette/js-template/-/commit/dbcf7dc60b609af9e46a46a45c8f2489346ba99a)

### Fix

- **build**: paramètre corrigé pour minify [(d7cd992)](https://forge.apps.education.fr/eyssette/js-template/-/commit/d7cd992f85b0bd50b88e2864a9bfb2f5a32e2114)

### CI

- correctif pour le job ecma-dist pour qu'il ait les artefacts du job prepare et du job build [(83220da)](https://forge.apps.education.fr/eyssette/js-template/-/commit/83220daaf5b4e92f39eb85c941cecf7db749245e)
- décomposition du stage "code" en plusieurs jobs : format-check, lint, ecma-source [(e69b669)](https://forge.apps.education.fr/eyssette/js-template/-/commit/e69b6693083d90e3d1f572036b23fbe639ad43c1)

## 3.1.1 (2026-07-28)

### Fix

- **task**: les tâches pour formater les fichiers s'appliquent à tous les fichiers [(fc40892)](https://forge.apps.education.fr/eyssette/js-template/-/commit/fc40892ef6e16353f270a389a53b58e0fb47ffdb)
- **ecma**: tâches pour vérifier la conformité ECMA soit sur les fichiers sources, soit sur les fichiers compilés dans "dist" [(a793f91)](https://forge.apps.education.fr/eyssette/js-template/-/commit/a793f919894823448b56046991dff09b05338b64)
- **ecma**: build dans la version ECMAscript souhaitée [(bfd2594)](https://forge.apps.education.fr/eyssette/js-template/-/commit/bfd2594be06624269eb3d2c010f1123191991103)
- **IDE**: ajout de l'extension pour la validation du HTML [(36877e7)](https://forge.apps.education.fr/eyssette/js-template/-/commit/36877e78eab286190213372a62a84ece487b7471)

### CI

- meilleure prise en compte de la vérification ECMA et optimisation (les tests unitaires peuvent être lancés en parallèle, sans attendre le build) [(e8d329b)](https://forge.apps.education.fr/eyssette/js-template/-/commit/e8d329bd7ecf1ac6f3243267f0eee820cb22365a)

### Chore

- utilisation de constantes pour définir la version ECMA utilisée [(ef9f4a7)](https://forge.apps.education.fr/eyssette/js-template/-/commit/ef9f4a73f40a8ba58c0296ae4bd0196e14ebc72b)
- **IDE**: on force l'utilisation d'OXC pour le HTML, le CSS, le Javascript et le Markdown [(bf65725)](https://forge.apps.education.fr/eyssette/js-template/-/commit/bf65725b5c885a29bed869de599c8fcc764128d1)
- mise à jour package-lock.json [(5c5c5a4)](https://forge.apps.education.fr/eyssette/js-template/-/commit/5c5c5a4a2ffeae261ead476cf148f048eac8b817)
- **lint**: ajout paramètre eslint/no-param-reassign [(4a50239)](https://forge.apps.education.fr/eyssette/js-template/-/commit/4a5023961e779b6484f7d79fee135c5855c33b82)

### Docs

- précision sur les tâches pour la vérification ECMA du code source et du code compilé + comment on peut changer le standard utilisé [(00f58ea)](https://forge.apps.education.fr/eyssette/js-template/-/commit/00f58ea2fe7f878a7d3c153c53d72c0abba907c9)

### Perf

- **build**: minification avec option mangle pour renommer les variables et fonctions avec des noms très courts [(0a02614)](https://forge.apps.education.fr/eyssette/js-template/-/commit/0a026142aa0aab771e72a402d09e1cf7a9e29eb9)

## 3.1.0 (2026-07-28)

### Feat

- **lint**: validation du HTML avec html-validate [(b98f1e2)](https://forge.apps.education.fr/eyssette/js-template/-/commit/b98f1e2e0613dc0e42b6b5fd72a911a2290f4cba)
- **ci**: organisation de la CI en plusieurs stages + optimisation [(e455d9e)](https://forge.apps.education.fr/eyssette/js-template/-/commit/e455d9e6a188ad9443099c194500630026622c73)

### Fix

- **ci**: stage de déploiement amélioré [(ef9d796)](https://forge.apps.education.fr/eyssette/js-template/-/commit/ef9d796052f8a4cc0292c25fab40f343223882b3)
- **ci**: conservation des modules nodes dans des artefacts pour les rendre disponibles dans chaque stage [(c6bfc4f)](https://forge.apps.education.fr/eyssette/js-template/-/commit/c6bfc4f859b6778820173975b5c27d822861d1af)
- **task**: ajout d'une tâche de check du format [(545dddd)](https://forge.apps.education.fr/eyssette/js-template/-/commit/545dddd1cf3dcc95c0d99505118f8b0597d9575d)
- **lint**: mode SHOW_MAIN_ERRORS_ONLY pour le lint plutôt que ERRORS_ONLY [(a0fd1ef)](https://forge.apps.education.fr/eyssette/js-template/-/commit/a0fd1ef60ca67b6d31218750e9b3222cff56c30d)
- **husky**: désactivation des contraintes de nombre de lignes ou de caractères pour les commits [(1e115be)](https://forge.apps.education.fr/eyssette/js-template/-/commit/1e115be4f45f74e161b63a609936e9894c2dc6c8)
- **husky**: le message indique la cause de l'erreur si le commit n'a pas été accepté [(9d3352a)](https://forge.apps.education.fr/eyssette/js-template/-/commit/9d3352a1c1b293997ef8233c2c2774075ffb5809)

### Chore

- **deploy**: déplacement du script de compression dans un dossier .config/deploy [(c029d01)](https://forge.apps.education.fr/eyssette/js-template/-/commit/c029d019aba03d08b48d3c173fe30c92230dc78a)
- **lint**: ajout de règles Eslint pour Oxlint [(e94402f)](https://forge.apps.education.fr/eyssette/js-template/-/commit/e94402f531b66800920ed2b6fe934fb57b730108)

## 3.0.3 (2026-07-28)

### Fix

- **lint**: constante ajoutée pour définir les fichiers à ignorer [(059d36a)](https://forge.apps.education.fr/eyssette/js-template/-/commit/059d36aafde8f42caca3f45e94a16eebfc232a9f)
- **lint**: règles spécifiques pour le dossier des tests unitaires [(392b579)](https://forge.apps.education.fr/eyssette/js-template/-/commit/392b5797417bd7fb92f88c88f8c38918e234a975)
- **lint**: règle no-undef ajoutée dans les règles de base [(9c3e224)](https://forge.apps.education.fr/eyssette/js-template/-/commit/9c3e224b1f1e0bc5ecba9e20d81c2022bf0e6314)
- **lint**: amélioration de la gestion des catégories dans la configuration d'Oxlint [(a4cc093)](https://forge.apps.education.fr/eyssette/js-template/-/commit/a4cc0939222a349cb37675aaa4f1267e0e86394b)

### Chore

- **lint**: simplification de la configuration du defaultFormater dans l'IDE [(be678c2)](https://forge.apps.education.fr/eyssette/js-template/-/commit/be678c2235ccc4dbb4bc3694027c90e69b2feb68)
- **lint**: ajout de commentaires pour expliquer la configuration du lint [(e7571ae)](https://forge.apps.education.fr/eyssette/js-template/-/commit/e7571ae846e96ceedf15c937924136d9af1ec071)
- **lint**: constante pour définir les règles de lint pour le dossier "test" [(44429ca)](https://forge.apps.education.fr/eyssette/js-template/-/commit/44429ca59d694c289e4d07df1c2e6380a7f059e0)
- **lint**: utilisation de "env" plutôt que globals pour les variables globales + configuration es2020 pour les fichiers dans app [(09fb201)](https://forge.apps.education.fr/eyssette/js-template/-/commit/09fb20172f7af0ec961bf6205862ca97865a91d2)
- **lint**: correctif pour les erreurs de lint [(87d3d7e)](https://forge.apps.education.fr/eyssette/js-template/-/commit/87d3d7ee472cb49179c59f83d36ad701f9342bac)
- **lint**: configuration pour la catégorie "pedantic" à propos du nombre maximum de lignes pour une fonction [(96484ad)](https://forge.apps.education.fr/eyssette/js-template/-/commit/96484ad7d9cae94f1cadde5c55993639892a625c)
- message d'information plus adéquat en cas d'impossibilité de lancer les tests e2e [(9e0192d)](https://forge.apps.education.fr/eyssette/js-template/-/commit/9e0192d99341797013928489cf234e9906bcc73c)
- ajout d'une description pour une tâche [(38a65fb)](https://forge.apps.education.fr/eyssette/js-template/-/commit/38a65fb708555316f77f9f882f08dd65d40572e0)
- **lint**: précisions pour les tâches de lint [(608fe93)](https://forge.apps.education.fr/eyssette/js-template/-/commit/608fe935bb56bf1c975f4cd7601e7db9debd260c)

## 3.0.2 (2026-07-27)

### Fix

- **security**: correctif de sécurité pour corriger les points relevés par Bearer [(1c1fab2)](https://forge.apps.education.fr/eyssette/js-template/-/commit/1c1fab2c7a52d474713dbb493bdf241a219e0e77)

### Chore

- **lint**: correction des erreurs de lint [(52ff0cf)](https://forge.apps.education.fr/eyssette/js-template/-/commit/52ff0cf4fc4448384b36929a7691cf4d4d9ef755)
- **lint**: amélioration des règles de lint (no-magic-number autorise -0, 0 et 1 + règle pour les imports dans les tests) [(e9aebeb)](https://forge.apps.education.fr/eyssette/js-template/-/commit/e9aebeb76193d1d8bb308e74a704e4dffc20efed)
- **lint**: amélioration règles oxlint pour les tests [(fc19164)](https://forge.apps.education.fr/eyssette/js-template/-/commit/fc191649e8378caafc0f5d6fa53b4937df6631df)
- **lint**: amélioration du lint (règles de base + snakeCase pour les fichiers tests) [(f0cfe09)](https://forge.apps.education.fr/eyssette/js-template/-/commit/f0cfe099df70dafede1e61807eb59a3f47aff120)
- **lint**: lint des fichiers de configuration du build [(cc1a3a6)](https://forge.apps.education.fr/eyssette/js-template/-/commit/cc1a3a6e4677184ab8c9ae22d44ca5592d08935d)
- ajout règle no-unused-vars [(67e080a)](https://forge.apps.education.fr/eyssette/js-template/-/commit/67e080a2c0373a746d5cebab30022c802781c0bd)
- **lint**: règles pour les imports [(65dda93)](https://forge.apps.education.fr/eyssette/js-template/-/commit/65dda9330e2ae998d6709f1bc57bf742f3207a30)
- **lint**: unicorn-file-name-case pour tous les fichiers [(3c36f8a)](https://forge.apps.education.fr/eyssette/js-template/-/commit/3c36f8ade7d639380cfdbed953ad907c23e070bc)
- ajout d'un mot autorisé pour cspell [(9119670)](https://forge.apps.education.fr/eyssette/js-template/-/commit/9119670fe262d9773f4b8a6e69e9b515443789bc)
- **task**: ajout d'une tâche pour examiner la sécurité du code avec Bearer [(f093bcb)](https://forge.apps.education.fr/eyssette/js-template/-/commit/f093bcb73544076ec8ec8ecfc5a2e99e461bcfab)
- update package-lock.json [(4e576b3)](https://forge.apps.education.fr/eyssette/js-template/-/commit/4e576b3f7ff85eaf1c65eac7c7a8ce587655025b)
- **IDE**: fix de certains paramètres pour l'extension OXC [(2c0d845)](https://forge.apps.education.fr/eyssette/js-template/-/commit/2c0d845b9d5adfc86fdb48c5655730302c01597d)

### Refactor

- simplification de l'écriture des constantes [(ade1144)](https://forge.apps.education.fr/eyssette/js-template/-/commit/ade1144a8ed2b54c7e1c8f08023cded2677313c1)
- **build**: déplacement dans des modules de la logique de création du plugin de minification des fichiers CSS + des accès sécurisés aux fichiers [(0acfca1)](https://forge.apps.education.fr/eyssette/js-template/-/commit/0acfca1f872e2e39dcca4d2f6bebf357e0891250)

## 3.0.1 (2026-07-27)

### Fix

- **IDE**: nom corrigé pour une extension [(e0cb2ef)](https://forge.apps.education.fr/eyssette/js-template/-/commit/e0cb2ef16e4dc69f3fc0468916e825f5711b1f68)

### Chore

- task simplifiée pour l'installation de Playwright [(ba3daf0)](https://forge.apps.education.fr/eyssette/js-template/-/commit/ba3daf07d4f02d05f766aab60dc92eb550ce82fb)
- update package-lock.json [(a86319b)](https://forge.apps.education.fr/eyssette/js-template/-/commit/a86319bc99b4a80ca7181aaeda2a2eb268f47db3)

## 3.0.0 (2026-07-27)

### Fix

- **task**: gestion du cas où les tests ne peuvent pas être lancés (possibilité de ne pas bloquer le push malgré tout) [(caa4633)](https://forge.apps.education.fr/eyssette/js-template/-/commit/caa4633fb65d62e33253b46be45e3485f39abd75)
- **IDE**: suppression d'une extension qui ne fonctionnait pas bien (pour la coloration syntaxique dans les variables texte) [(ccad0ca)](https://forge.apps.education.fr/eyssette/js-template/-/commit/ccad0caa362e66ae8398376c5995514e662b4606)
- **build**: récupération des fichiers CSS importés, sans commenter puis dé-commenter le contenu de main.mjs [(7375984)](https://forge.apps.education.fr/eyssette/js-template/-/commit/7375984a76128297e44ce2cb15278e32db2db4ec)

### Chore

- suppression de paquets inutiles depuis le passage à Rolldown [(f6ba5f7)](https://forge.apps.education.fr/eyssette/js-template/-/commit/f6ba5f70fe50a8e1ffc888149ee17332b56b9c0d)
- mise à jour du format via oxfmt [(6a720f6)](https://forge.apps.education.fr/eyssette/js-template/-/commit/6a720f69acf5a6e541d58d404ed6680a05c7be38)
- ajout d'une tâche format:staged pour le hook git pre-commit [(4f9af3b)](https://forge.apps.education.fr/eyssette/js-template/-/commit/4f9af3b35fc0d8acf983e283bd1f9886ce1385e6)
- tâche "format" dans Taskfile [(34abafe)](https://forge.apps.education.fr/eyssette/js-template/-/commit/34abafeb06581763ec4d369eaa10213a52ba18c9)
- printWidth configuré à 80 pour oxfmt [(b87558b)](https://forge.apps.education.fr/eyssette/js-template/-/commit/b87558b987e4d7311e1ad070600ba057588a7565)
- update package-lock.json [(b13aba2)](https://forge.apps.education.fr/eyssette/js-template/-/commit/b13aba236d705e75df709ba5390b11147cadfdfd)
- **IDE**: suppression de settings inutiles [(858ea95)](https://forge.apps.education.fr/eyssette/js-template/-/commit/858ea95a854f12d37a9115c8a983c96a19759839)
- suppression de post-ccs, inutile depuis le passage à rolldown [(529ea91)](https://forge.apps.education.fr/eyssette/js-template/-/commit/529ea9196ae7ff22fb872a1f4a849818b13ceaae)
- update package-lock.json [(382f444)](https://forge.apps.education.fr/eyssette/js-template/-/commit/382f4443baa0579e865e2d0e3be4a7d253987a25)

### Docs

- précision sur "task" vs "npx task" [(78b7bca)](https://forge.apps.education.fr/eyssette/js-template/-/commit/78b7bca7b505dba7d2693f363e29bc81647a6d74)

### Perf

- **lint**: migration de ESlint vers Oxlint et de Prettier vers Oxfmt [(621efaf)](https://forge.apps.education.fr/eyssette/js-template/-/commit/621efaf78bc7b6aaaac8e9db9ac749a258bdf746)

## 2.3.0 (2026-07-24)

### Feat

- **task**: ajout d'une tâche pour voir la taille des différents modules dans le fichier compilé [(92ec46e)](https://forge.apps.education.fr/eyssette/js-template/-/commit/92ec46e45ae26f41f5ddd737aa5671ea6fa97197)
- **gitlab**: ajout de templates pour les issues, le service desk, et pour le déploiement de l'application dans un autre dépôt [(fee6d1e)](https://forge.apps.education.fr/eyssette/js-template/-/commit/fee6d1e3c6fa3e0fc979efb6ec9622eab44e8677)
- **tests**: tâche pour créer un rapport de couverture de code (coverage) avec c8 [(d395b7c)](https://forge.apps.education.fr/eyssette/js-template/-/commit/d395b7cf3bf2e347303cb78b7de7fc30e8d10646)

### Fix

- **vscode**: ajout de l'extension code-spell-checker pour la correction de l'orthographe dans les fichiers de type texte [(d1df363)](https://forge.apps.education.fr/eyssette/js-template/-/commit/d1df363145909c21cb375f38aa4ebb42bd7baf97)
- **css**: ajout de Stylelint pour la vérification du CSS [(3a120a9)](https://forge.apps.education.fr/eyssette/js-template/-/commit/3a120a91e56ab8d245629d1e39d74f1513decf8b)

### Chore

- **Taskfile**: ajout d'une description pour chaque tâche [(6503479)](https://forge.apps.education.fr/eyssette/js-template/-/commit/6503479acbfbf9462224b4e40a7182d76933ed35)

### Docs

- explications pour la tâche de visualisation de la taille des modules [(b471a46)](https://forge.apps.education.fr/eyssette/js-template/-/commit/b471a46fed337e3affdd7732aff24a8c7ff65093)
- amélioration de la formulation [(d42ec03)](https://forge.apps.education.fr/eyssette/js-template/-/commit/d42ec033397817f85e8b881005e792337b1f1cff)
- explications pour la couverture de code avec c8 [(5907bb8)](https://forge.apps.education.fr/eyssette/js-template/-/commit/5907bb84df7f318429aa3aa5f51af966f8e73811)

## 2.2.0 (2026-07-24)

### Feat

- **perf**: ajout d'une tâche pour mesurer les performances (avec Lighthouse) [(d6d30fe)](https://forge.apps.education.fr/eyssette/js-template/-/commit/d6d30fec0f0b4cc82733e34bd9dce21b4a1fc0e5)
- **security**: ajout de tâches pour vérifier la sécurité de l'application [(83c9157)](https://forge.apps.education.fr/eyssette/js-template/-/commit/83c915738b067dfa084111c3c59369578ac5bb71)
- **a11y**: tâche pour vérifier l'accessibilité [(da80867)](https://forge.apps.education.fr/eyssette/js-template/-/commit/da8086740cc85aa6d2a58b13c2b2d5208860bb5f)

### Fix

- **build**: sécurisation de la récupération des fichiers CSS [(a4b5994)](https://forge.apps.education.fr/eyssette/js-template/-/commit/a4b5994697032a7c3e0a997a8ac7f669f79a5167)
- **build**: config Rolldown corrigée pour permettre le rebuild en mode dev (avec prise en compte des fichiers CSS) [(9a9ab49)](https://forge.apps.education.fr/eyssette/js-template/-/commit/9a9ab49dc599181529a3aa02e926b9677de3cf71)
- **ecma**: cohérence version ECMA visée (2020) [(500a21f)](https://forge.apps.education.fr/eyssette/js-template/-/commit/500a21fbaaa3d8e6f81240f6007df8d607c3750d)

### Chore

- ajout de "silent: true" pour certaines tâches [(cfc3f7f)](https://forge.apps.education.fr/eyssette/js-template/-/commit/cfc3f7fb8f67084c8e778f5fbb45374124d853f2)

### Docs

- explications pour les tâches de mesure de performance avec Lighthouse [(45c4508)](https://forge.apps.education.fr/eyssette/js-template/-/commit/45c450880776a04785f88b858dfb4004d1b0786a)
- distinction des fonctions principales et de l'automatisation des tâches + précision sur les tâches automatisées [(fc90eae)](https://forge.apps.education.fr/eyssette/js-template/-/commit/fc90eae99ffcbf2ffab12b81e2c90d8bd8087397)

## 2.1.3 (2026-07-23)

### Fix

- **lint**: exclusion pour le lint des fichiers et dossiers qui sont dans le .gitignore [(e99b3b1)](https://forge.apps.education.fr/eyssette/js-template/-/commit/e99b3b1230894429abfb4efd87103fe273e07a0f)
- **app**: ajout d'un fichier robots.txt par défaut [(5b552b6)](https://forge.apps.education.fr/eyssette/js-template/-/commit/5b552b67366369f4672fbcf42c4698cc61baf92c)
- **lint**: configuration de prettier dans prettier.config.mjs plutôt que .prettierrc [(860f830)](https://forge.apps.education.fr/eyssette/js-template/-/commit/860f830bba980843e8ba801f8f47f72ce050a2f7)

## 2.1.2 (2026-07-23)

### Fix

- **build**: amélioration de la sécurité pour la récupération des fichiers CSS sans globSync [(7f4e64a)](https://forge.apps.education.fr/eyssette/js-template/-/commit/7f4e64a237aac66cc5bdbe4c4f602dd406743669)
- **build**: sécurisation de la récupération des fichiers CSS sans globSync [(05d9244)](https://forge.apps.education.fr/eyssette/js-template/-/commit/05d92445e41d697b20ac256238e2dbb26394f8d3)

### Docs

- ajout d'un fichier CONTRIBUTING [(cd1372d)](https://forge.apps.education.fr/eyssette/js-template/-/commit/cd1372d13ec2d8a2ed2df6bc25e1b74c09e7180e)
- ajout de la référence à la licence [(8d1404f)](https://forge.apps.education.fr/eyssette/js-template/-/commit/8d1404f9554517c0894d3f07d2642ae41b6cc3ca)
- ajout documentation pour la tâche de compression des images [(4dcd816)](https://forge.apps.education.fr/eyssette/js-template/-/commit/4dcd816af084c60b6a282ce49272cf4f9f341a33)
- précision pour l'installation de Commitizen pour la tâche "bump" [(ccccfe7)](https://forge.apps.education.fr/eyssette/js-template/-/commit/ccccfe79144689e96316121b293d4997760fd07d)

## 2.1.1 (2026-07-23)

### Fix

- **lint**: ajout des règles de @e18e/eslint-plugin en mode "warning" [(3e98d88)](https://forge.apps.education.fr/eyssette/js-template/-/commit/3e98d881b638aac5c50ef649dbf1ed72bd4f61b2)
- **build**: sécurisation du bundle des fichiers CSS [(cce6c89)](https://forge.apps.education.fr/eyssette/js-template/-/commit/cce6c893f4153f3ae3bf30d8789dd9547d7dafaf)

### Chore

- **lint**: regex dans une constante [(a197d23)](https://forge.apps.education.fr/eyssette/js-template/-/commit/a197d232a5e5f10dc55303861fa4ef7ba55c4e9b)

## 2.1.0 (2026-07-23)

### Feat

- **css**: gestion des imports CSS et bundle avec minification dans le fichier CSS principal [(0b315e0)](https://forge.apps.education.fr/eyssette/js-template/-/commit/0b315e070ce6e2372d067b2af89caf732e9c819d)

### Fix

- **lint**: utilisation du plugin @stylistic [(30ed502)](https://forge.apps.education.fr/eyssette/js-template/-/commit/30ed502b302e9e049b65a091a2e1837caac1c146)
- **lint**: règles unicorn désactivées pour un fichier de configuration CodeceptJS [(33ad8d1)](https://forge.apps.education.fr/eyssette/js-template/-/commit/33ad8d158283b8575c08c4194e6ab16862f57d87)
- **rolldown**: config simplifiée et sécurisée pour la récupération des fichiers CSS [(1521917)](https://forge.apps.education.fr/eyssette/js-template/-/commit/15219179c2f051f9734a3f085808e58263c46547)
- **task**: ajout d'une tâche pour vérifier les dépendances [(e13e1ff)](https://forge.apps.education.fr/eyssette/js-template/-/commit/e13e1ff037391b780b6d70157c8eb442d9a9ae6c)

### Chore

- précision des versions de node et npm à utiliser [(22fc0e5)](https://forge.apps.education.fr/eyssette/js-template/-/commit/22fc0e506fba15a47ed534adbeda1ce959df367c)

### Docs

- précisions sur le javascript modulaire et l'import des fichiers CSS [(1c354ee)](https://forge.apps.education.fr/eyssette/js-template/-/commit/1c354ee7a727991d15f459d84008de4bb834f60e)

## 2.0.3 (2026-07-23)

### Fix

- **ci**: actualisation de la version de node pour pouvoir faire le build de l'application [(2aa79f4)](https://forge.apps.education.fr/eyssette/js-template/-/commit/2aa79f41f0d3f3301bb84150dff104bd1d9818ae)
- **tests**: patch pour l'installation de playwright quand certains navigateurs ne peuvent pas être installés [(7f1b685)](https://forge.apps.education.fr/eyssette/js-template/-/commit/7f1b6850a61c74af0e676a85390a13790c7bab73)
- **lint**: ajout du plugin unicorn pour ESlint [(0605331)](https://forge.apps.education.fr/eyssette/js-template/-/commit/060533120727be2d3639d8972d2d492533afa7f5)

### Chore

- ajout de .npm dans .gitignore [(4861338)](https://forge.apps.education.fr/eyssette/js-template/-/commit/48613383d4f8a0a576a57939c700f6ac608f4085)
- précision de la fonction de chaque extension [(5ec8d64)](https://forge.apps.education.fr/eyssette/js-template/-/commit/5ec8d643e9e529239bed566167089c31890f3a63)
- corrections erreurs ESlint pour le serveur de test [(0ec653e)](https://forge.apps.education.fr/eyssette/js-template/-/commit/0ec653e2d5a162aecc1c1ab0e58a408ea92ec405)

### Docs

- précision sur l'extension de calcul de la complexité des fonctions [(749762d)](https://forge.apps.education.fr/eyssette/js-template/-/commit/749762d34bf30031bdf64132a2982f4c5e5e99f5)
- précision sur la manière de pousser les tags git [(2a6e51f)](https://forge.apps.education.fr/eyssette/js-template/-/commit/2a6e51f409e3a4317d6c56a99036e4efd8ec013c)
- amélioration partie sur la montée de version [(6a8b106)](https://forge.apps.education.fr/eyssette/js-template/-/commit/6a8b1069e18c4ef6b6024df487a73def68f049a1)
- réécriture plus claire et plus précise de la documentation [(38ac610)](https://forge.apps.education.fr/eyssette/js-template/-/commit/38ac610f63e427139a1fdbdf810cce9c2678027b)
- petites améliorations de la documentation [(ce93687)](https://forge.apps.education.fr/eyssette/js-template/-/commit/ce93687dd90de0ef974a7728907cc87c042f3e72)

## 2.0.2 (2026-07-22)

### Fix

- **codeceptJS**: mise à jour du fichier de configuration [(fc5f0bd)](https://forge.apps.education.fr/eyssette/js-template/-/commit/fc5f0bdd073028be49f59f50e708b3c12539bfaf)
- **vscode**: config debug avec vscode [(2b54ca6)](https://forge.apps.education.fr/eyssette/js-template/-/commit/2b54ca616cc3510655bfa93000029cf9758e95ea)
- **task**: ajout d'un dépôt remote [(806f03d)](https://forge.apps.education.fr/eyssette/js-template/-/commit/806f03db41d1c76c2b509636b38bb5c593c777b9)

### Chore

- **lint**: fichier .eslintignore deprecated [(bc57098)](https://forge.apps.education.fr/eyssette/js-template/-/commit/bc57098019f127195d55d64faf4e3255bf5a22e4)
- mise à jour des dépendances [(2348849)](https://forge.apps.education.fr/eyssette/js-template/-/commit/2348849e5f804bcc78497910537f72971cbbd549)
- **lint**: pas de camel-case imposé pour les variables de configuration de Jasmine [(b6dda5d)](https://forge.apps.education.fr/eyssette/js-template/-/commit/b6dda5d5cf132ff5d4455f96968c59c17c298e78)
- règle eslint inutile [(88fe224)](https://forge.apps.education.fr/eyssette/js-template/-/commit/88fe224b58eeac868b3f2c0241531134dcf276b9)

### Test

- fix typo [(775feb6)](https://forge.apps.education.fr/eyssette/js-template/-/commit/775feb6984fbbefe18df2f9ab1d85bee94de47a8)

## 2.0.1 (2026-07-22)

### Fix

- **e2e**: mode verbose pour les tests e2e:current [(2d91758)](https://forge.apps.education.fr/eyssette/js-template/-/commit/2d9175849deb2b679d27a2ab168ddf02c56f53c8)
- **lint**: intégration des constantes de codeceptjs pour éviter les erreurs no-undef [(2a74ecb)](https://forge.apps.education.fr/eyssette/js-template/-/commit/2a74ecb2c9a96d34d075a84f09b6b3b07fd6a850)
- **e2e**: option bail:true pour arrêter les tests e2e dès que l'un des tests plante [(6e2c02c)](https://forge.apps.education.fr/eyssette/js-template/-/commit/6e2c02cd7ef508587735468574257c7d79d5f034)

### Chore

- update package-lock.json [(4e94a22)](https://forge.apps.education.fr/eyssette/js-template/-/commit/4e94a2233facf249f5cc63decfafaa18482bcd84)

## 2.0.0 (2026-07-22)

### Fix

- **eslint**: fix pour la prise en charge des variables node [(98e4ccb)](https://forge.apps.education.fr/eyssette/js-template/-/commit/98e4ccb0853c07ec4c836db835aa439032896668)
- **rollup**: ajout d'un délai pour permettre le livereload [(acb317e)](https://forge.apps.education.fr/eyssette/js-template/-/commit/acb317e9cc8094261202690bd865d32fdda4ad8a)
- **IDE**: ajout d'une extension de syntax highlighting pour le HTML et le CSS dans des chaînes de caractères en JS [(994f2b5)](https://forge.apps.education.fr/eyssette/js-template/-/commit/994f2b52d82416227dde9909c3452acdef617629)

### Perf

- **build**: migration de rollup à rolldown + lightningcss [(5ee16f9)](https://forge.apps.education.fr/eyssette/js-template/-/commit/5ee16f92c38f42c1d94ac5a25cd8da8b9e5a0c37)

## 1.4.0 (2026-07-22)

### Feat

- **rollup**: ajout d'un serveur de développement + amélioration de la configuration [(b619619)](https://forge.apps.education.fr/eyssette/js-template/-/commit/b6196190c0db177b8bb2b52f039944a58c1ae22c)

### Fix

- **rollup**: amélioration config du serveur de développement [(be98744)](https://forge.apps.education.fr/eyssette/js-template/-/commit/be98744ed34c1e8f84861704239d47129da1f2d2)
- **lint**: amélioration config ESlint [(a950d0b)](https://forge.apps.education.fr/eyssette/js-template/-/commit/a950d0b4481557d3bcb14c752e6c907cf5657fda)
- **rollup**: minification des noms de variable [(cac6979)](https://forge.apps.education.fr/eyssette/js-template/-/commit/cac6979cbf9a4b29b3bfdc995d0e7a4e5dd8b0dc)
- **e2e**: le serveur de test autorise tous les fichiers dans le dossier "dist" [(71f9643)](https://forge.apps.education.fr/eyssette/js-template/-/commit/71f964319d159d4a6c39d214317a45a04dd9c1e4)

### Docs

- mise à jour de la documentation (serveur de développement) [(dc4a251)](https://forge.apps.education.fr/eyssette/js-template/-/commit/dc4a251b85ae96dee92c0b875e2a04252ecd047a)

## 1.3.0 (2026-07-21)

### Feat

- **complexity**: ajout d'une extension pour calculer et afficher automatiquement la complexité des fonctions JS [(837eb2e)](https://forge.apps.education.fr/eyssette/js-template/-/commit/837eb2ea6bd0473fd8ff8742d0ed7eead3afa917)
- **commitlint**: utilisation de commitlint pour vérifier les commits [(d3e8e1c)](https://forge.apps.education.fr/eyssette/js-template/-/commit/d3e8e1c9a65167d60362fd1c658688ab188f293a)

### Fix

- **commitlint**: possibilité d'avoir un message de commit plus long [(903eaf4)](https://forge.apps.education.fr/eyssette/js-template/-/commit/903eaf44fcdcd01ccb2d2d00211be086331ac767)
- **rollup**: copie de app dans dist [(6cad6c7)](https://forge.apps.education.fr/eyssette/js-template/-/commit/6cad6c7db17cea7e44b1ef318df6692872015930)
- **cz**: cohérence des types de commit [(9e070b5)](https://forge.apps.education.fr/eyssette/js-template/-/commit/9e070b58cb1cf81ec8666940778e13374350c81b)
- **husky**: amélioration du message en cas d'erreur [(22eab50)](https://forge.apps.education.fr/eyssette/js-template/-/commit/22eab5080cc1c2a268723128e16d5a39ac500b65)
- **cz**: mise en cohérence des types autorisés de commits [(e1415d4)](https://forge.apps.education.fr/eyssette/js-template/-/commit/e1415d46b9e499d123f59b569d2e0e72f7520b25)

### Chore

- suppression de la version minifiée des styles CSS dans "app" [(f1d5177)](https://forge.apps.education.fr/eyssette/js-template/-/commit/f1d517711d9622abef512110a7bad39a63cf054f)
- ajout d'une tâche pour obtenir l'arborescence du répertoire [(644ee84)](https://forge.apps.education.fr/eyssette/js-template/-/commit/644ee840d115a5b0901c105d02b296bb2aa0774c)

### Docs

- mise à jour de la documentation [(fdbfc94)](https://forge.apps.education.fr/eyssette/js-template/-/commit/fdbfc9488250e7dd6b4df14fa8726623b91a81e4)

## 1.2.0 (2026-07-21)

### Feat

- **husky**: configuration de husky pour vérifier les commits [(f55d871)](https://forge.apps.education.fr/eyssette/js-template/-/commit/f55d87179affbce7bfd77337deb4a28924466804)

### Fix

- typo pour le script de tests [(551470b)](https://forge.apps.education.fr/eyssette/js-template/-/commit/551470bfe2d33143362c841e5f7af71b0ee9bc28)
- **ci**: construction de l'application dans dist, puis déplacement de dist dans public [(deaaa47)](https://forge.apps.education.fr/eyssette/js-template/-/commit/deaaa47bcda893d7b99ea32a220053adc4ac05e7)
- déplacement du fichier de configuration du serveur de test e2e dans le dossier de test e2e [(0c91f49)](https://forge.apps.education.fr/eyssette/js-template/-/commit/0c91f490529adbf916d5d1a7751fa273445a9bac)
- déplacement du build final dans "dist" [(0ab7251)](https://forge.apps.education.fr/eyssette/js-template/-/commit/0ab72518e15f1cccab2258fb66eeba602e8957f3)
- ajout d'ESlint comme package [(ee55b24)](https://forge.apps.education.fr/eyssette/js-template/-/commit/ee55b248a7c9eeda93f2940914f78e947750e020)
- tâche server:stop (forcer l'utilisation de bash pour kill le processus) [(e8615cc)](https://forge.apps.education.fr/eyssette/js-template/-/commit/e8615cc63305034836211a13c4f0e2d88edd2312)

## 1.1.1 (2026-01-18)

### Fix

- précisions pour la configuration de VSCodium [(32626a0)](https://forge.apps.education.fr/eyssette/js-template/-/commit/32626a0f1a5fdfbef6b5ccf7e7c03501757c4537)
- ajout d'une recommandation d'extension ESlint [(30ed094)](https://forge.apps.education.fr/eyssette/js-template/-/commit/30ed0949f84793bf965cfdee24a86e51cb532710)

## 1.1.0 (2026-01-04)

### Feat

- ajout de tâches de compression des images [(dac578f)](https://forge.apps.education.fr/eyssette/js-template/-/commit/dac578f2ed9a2b7283f3e46305e13819e111c5a4)

### Fix

- ajout de la définition du plugin codeceptjs [(ee73d4c)](https://forge.apps.education.fr/eyssette/js-template/-/commit/ee73d4c40248df039ffd84d5112c7767c689bb80)
- utilisation de la variable APP_FOLDER pour la tâche de lint [(239ccb3)](https://forge.apps.education.fr/eyssette/js-template/-/commit/239ccb32a87e93c6613894577927333ed0d3d550)
- wildcard possible pour définir la liste des fichiers autorisés [(ae2a82f)](https://forge.apps.education.fr/eyssette/js-template/-/commit/ae2a82f404ca955e40842aa52ac92f9bb4755844)
- variable pour la définition du dossier de l'application [(8847a51)](https://forge.apps.education.fr/eyssette/js-template/-/commit/8847a511a3184e6b5109a460aa8ddf7999711682)
- ajout de recommandations d'extensions pour l'IDE [(e413691)](https://forge.apps.education.fr/eyssette/js-template/-/commit/e41369114049bf858ad340ca14d8361e852a13a6)
- précisions dans le README sur les prérequis, les principes de développement, les commits, les commandes task [(29ab86f)](https://forge.apps.education.fr/eyssette/js-template/-/commit/29ab86f21967a6409b756074580beba7a4c760d2)

## 1.0.0 (2025-12-13)

### Feat

- **template**: première mise en place du template [(f5fd556)](https://forge.apps.education.fr/eyssette/js-template/-/commit/f5fd5569146b118faff7551ad817988ea03b9a7a)

### Fix

- **ci**: déplacement de "app" vers racine [(e0347b2)](https://forge.apps.education.fr/eyssette/js-template/-/commit/e0347b2eb99555530b0b04f6d51a1bf28f3cc91d)
- **ci**: création du dossier "public" [(d496d88)](https://forge.apps.education.fr/eyssette/js-template/-/commit/d496d8877a27999bd55b837e747ea35a09017e75)
