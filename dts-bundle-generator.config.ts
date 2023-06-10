// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require("./package.json");

const getPackageName = () => {
  return packageJson.name;
};

const config = {
  compilationOptions: {
    preferredConfigPath: "./tsconfig.json",
  },

  entries: [
    {
      filePath: "./src/index.ts",
      outFile: `./dist/${getPackageName()}.d.ts`,
      noCheck: false,
    },
    {
      filePath: "./src/goldilocks-12/index.ts",
      outFile: `./dist/goldilocks-12.d.ts`,
      noCheck: false,
    },
  ],
};

module.exports = config;
