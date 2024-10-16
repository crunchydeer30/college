import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("factorial.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile, { console });
  const { factLoop, factRecursive } = instance.exports;
  console.log('factLoop(5):', factLoop(5));
  console.log('factLoop(0):', factLoop(0));
  console.log('factLoop(12):', factLoop(12));
  console.log('factRecursive(5):', factRecursive(5));
  console.log('factRecursive(0):', factRecursive(0));
  console.log('factRecursive(12):', factRecursive(12));
} catch (e) {
  console.error(e); 
}