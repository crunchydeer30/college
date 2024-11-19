import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./01.wasm");
  const module = await WebAssembly.compile(wasmFile);
  const instance = await WebAssembly.instantiate(module);
  console.log(instance.exports.add(1, 2));
} catch (error) {
  console.error(error);
}
