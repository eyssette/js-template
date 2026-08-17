// oxlint-disable import/no-unassigned-import

// Import du fichier CSS principal de l'application
// On peut en mettre plusieurs : ils seront concaténés et minifiés dans le bundle final
import "../css/styles.css";

// Import d'un composant Svelte
import "./components/DemoSvelte.svelte";

// Import d'une fonction
import { capitalizeFirstLetter } from "./utils/strings.mjs";

// Import d'un fichier Markdown en tant que chaîne de caractères (pratique pour la documentation ou les textes longs)
import constantFromFile from "./txt/demo.md?raw";

// Gestion de la localisation (i18n) avec Paraglide
import { getLocale } from "./lib/paraglide/runtime.js";
import { m } from "./lib/paraglide/messages.js";

// Gestion du service worker pour que l'application fonctionne hors ligne et pour le caching des ressources (PWA : Progressive Web App)
import { registerServiceWorker } from "../pwa/registerServiceWorker.mjs";

registerServiceWorker();

// Définition de la langue du document en fonction de la locale actuelle
const currentLocale = getLocale();
document.documentElement.lang = currentLocale;

const mainElement = document.querySelector("main");
const message = m.welcome();
mainElement.textContent = capitalizeFirstLetter(`hello world ! ${message}`);

// Ajout du texte importé depuis le fichier Markdown
mainElement.innerHTML += `<p>${constantFromFile}</p>`;

// Démonstration de l'utilisation d'un composant Svelte
const demoSvelte = document.createElement("demo-svelte");
demoSvelte.name = "Svelte";
mainElement.append(demoSvelte);
