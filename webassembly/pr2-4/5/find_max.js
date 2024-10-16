import fs from 'fs/promises';

try {
  const wasmFile = await fs.readFile('is_even.wasm');
  const { instance } = await WebAssembly.instantiate(wasmFile, {});
  const { memory } = instance.exports;
} catch (e) {
  console.error(e);
}