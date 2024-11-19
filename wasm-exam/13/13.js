import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./13.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  const { memory } = instance.exports;

  const mem = new Uint8Array(memory.buffer);
  mem.set([1, 2, 3, 4], 0);

  console.log(instance.exports.sum(0, 4));
} catch (error) {
  console.error(error);
}
