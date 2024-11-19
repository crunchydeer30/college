import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./14.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  console.log(instance.exports.and(0xff, 0xaa).toString(16));
} catch (error) {
  console.error(error);
}
