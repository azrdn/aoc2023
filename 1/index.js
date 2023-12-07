import { readFile } from "node:fs/promises";

/**
 * @param {string} word
 */
function convertWords(word) {
	const numNonZero = {
		one: "o1e",
		two: "t2o",
		three: "t3e",
		four: "f4r",
		five: "f5e",
		six: "s6x",
		seven: "s7n",
		eight: "e8t",
		nine: "n9e",
	};
	let converted = word;
	for (const items in numNonZero) {
		while (converted.includes(items)) {
			converted = converted.replace(items, numNonZero[items]);
		}
	}
	return converted;
}

/**
 * @param {String} word
 * @returns {String[]}
 */
function snipLetters(word) {
	return word.split("").filter((char) => Number.isFinite(Number(char)));
}

/**
 * This function takes an array of numbers and returns the first and last item
 * joined then converted into a number, if the array length is one, then it will return
 * double of the element in the array, joined, then converted to number
 *
 * @param {String[]} item
 */
function customAdventModifier(item) {
	if (item.length > 2) {
		return Number([item[0], item.at(-1)].join(""));
	}
	if (item.length === 2) {
		return Number(item.join(""));
	}
	return Number([item[0], item[0]].join(""));
}

/**
 * Thanks to Mr. Erico Darmawan Handoyo for the inspiration :
 * https://www.youtube.com/live/blwoS74cdVE?t=4823
 * @param {Function[]} functions
 * @param {any} item
 */
function compose(item, ...functions) {
	let result = item;
	for (const fn of functions) {
		result = fn(result);
	}
	return result;
}

try {
	const list = await readFile("./input.txt", { encoding: "utf-8" }).then(
		(data) => data.split("\n"),
	);
	let result = 0;
	for (const item of list) {
		const calculated = compose(
			item,
			convertWords,
			snipLetters,
			customAdventModifier,
		);
		result += calculated;
	}
	console.log(result);
} catch (error) {
	console.error(error);
}
