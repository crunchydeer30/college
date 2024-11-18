import fs from "fs/promises";

// Var 1
try {
  console.log("Var1:");
  const wasmFile = await fs.readFile("1.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile, { console });
  const { get_ptr, get_len, memory } = instance.exports;

  const ptr = get_ptr();
  const len = get_len();
  const memoryBuffer = new Uint8Array(memory.buffer);
  const binaryData = memoryBuffer.slice(ptr, ptr + len);
  console.log("binary data:", binaryData);
} catch (e) {
  console.error(e);
}

// Var 2
try {
  console.log("\nVar2:");
  const wasmFile = await fs.readFile("2.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile, { console });
  const { get_len, memory } = instance.exports;
  const memoryBuffer = new Uint8Array(memory.buffer);
  console.log("memoryBuffer:", memoryBuffer);
  console.log("get_len():", get_len());
} catch (e) {
  console.error(e);
}

// Var 3
try {
  console.log("\nVar3:");
  const wasmFile = await fs.readFile("3.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile, { console });
  const { sum, memory } = instance.exports;
  console.log("sum():", sum());
} catch (e) {
  console.error(e);
}

// Var 4
try {
  console.log("\nVar4:");
  const wasmFile = await fs.readFile("4.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile, { console });
  const { replace, get_len, memory } = instance.exports;

  const memoryBuffer = new Uint8Array(memory.buffer);

  console.log("original state:", memoryBuffer.slice(0, get_len()));
  console.log("replace 0xff with 0x5");
  replace(0xff, 0x5);
  console.log("new state:", memoryBuffer.slice(0, get_len()));
} catch (e) {
  console.error(e);
}
