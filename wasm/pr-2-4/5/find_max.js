import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("find_max.wasm");
  const wasmModule = new WebAssembly.Module(wasmFile, {
    console,
  });
  const instance = new WebAssembly.Instance(wasmModule, { console });
  const { findMax } = instance.exports;

  const memory = new Int32Array(instance.exports.memory.buffer);
  const arr_ptr = 0;

  const array = [1, -12, 5, 4, 3];
  for (let i = 0; i < array.length; i++) {
    memory[arr_ptr + i] = array[i];
  }

  console.log(`findMax(${array}):`, findMax(arr_ptr, array.length));
} catch (e) {
  console.error(e);
}
