import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./16.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
} catch (error) {
  console.error(error);
}
