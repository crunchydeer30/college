import fs from "fs/promises";
import { get } from "http";

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
  const wasmFile = await fs.readFile("3.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile, { console });
  const { copy, memory } = instance.exports;

  console.log("Initial state:", Buffer.from(memory.buffer).toString("utf-8"));
  console.log("copy");
  copy(0, 20, 8);
  console.log("Final state:", Buffer.from(memory.buffer).toString("utf-8"));
} catch (e) {
  console.error(e);
}

// Var 4
try {
  console.log("\nVar4:");
  const wasmFile = await fs.readFile("4.wasm");
  const { instance } = await WebAssembly.instantiate(wasmFile, { console });
  const { copy, memory, get_size } = instance.exports;

  const src = 0;
  const dst = 20;

  console.log("Initial state:", Buffer.from(memory.buffer).toString("utf-8"));
  console.log("get_size():", get_size(src));
  console.log("copy");
  copy(src, dst);
  console.log("Final state:", Buffer.from(memory.buffer).toString("utf-8"));

  const srcStr = Buffer.from(memory.buffer).toString(
    "utf-8",
    src,
    src + get_size(src)
  );
  const dstStr = Buffer.from(memory.buffer).toString(
    "utf-8",
    dst,
    dst + get_size(dst)
  );

  console.log(`src: ${srcStr} === dst: ${dstStr}`, srcStr === dstStr);
} catch (e) {
  console.error(e);
}
