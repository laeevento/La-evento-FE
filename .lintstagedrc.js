export default {
  // Lint & format TypeScript and JavaScript files
  "*.{js,jsx,ts,tsx,mjs}": (filenames) => [
    `eslint --fix ${filenames.join(" ")}`,
    `prettier --write ${filenames.join(" ")}`,
  ],
  // Format other files
  "*.{json,md,mdx,css,html,yml,yaml}": (filenames) => [
    `prettier --write ${filenames.join(" ")}`,
  ],
};
