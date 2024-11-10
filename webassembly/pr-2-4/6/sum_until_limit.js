import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("sum_until_limit.wasm");
  const wasmModule = new WebAssembly.Module(wasmFile, {
    console,
  });
  const instance = new WebAssembly.Instance(wasmModule, { console });
  const { sumUntilLimit } = instance.exports;

  const memory = new Int32Array(instance.exports.memory.buffer);
  const arr_ptr = 0;

  const array = [-20, 50, 50, 20, 30];
  for (let i = 0; i < array.length; i++) {
    memory[arr_ptr + i] = array[i];
  }

  console.log(`sumUntilLimit(${array}):`, sumUntilLimit(arr_ptr, array.length));
} catch (e) {
  console.error(e);
}
