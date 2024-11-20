import fs from "fs/promises";

try {
  const wasmFile = await fs.readFile("./10.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile, {
    console,
  });
  const { decimalToBinary, memory } = instance.exports;
  const ptr = decimalToBinary(255);
  const binary = new Uint8Array(memory.buffer).slice(ptr).join("");
  console.log(binary);
} catch (error) {
  console.error(error);
}
