import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./03.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  console.log(instance.exports.max(2, 4));
  console.log(instance.exports.max(4, 2));
  console.log(instance.exports.max(2, 2));
} catch (error) {
  console.error(error);
}
