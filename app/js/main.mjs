// oxlint-disable import/no-unassigned-import import/no-relative-parent-imports
import "../css/styles.css";
import { getLocale, setLocale } from "./lib/paraglide/runtime.js";
import { capitalizeFirstLetter } from "./utils/strings.mjs";
import { m } from "./lib/paraglide/messages.js";

setLocale("fr");

const mainElement = document.querySelector("main");
const currentLocale = getLocale();
document.documentElement.lang = currentLocale;
mainElement.textContent = capitalizeFirstLetter(`hello world ! ${m.welcome()}`);
