import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./12.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile);
  const { memory, strcpy } = instance.exports;

  const mem = new Uint8Array(memory.buffer);
  const encoder = new TextEncoder();
  const encodedStr = encoder.encode("12345678\0");
  mem.set(encodedStr, 0);

  console.log(instance.exports.strcpy(0, 20));
  console.log(Buffer.from(memory.buffer));
} catch (error) {
  console.error(error);
}
