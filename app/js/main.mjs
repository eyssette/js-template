// oxlint-disable import/no-unassigned-import import/no-relative-parent-imports
import "../css/styles.css";
import { capitalizeFirstLetter } from "./utils/strings.mjs";
import { getLocale } from "./lib/paraglide/runtime.js";
import { m } from "./lib/paraglide/messages.js";

const currentLocale = getLocale();
document.documentElement.lang = currentLocale;

const mainElement = document.querySelector("main");
const message = m.welcome();

mainElement.textContent = capitalizeFirstLetter(`hello world ! ${message}`);
