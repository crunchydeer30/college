import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./19.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  console.log(instance.exports.countBits(224));
} catch (error) {
  console.error(error);
}
