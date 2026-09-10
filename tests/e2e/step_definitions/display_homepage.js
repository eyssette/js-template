const { I } = inject();

Given("Je lance la page d'accueil", () => {
	I.amOnPage("/");
});

Then("Je vois les éléments principaux de la page d'accueil", () => {
	I.seeElement("main:not(:empty)");
});
