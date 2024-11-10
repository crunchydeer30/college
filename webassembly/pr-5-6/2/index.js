import fs from "fs/promises";

// Var 1
try {
  console.log("Var1:");
  const wasmFile = await fs.readFile("1.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile, { console });
  const { copy, memory } = instance.exports;

  console.log("Initial state:", Buffer.from(memory.buffer).toString("utf-8"));
  console.log("copy");
  copy(0, 20, 13);
  console.log("Final state:", Buffer.from(memory.buffer).toString("utf-8"));
} catch (e) {
  console.error(e);
}

// Var 2
try {
  console.log("\nVar2:");
  const wasmFile = await fs.readFile("2.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile, { console });
  const { get_size, copy, memory } = instance.exports;

  console.log("Initial state:", Buffer.from(memory.buffer).toString("utf-8"));
  console.log("get_size():", get_size());
  console.log("copy()");
  copy(0);

  console.log("Final state:", Buffer.from(memory.buffer).toString("utf-8"));
  console.log(
    `Original string (${0}):`,
    Buffer.from(memory.buffer).toString("utf-8", 0, get_size())
  );

  console.log(
    `Copied string (${get_size()})`,
    Buffer.from(memory.buffer).toString("utf-8", get_size())
  );
} catch (e) {
  console.error(e);
}

// Var 3
try {
  console.log("\nVar3:");
} catch (e) {}

// Var 4
