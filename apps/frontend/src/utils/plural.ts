interface IrregularPlurals {
  [key: string]: string;
}

/**
 * Returns the plural or singular form of an English word based on count
 * @param word - The word to pluralize/singularize
 * @param count - The count determining plural or singular form
 * @returns The appropriate form of the word
 */
export function pluralize(word: string, count: number): string {
  const irregularPlurals: IrregularPlurals = {
    child: "children",
    person: "people",
    man: "men",
    woman: "women",
    tooth: "teeth",
    foot: "feet",
    mouse: "mice",
    goose: "geese",
  };

  if (count === 1) {
    return word;
  }

  const lowerWord = word.toLowerCase();
  /* eslint-disable security/detect-object-injection */
  if (irregularPlurals[lowerWord]) {
    return irregularPlurals[lowerWord];
  }
  /* eslint-enable security/detect-object-injection */

  if (word.endsWith("y")) {
    const vowels: Array<string> = ["a", "e", "i", "o", "u"];
    if (!vowels.includes(word.at(-2) ?? "")) {
      return word.slice(0, -1) + "ies";
    }
  }

  if (
    word.endsWith("s") ||
    word.endsWith("sh") ||
    word.endsWith("ch") ||
    word.endsWith("x") ||
    word.endsWith("z")
  ) {
    return word + "es";
  }

  if (word.endsWith("f")) {
    return word.slice(0, -1) + "ves";
  }
  if (word.endsWith("fe")) {
    return word.slice(0, -2) + "ves";
  }

  return word + "s";
}
