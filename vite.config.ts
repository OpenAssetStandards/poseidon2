/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";
import packageJson from "./package.json";

const getPackageName = () => {
  return packageJson.name;
};

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, (char) => char[1].toUpperCase());
  } catch (err) {
    throw new Error("Name property in package.json is missing.");
  }
};

const fileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
};

const formats = Object.keys(fileName) as Array<keyof typeof fileName>;

module.exports = defineConfig({
  
  base: "./",
  build: {

    sourcemap: true,
    lib: {
      entry:{
        [getPackageNameCamelCase()]: path.resolve(__dirname, "src/index.ts"),
        "goldilocks-12": path.resolve(__dirname, "src/goldilocks-12/index.ts"),
      },
      formats,
      fileName(format, entryName) {
        if(format === "es"){
          return `${entryName}.mjs`;
        }else{
          return `${entryName}.cjs`;
        }

      },
    }
  },
  test: {

  }
});
