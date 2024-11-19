import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./02.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  console.log(instance.exports.x.value);
} catch (error) {
  console.error(error);
}
