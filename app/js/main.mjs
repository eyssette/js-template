import "../css/styles.css";
import { capitalizeFirstLetter } from "./utils/strings.mjs";

const mainElement = document.querySelector("main");
mainElement.textContent = capitalizeFirstLetter("hello world!");
