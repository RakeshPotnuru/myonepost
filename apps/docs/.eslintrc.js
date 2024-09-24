/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@1post/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
