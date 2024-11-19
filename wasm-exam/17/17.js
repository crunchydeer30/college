import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./17.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  console.log(instance.exports.binaryToDecimal(11100000));
} catch (error) {
  console.error(error);
}
