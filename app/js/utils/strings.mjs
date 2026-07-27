export function capitalizeFirstLetter(string) {
	if (typeof string !== "string" || string.length === 0) {
		return string;
	}
	const { firstChar, rest } = {
		firstChar: string.charAt(0),
		rest: string.slice(1),
	};
	return firstChar.toUpperCase() + rest;
}
