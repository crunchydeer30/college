import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./05.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  console.log(instance.exports.fact(5));
} catch (error) {
  console.error(error);
}
