import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./15.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  console.log(instance.exports.add(0xff, 0xaa).toString(16));
} catch (error) {
  console.error(error);
}
