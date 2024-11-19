import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./08.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  const table = instance.exports.table;

  console.log(table.get(0)(10, 20));
  console.log(table.get(1)(30, 10));
  console.log(table.get(2)(20, 30));
  console.log(table.get(3)(20, 20));
} catch (error) {
  console.error(error);
}
