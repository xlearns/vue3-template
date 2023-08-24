import { fileURLToPath, URL } from "url";
const url = "./../../";
const alias = {
  "@": fileURLToPath(new URL(`${url}src`, import.meta.url)),
  "@a": fileURLToPath(new URL(`${url}src/api`, import.meta.url)),
  "@c": fileURLToPath(new URL(`${url}src/components`, import.meta.url))
};
export default alias;
