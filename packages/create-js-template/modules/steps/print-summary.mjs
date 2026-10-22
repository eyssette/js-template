export function printSummary(projectName, targetDir) {
	console.log(`\n✅ Projet "${projectName}" prêt dans ${targetDir}`);
	console.log(
		"\n⚠️  N'oubliez pas de choisir une licence pour votre projet et d'adapter le fichier LICENSE en conséquence.",
	);
	console.log(
		"⚠️  N'oubliez pas de compléter le fichier README.md avec la documentation de votre projet.",
	);
	console.log(
		"💡 Pour aller plus loin, consultez la documentation et le guide d'onboarding du template.",
	);
}
