import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./06.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  console.log(instance.exports.isEven(2));
  console.log(instance.exports.isEven(3));
} catch (error) {
  console.error(error);
}
