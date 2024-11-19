import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./10.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  const { to_binary, memory } = instance.exports;

  console.log(instance.exports.log2(192));
} catch (error) {
  console.error(error);
}
