import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./09.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  console.log(instance.exports.isEven(10));
  console.log(instance.exports.isEven(11));
} catch (error) {
  console.error(error);
}
