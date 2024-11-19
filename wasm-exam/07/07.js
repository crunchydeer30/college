import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./07.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  console.log(instance.exports.add(1, 2));
} catch (error) {
  console.error(error);
}
