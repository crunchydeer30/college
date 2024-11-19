import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./11.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  const { memory, strlen } = instance.exports;

  const mem = new Uint8Array(memory.buffer);
  const encoder = new TextEncoder();
  const encodedStr = encoder.encode("12345678\0");
  mem.set(encodedStr, 0);

  console.log(instance.exports.strlen(0));
} catch (error) {
  console.error(error);
}
