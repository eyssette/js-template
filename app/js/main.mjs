// oxlint-disable import/no-unassigned-import import/no-relative-parent-imports
import "../css/styles.css";
import "./components/DemoSvelte.svelte";
import { capitalizeFirstLetter } from "./utils/strings.mjs";
import { getLocale } from "./lib/paraglide/runtime.js";
import { m } from "./lib/paraglide/messages.js";

const currentLocale = getLocale();
document.documentElement.lang = currentLocale;

const mainElement = document.querySelector("main");
const message = m.welcome();

mainElement.textContent = capitalizeFirstLetter(`hello world ! ${message}`);

// Démonstration de l'utilisation d'un composant Svelte
const demoSvelte = document.createElement("demo-svelte");
demoSvelte.name = "Svelte";
mainElement.append(demoSvelte);
