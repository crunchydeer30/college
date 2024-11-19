import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./04.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  console.log(instance.exports.mul(100, 0.845));
  console.log(instance.exports.div(100, 0.551));
} catch (error) {
  console.error(error);
}
