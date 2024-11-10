import fs from 'fs/promises';

try {
  const wasmFile = await fs.readFile('is_even.wasm');
  const { instance } = await WebAssembly.instantiate(wasmFile, { console });
  const { isEven } = instance.exports;
  console.log('isEven(5):', isEven(5));
  console.log('isEven(0):', isEven(0));
  console.log('isEven(12):', isEven(12));
  console.log('isEven(-2):', isEven(-2));
  console.log('isEven(-1):', isEven(-1));
} catch (e) {
  console.error(e);
}