import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./20.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  console.log(instance.exports.get_low_byte(546384).toString(2));
  console.log(instance.exports.get_high_byte(546384).toString(2));
} catch (error) {
  console.error(error);
}
