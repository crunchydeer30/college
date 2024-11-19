import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./18.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  console.log(instance.exports.sum(1, 5));
} catch (error) {
  console.error(error);
}
